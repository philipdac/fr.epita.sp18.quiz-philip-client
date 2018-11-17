import {KeyValuePair} from '../models/key-value-pair';

export class ScoringTypes{
    public static List: KeyValuePair[] = [
        {key: 'SCORE_MANUALLY', value: 'Score manually'},
        {key: 'MUST_MATCH_ALL', value: 'Must match all choices'},
        {key: 'ONE_WRONG_CHOICE_IS_FAIL', value: 'One wrong choice is fail'},
        {key: 'NO_WRONG_CHOICE_THEN_SUM_CHOICES_SCORES', value: 'No wrong choice. Sum choice\'s scores'},
    ];
}
