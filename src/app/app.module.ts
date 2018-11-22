import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';

import * as AppRoutes from './app.routes';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AppErrorModule} from './errors/app-error.module';
import {NotifyService} from './services/notify.service';

import {LayoutComponent} from './pages/layout/layout.component';
import {NavBarComponent} from './pages/nav-bar/nav-bar.component';
import {SignInComponent} from './pages/signin/signin.component';
import {DialogConfirmCancelComponent} from './components/dialog-confirm-cancel/dialog-confirm-cancel.component';

import {ReadmeComponent} from './components/readme/readme.component';

import {IdentityEditComponent} from './components/identity/identity-edit/identity-edit.component';
import {IdentityListComponent} from './components/identity/identity-list/identity-list.component';
import {IdentityTableComponent} from './components/identity/identity-table/identity-table.component';

import {QuizListComponent} from './components/quiz/quiz-list/quiz-list.component';
import {QuizListTableComponent} from './components/quiz/quiz-list-table/quiz-list-table.component';
import {QuizEditComponent} from './components/quiz/quiz-edit/quiz-edit.component';

import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuestionEditComponent } from './components/question/question-edit/question-edit.component';
import { QuestionListTableComponent } from './components/question/question-list-table/question-list-table.component';
import { QuestionEditChoiceComponent } from './components/question/question-edit-choice/question-edit-choice.component';
import { ExamListComponent } from './components/exam/exam-list/exam-list.component';
import { ExamEditComponent } from './components/exam/exam-edit/exam-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavBarComponent,
        DialogConfirmCancelComponent,
        SignInComponent,
        IdentityTableComponent,
        IdentityEditComponent,
        IdentityListComponent,
        QuizListComponent,
        ReadmeComponent,
        QuizListTableComponent,
        QuizEditComponent,
        QuestionListComponent,
        QuestionEditComponent,
        QuestionListTableComponent,
        QuestionEditChoiceComponent,
        ExamListComponent,
        ExamEditComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppErrorModule,
        FormsModule,
        HttpClientModule,
        LayoutModule,

        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,

        ReactiveFormsModule,
        RouterModule.forRoot(
            AppRoutes.AuthRoute
        )
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthGuard,
        AuthService,
        NotifyService
    ],
    bootstrap: [AppComponent],
    entryComponents: [DialogConfirmCancelComponent, QuizEditComponent, ExamEditComponent]
})
export class AppModule {
}
