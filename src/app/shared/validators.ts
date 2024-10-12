import { AbstractControl } from '@angular/forms';

export function emailDomainValidator(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    if (email && email.indexOf('@tdsynnex.com') === -1) {
        return { 'invalidDomain': true };
    }
    return null;
};
