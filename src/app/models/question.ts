import {Quiz} from './quiz';
import {QuestionChoice} from 'app/models/question-choice';

export class Question {
    questionId = 0;
    title = '';
    content = '';
    typeId = '';
    score = 1;
    scoringType = '';
    answer = '';
    quizId = 0;
    quiz = new Quiz();
    choices: QuestionChoice[] = [];
}
