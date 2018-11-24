import { AuditModel } from 'app/models/audit-model';
import { IdentityResponse } from 'app/models/identity-response';

export class Quiz  extends AuditModel{
    quizId = null;
    title = '';
    duration = 0;
    teacher = new IdentityResponse();
}
