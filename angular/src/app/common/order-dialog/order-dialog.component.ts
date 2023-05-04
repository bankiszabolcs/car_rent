import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ControlService } from 'src/app/service/control.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  dataToOrder: any = inject(MAT_DIALOG_DATA);
  private orderService: OrderService = inject(OrderService);
  private controlService: ControlService = inject(ControlService);
  private router: Router = inject(Router);

  maxDate!: Date;
  duration: number = 0;
  price: number = this.dataToOrder.car.price;

  ngOnInit() {
    this.maxDate = new Date();
    this.orderForm.valueChanges.subscribe(() => {
      this.duration = this.orderService.duration(
        new Date(this.orderForm.value.startDate),
        new Date(this.orderForm.value.endDate)
      );
      this.price = this.duration * this.dataToOrder.car.price;
    });
  }

  orderForm: FormGroup = new FormGroup({
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
  });

  onBook() {
    const newOrder: Order = {
      userId: this.dataToOrder.user._id,
      carId: this.dataToOrder.car._id,
      date: new Date().toISOString(),
      startDate: this.orderForm.value.startDate,
      endDate: this.orderForm.value.endDate,
    };

    this.orderService.add(newOrder).subscribe({
      next: () => {
        this.controlService.openSnackBar('Sikeres rendelés', 1);
        setTimeout(() => {
          this.controlService.actualPersonalPage.next(2);
          this.router.navigate(['personals']);
        }, 1000);
      },
    });
  }
}
