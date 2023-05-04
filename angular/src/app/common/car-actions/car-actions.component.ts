import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/model/car';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ControlService } from 'src/app/service/control.service';

@Component({
  selector: 'app-car-actions',
  templateUrl: './car-actions.component.html',
  styleUrls: ['./car-actions.component.scss'],
})
export class CarActionsComponent {
  @Input() favouriteCars: Car[] = [];
  @Input() user!: User;
  @Input() car!: Car;
  @Input() longView: boolean = false;
  @Output() favouriteCarChanged = new EventEmitter();

  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private controlService: ControlService = inject(ControlService);
  private dialog: MatDialog = inject(MatDialog);

  isFavourite(carId: string): boolean {
    return this.favouriteCars.some((car) => car._id === carId);
  }

  toggleFavourite(clickedCar: Car) {
    if (this.favouriteCars.some((car) => car._id === clickedCar._id)) {
      this.userService
        .removeFavourites(this.user, clickedCar._id!)
        .subscribe((user) => {
          this.authService.me().subscribe();
          this.favouriteCarChanged.emit();
          this.controlService.openSnackBar(
            `Autó eltávolítva a kedvenceidből`,
            1
          );
        });
    } else {
      this.userService
        .addFavourites(this.user, clickedCar)
        .subscribe((user) => {
          this.favouriteCars = user.favourites!;
          this.user = user;
          this.authService.me().subscribe();
          this.controlService.openSnackBar(`Autó hozzáadva a kedvenceidhez`, 1);
        });
    }
  }

  openDialog(car: Car) {
    this.dialog.open(OrderDialogComponent, {
      width: '500px',
      data: {
        user: this.user,
        car: car,
      },
    });
  }
}
