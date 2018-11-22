import {Constant} from './constant';

export class User {
    public userId: number;
    public userName: string;
    public userType: string;

    constructor() {
        this.userId = +localStorage.getItem(Constant.userId);
        this.userName = localStorage.getItem(Constant.userName);
        this.userType = localStorage.getItem(Constant.userType);
    }
}
