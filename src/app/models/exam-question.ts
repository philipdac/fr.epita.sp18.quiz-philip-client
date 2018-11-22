import { ExamQuestionChoice } from 'app/models/exam-question-choice';
import { ExamQuestionAnswer } from 'app/models/exam-question-answer';

export class ExamQuestion {
    questionId = null;
    title = '';
    content = '';
    typeId = '';
    score = 0;
    choices = new ExamQuestionChoice();
    answers = new ExamQuestionAnswer();
}
