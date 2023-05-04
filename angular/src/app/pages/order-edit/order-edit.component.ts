import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ControlService } from 'src/app/service/control.service';
import { OrderService } from 'src/app/service/order.service';
import { FormGroup } from '@angular/forms';
import { Car } from 'src/app/model/car';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent implements OnInit {
  private actRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private orderService: OrderService = inject(OrderService);
  private controlService: ControlService = inject(ControlService);
  private authService: AuthService = inject(AuthService);

  carOrdered!: Car;

  duration: number = 0;
  price: number = 0;
  previousPage: string | undefined = undefined;

  constructor() {
    this.previousPage = this.router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();
  }

  order$: Observable<Order> = this.actRoute.params.pipe(
    switchMap((params) => this.orderService.get(params['id']))
  );

  orderFormGroup: FormGroup = new FormGroup(this.controlService.order);

  fillControls(order: Order) {
    Object.keys(this.controlService.order).forEach((key) => {
      if (key === 'date') {
        this.orderFormGroup
          .get([key])
          ?.setValue(new Date(order[key]).toLocaleDateString());
      } else if (key === 'carId') {
        this.orderFormGroup
          .get([key])
          ?.setValue(this.orderService.adjustCarName(this.carOrdered));
      } else {
        this.orderFormGroup.get([key])?.setValue(order[key]);
      }
    });
  }

  ngOnInit(): void {
    this.order$.subscribe((order) => {
      this.carOrdered = order.carId!;
      this.fillControls(order);

      this.orderFormGroup.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.duration = this.orderService.duration(
            this.orderFormGroup.value.startDate,
            this.orderFormGroup.value.endDate
          );

          this.price = this.orderService.price(
            this.carOrdered.price,
            this.duration
          );
          this.orderFormGroup.patchValue(
            {
              duration: this.duration,
              price: this.price,
            },
            { emitEvent: false }
          );
        });
    });
  }

  onBack(): void {
    const actualUser = this.authService.getUser().value;

    if (this.previousPage === '/orders') {
      this.router.navigate(['/orders']);
    } else if (this.previousPage === '/personals') {
      this.controlService.actualPersonalPage.next(2);
      this.router.navigate(['/personals']);
    } else if (this.previousPage?.startsWith('/orders/user')) {
      this.router.navigate([`/orders/user/${actualUser?.user_id}`]);
    }
  }

  onSave() {
    const newOrder = this.orderFormGroup.value;
    newOrder.carId = this.carOrdered._id;
    delete newOrder.duration;
    delete newOrder.price;

    this.orderService.update(newOrder).subscribe((order) => {
      this.controlService.openSnackBar(
        'Sikeresen módosítottad a rendelést!',
        1
      );
      setTimeout(() => {
        this.onBack();
      }, 1000);
    });
  }
}
