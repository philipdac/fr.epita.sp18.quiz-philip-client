import { AuditModel } from 'app/models/audit-model';

export class Quiz  extends AuditModel{
    quizId = null;
    title = '';
    duration = 0;
    teacherId = 0;

    questionCount = 0;
    examCount = 0;
}
