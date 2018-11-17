import {Quiz} from './quiz';

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
}
