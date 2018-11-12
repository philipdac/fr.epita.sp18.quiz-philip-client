import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constant} from '../../common/constant';
import {QuizService} from '../../services/quiz.service';
import {QuizSnapshot} from '../../models/quiz-snapshot';

@Component({
    selector: 'app-quiz-list-table',
    templateUrl: './quiz-list-table.component.html',
    styleUrls: ['./quiz-list-table.component.css'],
    providers: [QuizService]
})
export class QuizListTableComponent implements OnInit, OnDestroy {
    teacherId: number;
    dataSource: QuizSnapshot[];

    dataObservable: any;

    constructor(
        private _data: QuizService,
    ) {
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
                this.dataSource = resp as QuizSnapshot[];
            });
    }

    ngOnDestroy() {
        this.dataObservable.unsubscribe();
    }
}
