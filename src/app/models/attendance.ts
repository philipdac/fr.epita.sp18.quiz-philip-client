import { ExamQuestion } from 'app/models/exam-question';

export class Attendance {
    attendanceId = null;
    studentEmail = '';
    startTime = '';
    endTime = '';

    questions = new ExamQuestion();
}
