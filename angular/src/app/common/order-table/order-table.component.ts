import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { concat, Subscription } from 'rxjs';
import { Order } from 'src/app/model/order';
import { User } from 'src/app/model/user';
import { OrderService } from 'src/app/service/order.service';
import { TableConfigService } from 'src/app/service/table-config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() dataSource = new MatTableDataSource<Order>();
  @Output() orderRemoved = new EventEmitter();

  user!: User;

  private tableConfigService: TableConfigService = inject(TableConfigService);
  private userService: UserService = inject(UserService);
  private orderService: OrderService = inject(OrderService);

  userSubscription!: Subscription;

  selection = new SelectionModel<Order>(true, []);
  orderTableColumns = this.tableConfigService.orderTableColumns;
  displayedColumns = [
    'select',
    ...this.orderTableColumns.map((i) => i.columnDef),
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.userSubscription = this.userService.actualUser.subscribe(
      (user) => (this.user = user)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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

  checkboxLabel(row?: Order): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${new Date(row.date).toLocaleDateString()}-i rendelés`;
  }

  removeData() {
    const selectedOrders = this.selection.selected.map((order) => order._id);

    const observables: any = [];
    selectedOrders.forEach((order) => {
      observables.push(this.orderService.remove(order!));
    });

    concat(...observables).subscribe(undefined, undefined, () =>
      this.orderRemoved.emit()
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
