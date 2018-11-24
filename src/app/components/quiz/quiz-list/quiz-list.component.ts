import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

import {NotifyService} from 'app/services/notify.service';

import {QuizDataService} from 'app/services/quiz-data.service';
import {Quiz} from 'app/models/quiz';
import {QuizSnapshot} from 'app/models/quiz-snapshot';
import {QuizEditComponent} from '../quiz-edit/quiz-edit.component';
import {User} from 'app/common/user';

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
        private _router: Router,
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
                console.log('got quizzes', resp);
                this.quizzes = resp as QuizSnapshot[];
            });
    }

    ngOnDestroy() {
        this.dataObservable.unsubscribe();
    }

    eventSelectRow(row) {
        this.selectedRow = row;
    }

    delete(quizId: number): void {
        this._data.delete(this.selectedRow.quizId).then(resp => {
            if (!resp['hasError']) {
                this.getData();
            } else {
                this._notify.error(resp['errorMessage']);
            }
        });
    }

    edit(quizId: number): void {
        const quiz = new Quiz();

        if (quizId) {
            quiz.quizId = quizId;
            quiz.title = ' getting data...';
        }
        quiz.teacher.id = this.user.userId;

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

    examList(quizId: number): void {
        this._router.navigateByUrl(`/quizzes/${quizId}/questions?view=exam`).then();
    }

    questionList(quizId: number): void {
        this._router.navigateByUrl(`/quizzes/${quizId}/questions?view=question`).then();
    }
}
