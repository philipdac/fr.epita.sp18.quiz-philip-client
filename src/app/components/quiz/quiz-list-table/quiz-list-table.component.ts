import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {Constant} from 'app/common/constant';
import {QuizDataService} from 'app/services/quizDataService';
import {QuizSnapshot} from 'app/models/quiz-snapshot';

@Component({
    selector: 'app-quiz-list-table',
    templateUrl: './quiz-list-table.component.html',
    styleUrls: ['./quiz-list-table.component.css'],
    providers: [QuizDataService]
})
export class QuizListTableComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Output() eventSelectRow = new EventEmitter<QuizSnapshot>();

    teacherId: number;

    dataSource: MatTableDataSource<QuizSnapshot>;
    emptyRow: QuizSnapshot = new QuizSnapshot();
    selectedRow: QuizSnapshot = this.emptyRow;
    selection = new SelectionModel<QuizSnapshot>(true, []);

    displayedColumns = ['select', 'quizId', 'title', 'questionCount', 'duration', 'shuffleType', 'examCount', 'teacherName'];

    dataObservable: any;

    constructor(
        private _data: QuizDataService,
    ) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit() {
        this.teacherId = +localStorage.getItem(Constant.userId);

        this.getData();
    }

    getData(): void {
        this.dataObservable = this._data
            .list({teacherId: this.teacherId})
            .subscribe(resp => {
                console.log('data', resp);
                this.dataSource.data = resp as QuizSnapshot[];
            });
    }

    ngOnDestroy() {
        this.dataObservable.unsubscribe();
    }

    selectRow(row) {
        if (this.selectedRow && this.selectedRow.quizId === row.quizId) {
            this.selectedRow = this.emptyRow;
        } else {
            this.selectedRow = row;
        }

        this.eventSelectRow.emit(this.selectedRow);
    }
}
