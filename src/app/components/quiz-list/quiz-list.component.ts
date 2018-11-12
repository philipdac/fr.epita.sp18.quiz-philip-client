import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {NotifyService} from '../../services/notify.service';
import {QuizService} from '../../services/quiz.service';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css'],
    providers: [QuizService, NotifyService]
})
export class QuizListComponent implements OnInit {

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _data: QuizService
    ) {
    }

    ngOnInit() {
        this._title.setTitle('Quiz list');
        this.getData();
    }

    getData(): void {

    }
}
