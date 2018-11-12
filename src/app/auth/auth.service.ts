import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { LoginRequest } from '../models/login-request';
import { Constant } from '../common/constant';

@Injectable()
export class AuthService
{
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    private loginUrl = '/api/login';
    private signInRoute = '/signin';

    private static parseJwt(token)
    {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    public getToken()
    {
        const token = localStorage.getItem(Constant.tokenKey);
        if (token && moment().isBefore(this.getExpiration())) {
            return token;
        }
        return '';
    }

    private getExpiration()
    {
        let expiration = localStorage.getItem(Constant.expiredKey);
        if (!expiration) {
            expiration = '2018-01-01';
        }
        return moment(expiration);
    }

    public signedIn()
    {
        return (this.getToken() !== '');
    }

    public signIn(email: string, password: string)
    {
        const signInData: LoginRequest = { email: email, password: password };

        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response' as 'body'
        };

        return this.http.post(this.loginUrl, signInData, options).pipe(
            map((resp: HttpResponse<any>) =>
            {
                if (resp.status === 200) {
                    this.setSession(resp.headers.get('authorization'));
                }
                return resp;
            }));
    }

    private setSession(bearer)
    {
        if (bearer) {
            const decode = AuthService.parseJwt(bearer.substring(8));
            localStorage.setItem(Constant.userId, decode['sub']);
            localStorage.setItem(Constant.expiredKey, (new Date((+decode['exp']) * 1000)).toISOString());
            localStorage.setItem(Constant.tokenKey, bearer);
        }
    }

    public signOut()
    {
        this.clearSession();
        this.router.navigateByUrl(this.signInRoute).then();
    }

    public clearSession()
    {
        localStorage.removeItem(Constant.tokenKey);
        localStorage.removeItem(Constant.userId);
        localStorage.removeItem(Constant.userName);
        localStorage.removeItem(Constant.expiredKey);
    }
}
