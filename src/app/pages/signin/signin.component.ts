import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
    quizRooms: any;

    quizRoom = new FormControl('JAVA', [
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
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    startQuiz() {
        this.router.navigateByUrl('/exam');
    }

    signIn(serverReady = false) {
        this.signInError = false;
        this.signInConnectionError = false;

        if (this.teacherEmail.invalid) {
            this.signInError = true;
            return;
        }

        if (!serverReady) {
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
