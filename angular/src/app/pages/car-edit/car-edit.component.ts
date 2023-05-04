import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';
import { ControlService } from 'src/app/service/control.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss'],
})
export class CarEditComponent implements OnInit, OnDestroy {
  private actRoute: ActivatedRoute = inject(ActivatedRoute);
  private carService: CarService = inject(CarService);
  private controlService: ControlService = inject(ControlService);

  constructor(private fb: FormBuilder, private router: Router) {}

  newCarMode: boolean = false;

  dataArrived: boolean = false;

  formChangesSubs!: Subscription | undefined;

  car$: Observable<Car> = this.actRoute.params.pipe(
    switchMap((params) => {
      const id = params['id'];
      if (id === 'new') {
        this.newCarMode = true;
        return of(new Car());
      } else {
        return this.carService.getCar(id);
      }
    })
  );

  carFormGroup = this.fb.group(this.controlService.car);

  carOptions = this.controlService.carOptions;

  actualModel: any;

  ngOnInit(): void {
    this.car$.subscribe((car) => {
      this.fillControls(car);
      this.dataArrived = true;
    });

    this.formChangesSubs = this.carFormGroup
      .get(['make'])
      ?.valueChanges.subscribe((make) => {
        this.actualModel =
          this.carOptions.model[make as keyof typeof this.carOptions.model];
      });
  }

  fillControls(car: Car) {
    Object.keys(this.controlService.car).forEach((key) => {
      this.carFormGroup.get([key])?.setValue(car[key]);
    });
  }

  onSave() {
    const actualCar: Car = Object.assign(this.carFormGroup.getRawValue());
    if (!this.newCarMode) {
      this.carService.updateCar(actualCar).subscribe(() => {
        this.controlService.openSnackBar('Sikeresen módosítottad az autót!', 1);
        setTimeout(() => {
          this.router.navigate(['cars']);
        }, 1000);
      });
    } else if (this.newCarMode) {
      delete actualCar._id;

      this.carService.addCar(actualCar).subscribe(() => {
        this.controlService.openSnackBar('Sikeresen létrehoztad az autót!', 1);
        setTimeout(() => {
          this.router.navigate(['cars']);
        }, 1000);
      });
    }
  }

  ngOnDestroy(): void {
    this.formChangesSubs?.unsubscribe();
  }
}
