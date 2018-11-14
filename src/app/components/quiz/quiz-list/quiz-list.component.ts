import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialog, MatTableDataSource} from '@angular/material';

import {NotifyService} from 'app/services/notify.service';

import {QuizDataService} from 'app/services/quiz-data.service';
import {Quiz} from 'app/models/quiz';
import {QuizSnapshot} from 'app/models/quiz-snapshot';
import {QuizEditComponent} from '../quiz-edit/quiz-edit.component';
import {User} from '../../../common/user';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css'],
    providers: [QuizDataService, NotifyService]
})
export class QuizListComponent implements OnInit, OnDestroy {
    quizzes: QuizSnapshot[];
    user: User;
    selectedRow: QuizSnapshot = new QuizSnapshot();
    dataObservable: any;

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _data: QuizDataService
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this._title.setTitle('Quiz list');
        this.getData();
    }

    getData(): void {
        this.dataObservable = this._data
            .list({teacherId: this.user.userId})
            .subscribe(resp => {
                console.log('data', resp);
                this.quizzes = resp as QuizSnapshot[];
            });
    }

    ngOnDestroy() {
        this.dataObservable.unsubscribe();
    }

    eventSelectRow(row) {
        this.selectedRow = row;
    }

    editQuiz(quizId): void {
        const quiz = new Quiz();

        if (quizId) {
            quiz.quizId = quizId;
            quiz.title = ' getting data...';
        }
        quiz.teacherId = this.user.userId;

        const dialogRef = this._dialog.open(QuizEditComponent, {
            minHeight: '320px',
            minWidth: '420px',
            data: quiz
        });

        dialogRef.afterClosed().subscribe(cancelled => {
            if (!cancelled) {
                this.getData();
            }
        });
    }
}
