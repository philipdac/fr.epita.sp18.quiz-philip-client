import {KeyValuePair} from '../models/key-value-pair';

export class ScoringTypes{
    public static List: KeyValuePair[] = [
        {key: 'SCORE_MANUALLY', value: 'Score manually'},
        {key: 'ALL_CHOICES_MUST_CORRECT', value: 'All choices must be correct'},
        {key: 'SUM_CORRECT_CHOICES_SCORES', value: 'Sum score of correct choices '},
    ];
}
