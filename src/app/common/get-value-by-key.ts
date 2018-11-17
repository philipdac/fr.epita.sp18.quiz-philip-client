import {KeyValuePair} from '../models/key-value-pair';

export class GetValueByKey {
    public static get(list: KeyValuePair[], key: string): string {
        const pair = list.find(x => x.key === key);
        return pair ? pair.value : '';
    }
}
