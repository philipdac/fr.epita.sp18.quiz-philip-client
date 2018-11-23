import { ExamQuestion } from 'app/models/exam-question';

export class Attendance {
    attendanceId = null;
    studentEmail = '';
    title = '';
    duration = 0;
    startTime = '';
    endTime = '';

    questions: ExamQuestion[] = [];
}
