import { AuditModel } from 'app/models/audit-model';

export class Exam extends AuditModel{
    examId = 0;
    examDesc = '';
    examRoom = '';
    examStatus = '';
    shuffleType = '';
}
