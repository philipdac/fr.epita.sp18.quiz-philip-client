import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';

import {User} from 'app/common/user';
import {NotifyService} from 'app/services/notify.service';
import {QuestionDataService} from 'app/services/question-data.service';
import {Question} from 'app/models/question';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [QuestionDataService, NotifyService]
})
export class QuestionListComponent implements OnInit, OnDestroy {
    quizId: number;
    questions: Question[];
    user: User;
    selectedRow: Question = new Question();

    dataObservable: any;

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _route: ActivatedRoute,
        private _data: QuestionDataService
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this._title.setTitle('Question list');
        this.getData();
    }

    getData(): void {
        this.quizId = +this._route.snapshot.paramMap.get('quizId');

        this.dataObservable = this._data
            .list({quizId: this.quizId})
            .subscribe(resp => {
                console.log('data', resp);
                this.questions = resp as Question[];
            });
    }

    ngOnDestroy() {
        this.dataObservable.unsubscribe();
    }

    eventSelectRow(row) {
        this.selectedRow = row;
    }

    delete(questionId): void {

    }

    edit(questionId): void {

    }
}
