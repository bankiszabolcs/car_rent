import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  private orderService: OrderService = inject(OrderService);

  isLoading: boolean = true;

  dataSource = new MatTableDataSource<Order>();

  ngOnInit() {
    this.renderOrders();
  }

  renderOrders() {
    this.orderService
      .getAll()
      .pipe(map((orders) => this.orderService.adjustOrders(orders)))
      .subscribe((orders) => {
        this.dataSource.data = orders;
        this.isLoading = false;
      });
  }
}
