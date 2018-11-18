import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';

import {User} from 'app/common/user';
import {NotifyService} from 'app/services/notify.service';
import {Question} from 'app/models/question';
import {Quiz} from 'app/models/quiz';
import {QuizDataService} from 'app/services/quiz-data.service';
import {QuestionDataService} from 'app/services/question-data.service';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [QuestionDataService, QuizDataService, NotifyService]
})
export class QuestionListComponent implements OnInit, OnDestroy {
    quizId: number;
    quiz: Quiz;
    questions: Question[];
    user: User;
    selectedRow: Question = new Question();

    quizObservable: any;
    questObservable: any;

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _route: ActivatedRoute,
        private _data: QuestionDataService,
        private _dataQuiz: QuizDataService
    ) {
        this.user = new User();
        this.quizId = 0;
        this.quiz = new Quiz();
    }

    ngOnInit() {
        this._title.setTitle('Question list');
        this.getData();
    }

    getData(): void {
        this.quizId = +this._route.snapshot.paramMap.get('quizId');

        this.quizObservable = this._dataQuiz
            .get(this.quizId)
            .subscribe(resp => {
                console.log('quiz', resp);
                this.quiz = resp as Quiz;
            });

        this.questObservable = this._data
            .list({quizId: this.quizId})
            .subscribe(resp => {
                console.log('questions', resp);
                this.questions = resp as Question[];
            });
    }

    ngOnDestroy() {
        this.questObservable.unsubscribe();
        this.quizObservable.unsubscribe();
    }

    eventSelectRow(row) {
        this.selectedRow = row;
    }

    delete(questionId): void {

    }

    edit(questionId): void {

    }
}
