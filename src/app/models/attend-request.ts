import { AuditModel } from 'app/models/audit-model';

export class AttendRequest extends AuditModel{
    email = '';
    examRoom = '';
}
