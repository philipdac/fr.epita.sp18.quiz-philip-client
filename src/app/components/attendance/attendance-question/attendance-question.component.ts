import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import showdown from 'showdown';

import { KeyValuePair } from 'app/models/key-value-pair';
import { QuestionTypes } from 'app/common/question-type';
import { KeyValuePairMethods } from 'app/common/key-value-pair-methods';
import { ExamQuestion } from 'app/models/exam-question';
import { Question } from 'app/models/question';
import { ExamQuestionChoice } from 'app/models/exam-question-choice';
import { NotifyService } from 'app/services/notify.service';
import { AttendanceDataService } from 'app/services/attendance-data.service';
import { AnswerRequest } from 'app/models/answer-request';

@Component({
    selector: 'app-attendance-question',
    templateUrl: './attendance-question.component.html',
    styleUrls: ['./attendance-question.component.css'],
    providers: [AttendanceDataService, NotifyService],
    encapsulation: ViewEncapsulation.None,
})
export class AttendanceQuestionComponent implements AfterViewInit {
    @Input() index: number;
    @Input() attendanceId: number;
    @Input() question: ExamQuestion;

    questionTypes: KeyValuePair[];
    pairMethods = KeyValuePairMethods;
    subsAttend: any;

    classMap = {
        li: 'content-item'
    }

    bindings = Object.keys(this.classMap)
        .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${this.classMap[key]}" $1>`
        }));

    converter = new showdown.Converter({
        extensions: [...this.bindings]
    });

    constructor(
        private _notify: NotifyService,
        private _dataAttend: AttendanceDataService,
    ) {
        this.questionTypes = QuestionTypes.List;
    }

    ngAfterViewInit() {
            const element = document.getElementById('htmlContent' + this.index);
            element.innerHTML = this.converter.makeHtml(this.question.content);
    }

    clickThisChoice(choiceClicked): void {
        if (this.question.typeId !== 'SINGLE_CHOICE') { return; }

        for (const choice of this.question.choices) {
            if (choiceClicked.questionChoiceId !== choice.questionChoiceId) {
                choice.selected = false;
            }
        }
    }

    submittableAnswer(): boolean {
        let answerCount = 0;
        for (const choice of this.question.choices) {
            if (choice.selected || choice.openAnswer) { answerCount++; }
        }

        return answerCount > 0;
    }

    submitAnswer(): void {
        const answer = new AnswerRequest();
        answer.attendanceId = this.attendanceId;
        answer.questionId = this.question.questionId;

        if (this.question.typeId === 'OPEN_QUESTION') {
            answer.openAnswer = this.question.choices[0].openAnswer;
        } else {
            for (const choice of this.question.choices) {
                if (choice.selected) {
                    answer.selections.push(choice.questionChoiceId);
                }
            }
        }

        console.log('submit answer', answer);

        this._dataAttend.update(answer.attendanceId + '/answer/' + answer.questionId, answer).subscribe(resp => {
            console.log('answer submission result', resp);
        });
    }

    getQuestionTypeDesc(key: string): string {
        return this.pairMethods.valueOfKey(this.questionTypes, key);
    }
}
