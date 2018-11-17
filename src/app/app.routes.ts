import {Routes} from '@angular/router';

import {AuthGuard} from './auth/auth.guard';
import {LayoutComponent} from './pages/layout/layout.component';
import {SignInComponent} from './pages/signin/signin.component';
import {ReadmeComponent} from './components/readme/readme.component';

import {IdentityEditComponent} from 'app/components/identity/identity-edit/identity-edit.component';
import {IdentityListComponent} from 'app/components/identity/identity-list/identity-list.component';

import {QuizListComponent} from 'app/components/quiz/quiz-list/quiz-list.component';
import {QuestionListComponent} from './components/question/question-list/question-list.component';
import {QuestionEditComponent} from './components/question/question-edit/question-edit.component';

export const RouteDef = [
    {path: 'readme', component: ReadmeComponent},

    {path: 'identities/:uid', component: IdentityEditComponent},
    {path: 'identities', component: IdentityListComponent},

    {path: 'quizzes', component: QuizListComponent},
    {path: 'quizzes/:quizId/questions', component: QuestionListComponent},
    {path: 'quizzes/:quizId/questions/:questionId', component: QuestionEditComponent},

    {path: '', component: ReadmeComponent},
    {path: '**', component: ReadmeComponent}
];

export const AuthRoute: Routes = [
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: RouteDef
    }
];
