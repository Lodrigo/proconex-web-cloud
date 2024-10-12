import { FormGroup } from '@angular/forms';

export class GenericValidator {
    constructor(private validationMessages: ValidationMessages) { }

    processarMensagens(container: FormGroup): { [key: string]: string } {
        let messages: { [key: string]: string } = {};
        for (let controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                let formControl = container.controls[controlKey];

                if (formControl instanceof FormGroup) {
                    let childMessages = this.processarMensagens(formControl);
                    Object.assign(messages, childMessages);
                } else {
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((formControl.dirty || formControl.touched) && formControl.errors) {
                            Object.keys(formControl.errors).map(messageKey => {
                                if (this.validationMessages[controlKey][messageKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey] + '<br />';
                                }
                            });
                        }
                    }
                }
            }
        }
        return messages;
    }
}

export interface DisplayMessage {
    [key: string]: string;
}
export interface ValidationMessages {
    [key: string]: { [key: string]: string }
}