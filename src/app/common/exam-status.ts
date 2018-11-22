import {KeyValuePair} from '../models/key-value-pair';

export class ExamStatuses{
    public static List: KeyValuePair[] = [
        {key: 'OPEN', value: 'Open to attendance'},
        {key: 'SUBMISSION_ONLY', value: 'No new attendance. Only submission'},
        {key: 'COMPLETED', value: 'Completed'},
        {key: 'DELETED', value: 'Deleted'},
    ];
}
