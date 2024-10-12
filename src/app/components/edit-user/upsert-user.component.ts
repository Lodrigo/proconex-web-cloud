import { Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, fromEvent, merge } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/reactive-form-validations/generic-form-validation';
import { UserStatus } from '../user/enums/user-status';
import { emailDomainValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-upsert-user',
  templateUrl: './upsert-user.component.html',
  styleUrls: ['./upsert-user.component.scss']
})
export class UpsertUserComponent implements OnInit {
  upsertUserForm: FormGroup;
  @Input() user: User;
  header: string;
  unsavedChanges: boolean;
  userStatusArray: { name: string, value: UserStatus }[] = [
    { name: 'ACTIVE', value: UserStatus.ACTIVE },
    { name: 'INACTIVE', value: UserStatus.INACTIVE }
  ];

  // Validations
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private formBuilder: FormBuilder, public ativeModal: NgbActiveModal) {
    this.validationMessages = {
      Name: {
        required: 'Inform the name'
      },
      Email: {
        invalidDomain: 'Email must have the @tdsynnex.com domain.'
      },
      UserUPN: {
        invalidDomain: 'User Upn must have the @tdsynnex.com domain.',
        required: 'Inform the User Upn'
      },
      Regions: {
        required: 'Select a regions',
      },
      Status: {
        required: 'Select a Status'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  ngOnInit(): void {
    this.upsertUserForm = this.formBuilder.group({
      Id: [''],
      Email: [null, [emailDomainValidator]],
      Regions: [[], [Validators.required]],
      Name: ['', Validators.required],
      UserUPN: [[], [Validators.required, emailDomainValidator]],
      Type: [[]],
      Status: ['ACTIVE', [Validators.required]]
    });

    this.upsertUserForm.get('Regions')?.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.upsertUserForm);
    });

    if (this.user) {
      this.setDataUserSelected();
    }
    this.setVariablesByInsertOrUpdate()
  }

  onSubmit() {
    if (this.upsertUserForm.valid) {
      const formData = this.upsertUserForm.value;
    }
  }

  setDataUserSelected(): void {
    this.upsertUserForm.controls['Id'].setValue(this.user.id);
    this.upsertUserForm.controls['Email'].setValue(this.user.email);
    this.upsertUserForm.controls['Regions'].setValue(this.user.regions);
    this.upsertUserForm.controls['Name'].setValue(this.user.name);
    this.upsertUserForm.controls['Type'].setValue(this.user.type);
    this.upsertUserForm.controls['Status'].setValue(this.user.status);
    this.displayMessage = this.genericValidator.processarMensagens(this.upsertUserForm);
    // this.upsertUserForm.patchValue(this.user)
  }

  setCitiesSelected(value: any) {
    this.upsertUserForm.controls['Regions'].setValue(value);
  }

  setVariablesByInsertOrUpdate() {
    if (this.user) {
      this.header = 'Edit Permissions User';
    } else {
      this.header = 'Create User';
    }
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.upsertUserForm);
      this.unsavedChanges = true;
    });
  }
}
