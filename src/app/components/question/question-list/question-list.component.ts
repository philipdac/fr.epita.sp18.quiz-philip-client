import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { User } from 'app/common/user';
import { NotifyService } from 'app/services/notify.service';
import { Question } from 'app/models/question';
import { Quiz } from 'app/models/quiz';
import { QuizDataService } from 'app/services/quiz-data.service';
import { QuestionDataService } from 'app/services/question-data.service';
import { Exam } from 'app/models/exam';
import { ExamDataService } from 'app/services/exam-data.service';
import { QuizEditComponent } from 'app/components/quiz/quiz-edit/quiz-edit.component';
import { ExamEditComponent } from 'app/components/exam/exam-edit/exam-edit.component';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [QuestionDataService, QuizDataService, ExamDataService, NotifyService]
})
export class QuestionListComponent implements OnInit, OnDestroy {
    quizId: number;
    quiz: Quiz;
    exams: Exam[];
    questions: Question[];
    selectedExam: Exam = new Exam();
    selectedQuestion: Question = new Question();

    user: User;
    viewTab = 0;

    quizObservable: any;
    questObservable: any;
    examObservable: any;

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _dataQuestion: QuestionDataService,
        private _dataQuiz: QuizDataService,
        private _dataExam: ExamDataService
    ) {
        this.user = new User();
        this.quizId = 0;
        this.quiz = new Quiz();
        this.exams = [];
        this.questions = [];
    }

    ngOnInit() {
        this._title.setTitle('Question list');
        this.getData();
    }

    getData(): void {
        const view = this._route.snapshot.queryParamMap.get('view');
        this.viewTab = view === 'exam' ? 1 : 0;

        this.quizId = +this._route.snapshot.paramMap.get('quizId');
        this.quizObservable = this._dataQuiz
            .get(this.quizId)
            .subscribe(resp => {
                console.log('got quiz', resp);
                this.quiz = resp as Quiz;
            });

        this.questObservable = this._dataQuestion
            .list({quizId: this.quizId})
            .subscribe(resp => {
                console.log('got questions', resp);
                this.questions = resp as Question[];
            });

        this.examObservable = this._dataExam
            .list({quizId: this.quizId})
            .subscribe(resp => {
                console.log('got exams', resp);
                this.exams = resp as Exam[];
            });
    }

    ngOnDestroy() {
        this.questObservable.unsubscribe();
        this.quizObservable.unsubscribe();
        this.examObservable.unsubscribe();
    }

    eventSelectExam(exam) {
        this.selectedExam = exam;
    }

    eventSelectQuestion(question) {
        this.selectedQuestion = question;
    }

    deleteQuestion(questionId): void {
        this._dataQuestion.delete(questionId).then(resp => {
            this.getData();
        });
    }

    editQuestion(questionId: number): void {
        this._router.navigateByUrl(`/quizzes/${this.quizId}/questions/${questionId}`).then();
    }

    deleteExam(examId: number): void {
        this._dataExam.delete(examId).then(resp => {
            this.getData();
        });
    }

    editExam(examId: number): void {
        const exam = new Exam();
        exam.quiz = this.quiz;

        if (examId) {
            exam.examId = examId;
            exam.examDesc = ' getting data...';
        }

        const dialogRef = this._dialog.open(ExamEditComponent, {
            minHeight: '320px',
            minWidth: '420px',
            data: exam
        });

        dialogRef.afterClosed().subscribe(cancelled => {
            if (!cancelled) {
                this.getData();
            }
        });
    }
}
