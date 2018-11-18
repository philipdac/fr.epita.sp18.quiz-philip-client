import { AuditModel } from 'app/models/audit-model';

export class QuestionChoice extends AuditModel {
    questionChoiceId = null;
    questionId = null;
    choiceNumber = 'NONE';
    correctChoice = false;
    description = '';
    score = 0;
}
