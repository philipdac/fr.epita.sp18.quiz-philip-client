import {Exam} from './exam';

export class QuizSnapshot {
    quizId: number;
    title: string;
    duration: number;
    shuffleType: string;
    exams: Exam[];
    teacherId: number;
    teacherName: string;
}
