import { Component, inject, Input } from '@angular/core';
import { Car } from 'src/app/model/car';
import { User } from 'src/app/model/user';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html',
  styleUrls: ['./admin-buttons.component.scss'],
})
export class AdminButtonsComponent {
  @Input() user!: User;
  @Input() car!: Car;

  private carService: CarService = inject(CarService);

  onDelete(car: Car) {
    if (confirm('Biztosan törlöd ezt az autót?'))
      this.carService
        .deleteCar(car)
        .subscribe(() => this.carService.onCarDelete.next());
  }
}
