import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-select-country-dropdown',
    templateUrl: './select-country-dropdown.component.html',
    styleUrls: ['./select-country-dropdown.component.scss']
})

export class SelectCountrDropdownComponent {
    @Output() selectedCities = new EventEmitter<any>();
    @Input() selectedCountry: [] | null = null;
    @Input() upsertUserForm: FormGroup;
    @Input() isInvalid: boolean | null;

    countries: { name: string }[] = [
        { name: 'ECUADOR' },
        { name: 'BRAZIL' },
        { name: 'PERU' },
        { name: 'ARGENTINA' },
        { name: 'COLOMBIA' },
        { name: 'CHILE' }];

    constructor(private formBuilder: FormBuilder, public ativeModal: NgbActiveModal, private rootFormGroup: FormGroupDirective) {
    }

    ngOnInit(): void {
        if (this.upsertUserForm) {
            this.upsertUserForm.addControl('Regions', this.formBuilder.control([], [Validators.required]));
        }
    }
}
