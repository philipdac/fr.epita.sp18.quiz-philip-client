import {Constant} from './constant';

export class User {
    public userId: number;
    public userName: string;

    constructor() {
        this.userId = +localStorage.getItem(Constant.userId);
        this.userName = localStorage.getItem(Constant.userName);
    }
}
