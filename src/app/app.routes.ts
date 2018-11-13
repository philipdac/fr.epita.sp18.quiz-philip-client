import {Routes} from '@angular/router';

import {AuthGuard} from './auth/auth.guard';
import {LayoutComponent} from './pages/layout/layout.component';
import {SignInComponent} from './pages/signin/signin.component';
import {ReadmeComponent} from './components/readme/readme.component';

import {IdentityEditComponent} from './components/identity-edit/identity-edit.component';
import {IdentityListComponent} from './components/identity-list/identity-list.component';

import {QuizListComponent} from './components/quiz/quiz-list/quiz-list.component';

export const RouteDef = [
    {path: 'readme', component: ReadmeComponent},

    {path: 'identities/:uid', component: IdentityEditComponent},
    {path: 'identities', component: IdentityListComponent},

    {path: 'quizzes', component: QuizListComponent},

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
