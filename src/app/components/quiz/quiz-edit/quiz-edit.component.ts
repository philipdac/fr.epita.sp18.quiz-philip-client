import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Quiz} from 'app/models/quiz';
import {QuizDataService} from 'app/services/quizDataService';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css'],
    providers: [
        QuizDataService
    ]
})
export class QuizEditComponent implements OnInit {
    deleteConfirmed = false;

    constructor(
        public _dialogRef: MatDialogRef<QuizEditComponent>,
        @Inject(MAT_DIALOG_DATA) public quiz: Quiz,
        private _data: QuizDataService,

  ) { }

    ngOnInit(): void
    {
        this.getData();
    }

    getData(): void
    {
        if (this.quiz.quizId) {
            this._data.get(this.quiz.quizId).subscribe(response =>
            {
                this.quiz = response as Quiz;
            });
        }
    }

    close(): void
    {
        this._dialogRef.close(true);
    }

}
