import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exam } from 'app/models/exam';
import { User } from 'app/common/user';
import { Question } from 'app/models/question';
import { SelectionModel } from '@angular/cdk/collections';
import { QuestionTypes } from 'app/common/question-type';
import { KeyValuePairMethods } from 'app/common/key-value-pair-methods';
import { ShuffleTypes } from 'app/common/shuffle-type';
import { ExamStatuses } from 'app/common/exam-status';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit, OnChanges {
    @Input() exams: Exam[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() eventSelectRow = new EventEmitter<Exam>();

    examStatuses = ExamStatuses.List;
    shuffleTypes = ShuffleTypes.List;
    pairMethods = KeyValuePairMethods;

    user: User;
    dataSource: MatTableDataSource<Exam>;
    emptyRow: Exam = new Exam();
    selectedRow: Exam = this.emptyRow;
    selection = new SelectionModel<Exam>(true, []);

    displayedColumns = ['select', 'id', 'desc', 'room', 'status', 'shuffle', 'attendance'];

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
        if (changes.hasOwnProperty('exams') && this.exams) {
            this.dataSource.data = this.exams;
        }
    }

    selectRow(row) {
        if (this.selectedRow && this.selectedRow.examId === row.examId) {
            this.selectedRow = this.emptyRow;
        } else {
            this.selectedRow = row;
        }

        this.eventSelectRow.emit(this.selectedRow);
    }

    getShuffleTypeDesc(key: string): string {
        return this.pairMethods.valueOfKey(this.shuffleTypes, key);
    }

    getExamStatusDesc(key: string): string {
        return this.pairMethods.valueOfKey(this.examStatuses, key);
    }
}
