import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatInputModule} from '@angular/material';

import {Quiz} from 'app/models/quiz';
import {QuizDataService} from 'app/services/quiz-data.service';
import {ShuffleTypes} from 'app/common/shuffle-type';
import {NotifyService} from 'app/services/notify.service';
import {User} from 'app/common/user';

@Component({
    selector: 'app-quiz-edit',
    templateUrl: './quiz-edit.component.html',
    styleUrls: ['./quiz-edit.component.css'],
    providers: [
        QuizDataService
    ]
})
export class QuizEditComponent implements OnInit {
    shuffleTypes = ShuffleTypes.List;
    user: User;

    constructor(
        public _dialogRef: MatDialogRef<QuizEditComponent>,
        @Inject(MAT_DIALOG_DATA) public quiz: Quiz,
        private _data: QuizDataService,
        private _notify: NotifyService,
    ) {
        this.user = new User();
    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        if (this.quiz.quizId) {
            this._data.get(this.quiz.quizId).subscribe(response => {
                this.quiz = response as Quiz;
                console.log('got quiz', this.quiz);
            });
        }
    }

    close(): void {
        this._dialogRef.close(true);
    }

    save(): void {
        let save: any;

        console.log('saving quiz', this.quiz);

        if (this.quiz.quizId) {
            // update existing quiz
            save = this._data.update(this.quiz.quizId, this.quiz);
        } else {
            // create a new quiz
            save = this._data.create(this.quiz);
        }

        save.subscribe(response => {
            this._dialogRef.close(false);
            this._notify.success('Your quiz is saved!', 3000);
        });
    }
}
