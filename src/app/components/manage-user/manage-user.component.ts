import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from './user.service';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/shared/models/page';
import { SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertUserComponent } from '../edit-user/upsert-user.component'
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserResponse } from './user-response';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  rows: User[]
  columns: TableColumn[] = [
    { name: "Email", prop: "email" },
    { name: "Id", prop: "id" },
    { name: "Name", prop: "name" },
    { name: "Region", prop: "region" },
    { name: "Status", prop: "status", sortable: false },
    { name: "Type", prop: "type" },
    { name: "User UPN", prop: "userUPN" },
  ];

  page: Page = new Page
  selected = [];
  selectedUser: User | null;
  public isCollapsed = true;
  SelectionType = SelectionType;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.mountPagination({ offset: 0 });
    this.getAllUsers();
  }

  getAllUsers(): void {
    // this.spinner.show();

    // this.userService.getAllUsers(this.page).subscribe({
    //   next: (result: UserResponse) => {
    //     this.rows = result['content'];
    //     console.log(this.rows, 'row')
    //     this.page.total = result.total;
    //   },
    //   error: (error) =>{
    //     this.notification.showErrorMessage("An error occurred while get all users.");
    //     this.spinner.hide();
    //   },
    //   complete: () => {
    //     this.spinner.hide();
    //   }
    // })
  }

  mountPagination(pageInfo: any) {
    this.page.page = pageInfo.offset || 1;
    this.page.per_page = 25;
    this.page.total = 0;
    this.page.messages = { emptyMessage: 'No records found', totalMessage: 'total' }
  }

  sort(data: any): void {
    const { sorts } = data;
    this.page = { ...this.page, order: `${sorts[0].prop} ${sorts[0].dir}` };
    this.getAllUsers();
  }

  setPage(pageInfo: any) {
    this.page.page = pageInfo.offset;
    this.getAllUsers();
  }

  onAddOrSelect(value: string) {
    const modalRef = this.modalService.open(UpsertUserComponent, { ariaLabelledBy: 'modal-basic-title' });

    if (value == 'update') {
      this.selectedUser = this.selected[0];
      modalRef.componentInstance.user = this.selectedUser;
    }

    modalRef.result.then((result) => {
      if (result) {
        this.submitForm(result.value)
      }

      this.selectedUser = null;
      this.selected = [];
    })
  }

  submitForm(user: User) {
    this.spinner.show();

    const messageSweet = user.id ? "User updated with success!" : "User created with success!"
    this.userService.save(user).subscribe({
      next: (_) => {
        this.notification.showSuccessMessageWithTime(messageSweet, 1500);
        this.spinner.hide();
        this.getAllUsers();
      },
      error: (error) => {
        this.notification.showErrorMessage("An error occurred while saving the user");
        this.spinner.hide();
      }
    })
  }
}
