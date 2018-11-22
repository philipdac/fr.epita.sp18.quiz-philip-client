import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import showdown from 'showdown';

import { Question } from 'app/models/question';
import { KeyValuePair } from 'app/models/key-value-pair';
import { QuestionTypes } from 'app/common/question-type';
import { KeyValuePairMethods } from 'app/common/key-value-pair-methods';

@Component({
    selector: 'app-attendance-question',
    templateUrl: './attendance-question.component.html',
    styleUrls: ['./attendance-question.component.css']
})
export class AttendanceQuestionComponent implements AfterViewInit {
    @Input() index: number;
    @Input() question: Question;

    questionTypes: KeyValuePair[];
    pairMethods = KeyValuePairMethods;

    converter = new showdown.Converter();

    constructor() {
        this.questionTypes = QuestionTypes.List;
    }

    ngAfterViewInit() {
            const element = document.getElementById('htmlContent' + this.index);
            element.innerHTML = this.converter.makeHtml(this.question.content);
    }

    clickThisChoice(choice): void {
        console.log('select choice', choice);
    }

    getQuestionTypeDesc(key: string): string {
        return this.pairMethods.valueOfKey(this.questionTypes, key);
    }
}
