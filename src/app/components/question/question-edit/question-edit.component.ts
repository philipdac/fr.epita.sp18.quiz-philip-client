import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifyService } from 'app/services/notify.service';
import { QuestionDataService } from 'app/services/question-data.service';
import { User } from 'app/common/user';
import { Question } from 'app/models/question';
import { KeyValuePair } from 'app/models/key-value-pair';
import { QuestionTypes } from 'app/common/question-type';
import { Quiz } from 'app/models/quiz';
import { ScoringTypes } from 'app/common/scoring-type';
import { QuestionChoice } from 'app/models/question-choice';
import { QuizDataService } from 'app/services/quiz-data.service';
import { ChoiceNumbers } from 'app/common/choice-number';

@Component({
    selector: 'app-question-edit',
    templateUrl: './question-edit.component.html',
    styleUrls: ['./question-edit.component.css'],
    providers: [
        QuestionDataService, QuizDataService
    ]
})
export class QuestionEditComponent implements OnInit, OnDestroy {
    user: User;
    dataObservable: any;
    quizObservable: any;

    quizId = 0;
    quiz: Quiz;
    question: Question;
    questionId: number;

    choiceNumbers: KeyValuePair[];
    questionTypes: KeyValuePair[];
    scoringTypes: KeyValuePair[];

    constructor(private _title: Title,
                private _dialog: MatDialog,
                private _notify: NotifyService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _data: QuestionDataService,
                private _dataQuiz: QuizDataService
    ) {
        this.user = new User();
        this.quiz = new Quiz();
        this.question = new Question();

        this.choiceNumbers = ChoiceNumbers.List;
        this.questionTypes = QuestionTypes.List;
        this.scoringTypes = ScoringTypes.List;
    }

    ngOnInit() {
        this._title.setTitle('Edit question');
        this.getData();
    }

    getData(): void {
        this.quizId = +this._route.snapshot.paramMap.get('quizId');
        this.quizObservable = this._dataQuiz
            .get(this.quizId)
            .subscribe(resp => {
                console.log('got quiz', resp);
                this.quiz = resp as Quiz;
            });

        this.questionId = +this._route.snapshot.paramMap.get('questionId');
        if (this.questionId <= 0) {
            this.question = new Question();
            return;
        }

        this.dataObservable = this._data
            .get(this.questionId)
            .subscribe(resp => {
                console.log('got question', resp);

                this.question = resp as Question;
                this.quiz = this.question.quiz;
            });
    }

    ngOnDestroy() {
        if (this.dataObservable) {
            this.dataObservable.unsubscribe();
        }
        this.quizObservable.unsubscribe();
    }

    viewMarkdown(content): string {
        return content;
    }

    newQuestion(): void {
        this._router.navigateByUrl(`/quizzes/${this.quizId}/questions/0`).then();
    }

    isMultipleChoices() {
        return this.question.typeId === 'MULTIPLE_CHOICE';
    }

    saveQuestion(): void {
        switch (this.question.typeId) {
            case  'OPEN_QUESTION':
                this.question.scoringType = 'SCORE_MANUALLY';
                break;
            case  'SINGLE_CHOICE':
                this.question.scoringType = 'ALL_CHOICES_MUST_CORRECT';
                break;
        }

        console.log('saving question', this.question);

        let save: any;

        if (this.question.questionId) {
            // update existing question
            save = this._data.update(this.question.questionId, this.question);
        } else {
            // create a new question
            save = this._data.create(this.question);
        }

        save.subscribe(response => {
            this._notify.success('Your question is saved!', 3000);
        });
    }

    deleteQuestion(): void {
    }

    addChoice(): void {
        if (this.question.choices.length >= this.choiceNumbers.length) {
            this._notify.error('Too much choices for this question. Can not add more!');
            return;
        }
        const choice = new QuestionChoice();
        this.question.choices.push(choice);
    }

}
