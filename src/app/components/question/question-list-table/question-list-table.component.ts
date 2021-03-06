import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {User} from 'app/common/user';
import {KeyValuePairMethods} from 'app/common/key-value-pair-methods';

import {QuestionTypes} from 'app/common/question-type';
import {Question} from 'app/models/question';

@Component({
  selector: 'app-question-list-table',
  templateUrl: './question-list-table.component.html',
  styleUrls: ['./question-list-table.component.css']
})
export class QuestionListTableComponent implements OnInit, OnChanges {
    @Input() questions: Question[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() eventSelectRow = new EventEmitter<Question>();

    questionTypes = QuestionTypes.List;
    pairMethods = KeyValuePairMethods;

    user: User;
    dataSource: MatTableDataSource<Question>;
    emptyRow: Question = new Question();
    selectedRow: Question = this.emptyRow;
    selection = new SelectionModel<Question>(true, []);

    displayedColumns = ['select', 'id', 'title', 'type', 'choice', 'score'];

    dataObservable: any;

    constructor() {
        this.user = new User();
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.hasOwnProperty('questions') && this.questions) {
            this.dataSource.data = this.questions;
        }
    }

    selectRow(row) {
        if (this.selectedRow && this.selectedRow.questionId === row.questionId) {
            this.selectedRow = this.emptyRow;
        } else {
            this.selectedRow = row;
        }

        this.eventSelectRow.emit(this.selectedRow);
    }

    getQuestionTypeDesc(key: string): string {
        return this.pairMethods.valueOfKey(this.questionTypes, key);
    }
}
