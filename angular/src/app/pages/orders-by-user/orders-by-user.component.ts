import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { MinimalUser } from 'src/app/model/minimal-user';
import { Order } from 'src/app/model/order';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders-by-user',
  templateUrl: './orders-by-user.component.html',
  styleUrls: ['./orders-by-user.component.scss'],
})
export class OrdersByUserComponent {
  private orderService: OrderService = inject(OrderService);
  private authService: AuthService = inject(AuthService);

  isLoading: boolean = true;

  user!: MinimalUser;

  dataSource = new MatTableDataSource<Order>();

  ngOnInit() {
    this.user = this.authService.getUser().value!;
    this.renderOrders();
  }

  renderOrders() {
    this.orderService
      .getByUserId(this.user.user_id)
      .pipe(map((orders) => this.orderService.adjustOrders(orders)))
      .subscribe((orders) => {
        this.dataSource.data = orders;
        this.isLoading = false;
      });
  }
}
