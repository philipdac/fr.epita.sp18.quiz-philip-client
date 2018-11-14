import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Constant} from '../../common/constant';
import {User} from '../../common/user';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit
{
    user: User;

    constructor(
        private authService: AuthService,
    ) {
        this.user = new User();
    }

    ngOnInit()
    {
    }

    signOut()
    {
        this.authService.signOut();
    }

}
