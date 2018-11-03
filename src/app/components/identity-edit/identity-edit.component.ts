import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { NotifyService } from '../../services/notify.service';
import { IdentityService } from '../../services/identity.service';
import { IdentityRequest } from '../../models/identity-request';
import { PasswordValidation } from '../../tools/password-validation';

@Component({
    selector: 'app-identity-edit',
    templateUrl: './identity-edit.component.html',
    styleUrls: ['./identity-edit.component.css'],
    providers: [IdentityService, NotifyService]
})
export class IdentityEditComponent implements OnInit, OnDestroy
{

    emptyIdentity: IdentityRequest = { id: 0, name: '', email: '', password: '' };
    identity: IdentityRequest = this.emptyIdentity;

    hidePassword = true;
    willResetPassword = true;
    subscription;
    formTitle = '';
    signinForm: FormGroup;

    constructor(
        private titleService: Title,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private dataService: IdentityService,
        private notify: NotifyService,
    ) { }

    ngOnInit()
    {
        this.createForm();
        this.getIdentity();
    }

    createForm()
    {
        this.signinForm = this.fb.group(
            {
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            }, {
                validator: PasswordValidation.MatchPassword
            }
        );
    }

    mapFormValue()
    {
        this.identity.name = this.signinForm.value['name'];
        this.identity.email = this.signinForm.value['email'];
        this.identity.password = this.signinForm.value['password'];
    }

    save()
    {
        this.mapFormValue();

        let save: any;
        const isNew = (this.identity.id <= 0);

        if (isNew) {
            save = this.dataService.create(this.identity);
        } else {
            if (this.willResetPassword) {
                save = this.dataService.update(this.identity.id, this.identity);
            } else {
                save = this.dataService.patch(this.identity.id, this.identity);
            }
        }

        save.pipe(take(1)).subscribe(resp =>
        {
            if (resp.hasError) {
                console.log('save resp', resp);
                this.notify.error('Server\'s message : ' + resp.errorMessage);
                return;
            }

            if (isNew) {
                this.router.navigateByUrl('/identities/' + resp.model.id);
            } else {
                this.identity = resp.model as IdentityRequest;
                this.signinForm.patchValue(this.identity);
            }

            this.notify.success('Identity is saved!', 2000);
        });
    }

    isValidForm()
    {
        let valid = this.signinForm.value['name'].length > 0
            && this.signinForm.value['email'].length > 0;

        if (this.willResetPassword) {
            valid = valid && this.signinForm.value['password'].length > 0
                && this.signinForm.value['password'] === this.signinForm.value['confirmPassword'];
        }

        return valid;
    }

    getIdentity()
    {
        const id = this.route.paramMap.pipe(map(params => params.get('id')));

        const pipe = id.pipe(
            switchMap(resp =>
            {
                if (resp === 'new') {
                    return of({ hasError: false, model: this.emptyIdentity });
                }
                return this.dataService.get(resp);
            })
        );

        this.subscription = pipe.subscribe(resp =>
        {
            if (resp['hasError']) {
                console.log('get resp', resp);
                this.notify.error('Server\'s message : ' + resp['errorMessage']);
                return;
            }

            if (!resp['model']) {
                console.log('get resp', resp);
                this.notify.error('Can\'t find the expected identity. Please try the other one.');
                return;
            }

            this.identity = resp['model'] as IdentityRequest;
            this.signinForm.patchValue(this.identity);

            if (this.identity.id) {
                this.formTitle = 'Edit identity: ' + this.identity.name;
                this.willResetPassword = false;
            } else {
                this.formTitle = 'New identity';
                this.willResetPassword = true;
            }
            this.titleService.setTitle(this.formTitle);
        });
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }
}
