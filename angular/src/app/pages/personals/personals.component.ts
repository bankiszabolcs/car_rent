import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Subscription } from 'rxjs';
import { Car } from 'src/app/model/car';
import { Order } from 'src/app/model/order';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CarService } from 'src/app/service/car.service';
import { ControlService } from 'src/app/service/control.service';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.component.html',
  styleUrls: ['./personals.component.scss'],
})
export class PersonalsComponent implements OnInit, OnDestroy {
  user!: User;

  private userService: UserService = inject(UserService);
  private controlService: ControlService = inject(ControlService);
  private authService: AuthService = inject(AuthService);
  private carService: CarService = inject(CarService);
  private orderService: OrderService = inject(OrderService);

  favouriteCars: Car[] = [];
  orders: Order[] = [];
  userOrders: any[] = [];

  isLoading: boolean = true;

  selectedPage = 0;

  dataSource = new MatTableDataSource<any>();

  userSubscription!: Subscription;

  pageSubscription!: Subscription;

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userService.get(user?.user_id!).subscribe((fullUser) => {
          this.user = fullUser;
          this.favouriteCars = fullUser.favourites!;
          this.renderOrders();
        });
      }
    });

    this.pageSubscription = this.controlService.actualPersonalPage.subscribe(
      (numb) => (this.selectedPage = numb)
    );
  }

  onFavCarChanged() {
    const actualUserId = this.authService.getUser().value?.user_id;
    this.userService.get(actualUserId!).subscribe((user) => {
      this.favouriteCars = user.favourites!;
    });
  }

  renderOrders() {
    this.orderService
      .getByUserId(this.user._id!)
      .pipe(map((orders) => this.orderService.adjustOrders(orders)))
      .subscribe((orders) => {
        this.dataSource.data = orders;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.pageSubscription.unsubscribe();
  }
}
