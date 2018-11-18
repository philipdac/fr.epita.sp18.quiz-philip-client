import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

import {Constant} from 'app/common/constant';
import {QuizDataService} from 'app/services/quiz-data.service';
import {QuizSnapshot} from 'app/models/quiz-snapshot';
import {User} from 'app/common/user';

@Component({
    selector: 'app-quiz-list-table',
    templateUrl: './quiz-list-table.component.html',
    styleUrls: ['./quiz-list-table.component.css'],
    providers: [QuizDataService]
})
export class QuizListTableComponent implements OnInit, OnChanges {
    @Input() quizzes: QuizSnapshot[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() eventSelectRow = new EventEmitter<QuizSnapshot>();

    user: User;
    dataSource: MatTableDataSource<QuizSnapshot>;

    emptyRow: QuizSnapshot = new QuizSnapshot();
    selectedRow: QuizSnapshot = this.emptyRow;
    selection = new SelectionModel<QuizSnapshot>(true, []);

    displayedColumns = ['select', 'id', 'title', 'question', 'duration', 'exam', 'teacher'];

    dataObservable: any;

    constructor(
        private _router: Router,
    ) {
        this.user = new User();
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.hasOwnProperty('quizzes') && this.quizzes) {
            this.dataSource.data = this.quizzes;
        }
    }

    selectRow(row) {
        if (this.selectedRow && this.selectedRow.quizId === row.quizId) {
            this.selectedRow = this.emptyRow;
        } else {
            this.selectedRow = row;
        }

        this.eventSelectRow.emit(this.selectedRow);
    }

    examList(quizId: number): void {
        this._router.navigateByUrl(`/quizzes/${quizId}/questions?view=exam`).then();
    }

    questionList(quizId: number): void {
        this._router.navigateByUrl(`/quizzes/${quizId}/questions?view=question`).then();
    }
}
