import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

import {NotifyService} from 'app/services/notify.service';
import {QuestionDataService} from 'app/services/question-data.service';
import {User} from 'app/common/user';
import {Question} from 'app/models/question';
import {KeyValuePair} from 'app/models/key-value-pair';
import {QuestionTypes} from 'app/common/question-type';
import {Quiz} from 'app/models/quiz';
import {ScoringTypes} from 'app/common/scoring-type';
import {QuestionChoice} from 'app/models/question-choice';

@Component({
    selector: 'app-question-edit',
    templateUrl: './question-edit.component.html',
    styleUrls: ['./question-edit.component.css'],
    providers: [
        QuestionDataService,
    ]
})
export class QuestionEditComponent implements OnInit, OnDestroy {
    user: User;
    dataObservable: any;

    quizId = 0;
    quiz: Quiz;
    question: Question;
    questionId: number;

    questionTypes: KeyValuePair[];
    scoringTypes: KeyValuePair[];

    constructor(private _title: Title,
                private _dialog: MatDialog,
                private _notify: NotifyService,
                private _route: ActivatedRoute,
                private _data: QuestionDataService
    ) {
        this.user = new User();
        this.questionTypes = QuestionTypes.List;
        this.scoringTypes = ScoringTypes.List;

        this.newQuestion();
    }

    ngOnInit() {
        this._title.setTitle('Edit question');
        this.getData();
    }

    getData(): void {
        this.quizId = +this._route.snapshot.paramMap.get('quizId');
        this.questionId = +this._route.snapshot.paramMap.get('questionId');

        this.dataObservable = this._data
            .get(this.questionId)
            .subscribe(resp => {
                console.log('question', resp);
                this.question = resp as Question;
                this.quiz = this.question.quiz;
            });
    }

    ngOnDestroy() {
        this.dataObservable.unsubscribe();
    }

    viewMarkdown(content): string {
        return content;
    }

    newQuestion(): void {
        this.question = new Question();
        this.question.quizId = this.quizId;
        this.question.quiz.quizId = this.quizId;
        this.quiz = this.question.quiz;
    }

    isMultipleChoices() {
        return this.question.typeId === 'MULTIPLE_CHOICE';
    }

    saveQuestion(): void {
        switch (this.question.typeId) {
            case  'OPEN_QUESTION':
                this.question.scoringType = 'SCORE_MANUALLY';
                break;
            case  'SINGLE_CHOICE':
                this.question.scoringType = 'MUST_MATCH_ALL';
                break;
        }

        console.log('saving question', this.question);

        let save: any;

        if (this.question.questionId) {
            // update existing question
            save = this._data.update(this.question.questionId, this.question);
        } else {
            // create a new question
            save = this._data.create(this.question);
        }

        save.subscribe(response => {
            this._notify.success('Your question is saved!', 3000);
        });
    }

    deleteQuestion(): void {}

    addChoice(): void {
        const choice = new QuestionChoice();
        this.question.choices.push(choice);
    }
}
