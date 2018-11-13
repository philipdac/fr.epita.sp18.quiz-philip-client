import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';

import {NotifyService} from 'app/services/notify.service';

import {QuizDataService} from 'app/services/quizDataService';
import {Quiz} from 'app/models/quiz';
import {QuizSnapshot} from 'app/models/quiz-snapshot';
import {QuizEditComponent} from '../quiz-edit/quiz-edit.component';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css'],
    providers: [QuizDataService, NotifyService]
})
export class QuizListComponent implements OnInit {
    selectedRow: QuizSnapshot = new QuizSnapshot();

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _data: QuizDataService
    ) {
    }

    ngOnInit() {
        this._title.setTitle('Quiz list');
    }

    eventSelectRow(row) {
        this.selectedRow = row;
    }

    editQuiz(quizId): void {
        const quiz = new Quiz();
        quiz.quizId = this.selectedRow.quizId;
        quiz.title = this.selectedRow.title;

        const dialogRef = this._dialog.open(QuizEditComponent, {
            minHeight: '320px',
            minWidth: '360px',
            data: quiz
        });

        dialogRef.afterClosed().subscribe(cancelled =>
        {
            if (!cancelled) {
                console.log('reload data');
            }
        });
    }
}
