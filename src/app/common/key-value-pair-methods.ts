import {KeyValuePair} from '../models/key-value-pair';

export class KeyValuePairMethods {
    public static valueOfKey(list: KeyValuePair[], key: string): string {
        const pair = list.find(x => x.key === key);
        return pair ? pair.value : '';
    }
}
