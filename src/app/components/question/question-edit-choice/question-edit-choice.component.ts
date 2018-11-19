import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { KeyValuePair } from 'app/models/key-value-pair';
import { ChoiceNumbers } from 'app/common/choice-number';
import { QuestionChoice } from 'app/models/question-choice';
import { KeyValuePairMethods } from 'app/common/key-value-pair-methods';
import { Question } from 'app/models/question';

@Component({
    selector: 'app-question-edit-choice',
    templateUrl: './question-edit-choice.component.html',
    styleUrls: ['./question-edit-choice.component.css']
})
export class QuestionEditChoiceComponent implements OnInit {
    @Input() choice: QuestionChoice;
    @Input() editableScore: boolean;
    @Output() deleteChoice = new EventEmitter<QuestionChoice>();
    @Output() updateScore = new EventEmitter<void>();

    choiceNumbers: KeyValuePair[];
    pairMethods = KeyValuePairMethods;

    constructor() {
        this.choiceNumbers = ChoiceNumbers.List;
    }

    ngOnInit() {
    }

    getChoiceNumberDesc(key: string): string {
        return this.pairMethods.valueOfKey(this.choiceNumbers, key);
    }

    deleteMe(): void {
        this.deleteChoice.emit(this.choice);
    }

    onScoreChanged(): void {
        this.updateScore.emit();
    }
}
