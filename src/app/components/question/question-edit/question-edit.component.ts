import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
import { forEach } from '@angular/router/src/utils/collection';

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

    quizId = 0;
    quiz: Quiz;
    question: Question;
    questionId: number;

    choiceNumbers: KeyValuePair[];
    questionTypes: KeyValuePair[];
    scoringTypes: KeyValuePair[];

    inputErrMsg = '';

    dataObservable: any;
    quizObservable: any;
    routeObservable: any;

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
                this.quiz = resp as Quiz;
                console.log('got quiz', this.quiz);
            });

        this.routeObservable = this._route.params.subscribe((params: Params) => {
            this.questionId = +params['questionId'];

            if (this.questionId <= 0) {
                this.question = new Question();
                this.question.quiz = this.quiz;
                console.log('new question', this.quiz);
                return;
            }

            this.dataObservable = this._data
                .get(this.questionId)
                .subscribe(resp => {
                    this.question = resp as Question;
                    console.log('got question', this.question);
                });
        });
    }

    ngOnDestroy() {
        if (this.dataObservable) {
            this.dataObservable.unsubscribe();
        }
        this.quizObservable.unsubscribe();
        this.routeObservable.unsubscribe();
    }

    viewMarkdown(content): string {
        return content;
    }

    newQuestion(): void {
        this._router.navigate(['/quizzes', this.quizId, 'questions', 0]).then();
    }

    isMultipleChoices() {
        return this.question.typeId === 'MULTIPLE_CHOICE';
    }

    isValidChoices(): string {
        let countCorrectChoice = 0;

        // Check if choiceNumber = 'NONE' or duplicate
        const len = this.question.choices.length;
        for (let i = 0; i < len; i++) {
            const num = this.question.choices[i].choiceNumber;
            if (num === 'NONE') {
                return 'lacking-choice';
            }

            for (let j = i + 1; j < len; j++) {
                if (num === this.question.choices[j].choiceNumber) {
                    return 'duplicate';
                }
            }

            countCorrectChoice += this.question.choices[i].correctChoice ? 1 : 0;
        }

        if (this.question.typeId === 'SINGLE_CHOICE' && countCorrectChoice !== 1) {
            return 'need-single-correct-choice';
        }

        if (this.question.typeId === 'MULTIPLE_CHOICE') {
            if (countCorrectChoice < 2) {
                return 'need-correct-choice';
            } else if (countCorrectChoice === len) {
                return 'all-choice-correct';
            }
        }

        return '';
    }

    isValidQuestion(): boolean {

        if (!this.question.typeId) {
            this.inputErrMsg = 'Please select a question type!';
            return false;
        }

        if (!this.question.title && !this.question.content) {
            this.inputErrMsg = 'The question title and content should not be both empty!';
            return false;
        }

        if (this.question.typeId === 'OPEN_QUESTION' && this.question.choices.length > 0) {
            this.inputErrMsg = 'An open question should not have any choice!';
            return false;
        }

        if (this.question.typeId !== 'OPEN_QUESTION' && this.question.choices.length < 2) {
            this.inputErrMsg = 'Your question needs at less 2 choices!';
            return false;
        }

        switch (this.isValidChoices()) {
            case 'lacking-choice':
            case 'duplicate':
                this.inputErrMsg = 'Please make sure your question\'s choice numbers are selected and unique!';
                return false;
            case 'need-single-correct-choice':
                this.inputErrMsg = 'Please specify one & only one correct choice!';
                return false;
            case 'need-correct-choice':
                this.inputErrMsg = 'Please specify some correct choices!';
                return false;
            case 'all-choice-correct':
                this.inputErrMsg = 'All choices are correct. What\'s a quiz!?';
                return false;
        }

        if (!this.question.score) {
            this.inputErrMsg = 'Please give score to this question!';
            return false;
        }

        this.inputErrMsg = '';
        return true;
    }

    scoringTypeChanged() {
        if (this.question.scoringType === 'SUM_CORRECT_CHOICES_SCORES') {
            this.sumChoiceScore();
            return;
        }

        this.question.choices.forEach(choice => {
            choice.score = 0;
        });
    }

    sumChoiceScore(): void {
        let score = 0;
        this.question.choices.forEach(choice => {
            if (choice.correctChoice) {
                score += choice.score;
            } else {
                choice.score = 0;
            }
        });

        this.question.score = score;
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

    getNextChoiceNumber(): string {
        return this.choiceNumbers[this.question.choices.length + 1].key;
    }

    addChoice(): void {
        if (this.question.choices.length >= this.choiceNumbers.length) {
            this._notify.error('Too many choices for this question. Can not add more!');
            return;
        }
        const choice = new QuestionChoice();
        choice.choiceNumber = this.getNextChoiceNumber();

        this.question.choices.push(choice);
    }

    deleteChoice(choice: QuestionChoice): void {
        const index = this.question.choices.findIndex(x => {
            if (choice.questionChoiceId) {
                return choice.questionChoiceId === x.questionChoiceId;
            } else {
                return choice.updatedAt === x.updatedAt;
            }
        });

        if (index >= 0) {
            this.question.choices.splice(index, 1);
        }
    }
}
