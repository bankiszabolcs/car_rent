import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { TableConfigService } from 'src/app/service/table-config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private tableService: TableConfigService = inject(TableConfigService);

  isLoading: boolean = true;

  columns = this.tableService.userTableColumns;

  displayedColumns = ['select', ...this.columns.map((i) => i.columnDef)];

  dataSource = new MatTableDataSource<User>();

  ngOnInit() {
    this.userService.getAll().subscribe((users) => {
      this.dataSource.data = users;
      this.isLoading = false;
    });
  }

  selection = new SelectionModel<User>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${
      row.username
    } profilja`;
  }

  removeData() {
    const selectedUsers = this.selection.selected.map((user) => user._id);

    selectedUsers.map((userId) =>
      this.userService.remove(userId!).subscribe(() => {})
    );

    this.userService
      .getAll()
      .subscribe((users) => (this.dataSource.data = users));
  }
}
