import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Constant} from '../../common/constant';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit
{
    userName: string;

    constructor(
        private authService: AuthService,
    ) {
        this.userName = localStorage.getItem(Constant.userName);
    }

    ngOnInit()
    {
    }

    signOut()
    {
        this.authService.signOut();
    }

}
