import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {AuthService} from 'app/auth/auth.service';
import {Constant} from 'app/common/constant';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

    examRoom = new FormControl('JAVA', [
        Validators.required
    ]);
    studentEmail = new FormControl('student@email.com', [
        Validators.required,
        Validators.email,
    ]);
    teacherEmail = new FormControl('teacher@email.com', [
        Validators.required,
        Validators.email,
    ]);
    password = new FormControl('Admin1234', [
        Validators.required
    ]);

    returnUrl: string;

    startQuizError = false;
    quizConnectionError = false;

    signInError = false;
    signInConnectionError = false;

    signInSubscription: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {
    }

    ngOnInit() {
        this.titleService.setTitle('Sign in');

        // reset login status
        this.authService.clearSession();

        // get return url from route parameters or default
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/readme';
    }

    startQuiz() {
        localStorage.setItem(Constant.userId, '99');
        localStorage.setItem(Constant.userName, this.studentEmail.value);
        localStorage.setItem(Constant.expiredKey, (new Date('2100-01-01').toISOString()));
        localStorage.setItem(Constant.tokenKey, '1234567890');
        localStorage.setItem(Constant.userType, 'student');

        this.router.navigateByUrl('/attendance?room=' + this.examRoom.value).then();
    }

    signIn(devMode = true) {
        this.signInError = false;
        this.signInConnectionError = false;

        if (this.teacherEmail.invalid) {
            this.signInError = true;
            return;
        }

        if (devMode) {
            localStorage.setItem(Constant.userId, '1');
            localStorage.setItem(Constant.userName, 'teacher@email.com');
            localStorage.setItem(Constant.expiredKey, (new Date('2100-01-01').toISOString()));
            localStorage.setItem(Constant.tokenKey, '1234567890');
            localStorage.setItem(Constant.userType, 'teacher');

            this.router.navigateByUrl(this.returnUrl);
            return;
        }

        this.signInSubscription = this.authService.signIn(this.teacherEmail.value.toUpperCase(), this.password.value).subscribe(
            () => {
                this.router.navigateByUrl(this.returnUrl);
            },
            error => {
                if (error.status === 444 || error.status === 504) {
                    this.signInConnectionError = true;
                } else {
                    this.signInError = true;
                }
            }
        );

    }
}
