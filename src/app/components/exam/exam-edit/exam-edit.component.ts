import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { NotifyService } from 'app/services/notify.service';
import { User } from 'app/common/user';

import { ExamDataService } from 'app/services/exam-data.service';
import { ExamStatuses } from 'app/common/exam-status';
import { ShuffleTypes } from 'app/common/shuffle-type';
import { Exam } from 'app/models/exam';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css'],
    providers: [
        ExamDataService, NotifyService
    ]
})
export class ExamEditComponent implements OnInit {

    examStatuses = ExamStatuses.List;
    shuffleTypes = ShuffleTypes.List;

    user: User;

    constructor(
        public _dialogRef: MatDialogRef<ExamEditComponent>,
        @Inject(MAT_DIALOG_DATA) public exam: Exam,
        private _data: ExamDataService,
        private _notify: NotifyService,
    ) {
        this.user = new User();
    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        if (this.exam.examId) {
            this._data.get(this.exam.examId).subscribe(response => {
                this.exam = response as Exam;
                console.log('got exam', this.exam);
            });
        }
    }

    close(): void {
        this._dialogRef.close(true);
    }

    save(): void {
        let save: any;

        console.log('saving exam', this.exam);

        if (this.exam.examId) {
            // update existing exam
            save = this._data.update(this.exam.examId, this.exam);
        } else {
            // create a new exam
            save = this._data.create(this.exam);
        }

        save.subscribe(response => {
            this._dialogRef.close(false);
            this._notify.success('Your exam is saved!', 3000);
        });
    }
}
