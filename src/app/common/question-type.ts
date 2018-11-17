import {KeyValuePair} from '../models/key-value-pair';

export class QuestionTypes {
    public static List: KeyValuePair[] = [
        {key: 'OPEN_QUESTION', value: 'Open question'},
        {key: 'SINGLE_CHOICE', value: 'Single choice'},
        {key: 'MULTIPLE_CHOICE', value: 'Multiple choices'},
    ];
}
