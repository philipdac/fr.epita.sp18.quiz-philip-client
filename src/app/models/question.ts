import { Quiz } from './quiz';
import { QuestionChoice } from 'app/models/question-choice';
import { AuditModel } from 'app/models/audit-model';

export class Question extends AuditModel {
    questionId = null;
    title = '';
    content = '';
    typeId = '';
    score = 1;
    scoringType = '';
    answer = '';
    quiz = new Quiz();
    choices: QuestionChoice[] = [];
}
