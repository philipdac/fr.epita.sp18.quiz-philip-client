import { AuditModel } from 'app/models/audit-model';
import { Quiz } from 'app/models/quiz';

export class Exam extends AuditModel{
    examId = null;
    examDesc = '';
    examRoom = '';
    examStatus = 'OPEN';
    shuffleType = 'NO_SHUFFLE';
    quiz = new Quiz();
}
