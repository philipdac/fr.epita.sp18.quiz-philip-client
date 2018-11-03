import { AbstractControl } from '@angular/forms';

export class PasswordValidation
{
    static MatchPassword(ctrl: AbstractControl)
    {
        const password = ctrl.get('password').value;
        const confirmPassword = ctrl.get('confirmPassword').value;
        if (confirmPassword && password !== confirmPassword) {
            ctrl.get('confirmPassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}
