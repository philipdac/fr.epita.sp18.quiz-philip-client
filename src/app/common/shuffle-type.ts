import {KeyValuePair} from '../models/key-value-pair';

export class ShuffleTypes{
    public static List: KeyValuePair[] = [
        {key: 'NO_SHUFFLE', value: 'Do not shuffle'},
        {key: 'SHUFFLE_QUIZ', value: 'Shuffle the questions'},
        {key: 'SHUFFLE_QUIZ_AND_CHOICE', value: 'Shuffle questions and choices'},
    ];
}
