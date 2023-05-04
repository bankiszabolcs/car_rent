import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/model/car';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CarService } from 'src/app/service/car.service';
import { ControlService } from 'src/app/service/control.service';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit, OnDestroy {
  @Input() cars: Car[] = [];
  @Input() favouriteCars: Car[] = [];

  @Output() favouriteCarsChanged = new EventEmitter();
  user: User = new User();

  private filterConfig: FilterConfigService = inject(FilterConfigService);
  private controlService: ControlService = inject(ControlService);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private carService: CarService = inject(CarService);

  featuresSelection: FormControl = new FormControl('');

  resultSelection: FormControl = new FormControl('');

  features = this.filterConfig.filteredFeatures;

  newCarArr: Car[] = [];

  pagePerSize: number = 10;
  page: number = 1;

  filter: FormControl = new FormControl();

  filterDetailed: boolean = false;

  userSubcription!: Subscription;

  delayedCardLoading: boolean = true;

  results = [];

  options!: { key: string; value: string }[];

  ngOnInit() {
    if (this.authService.getUser().value) {
      this.userSubcription = this.authService.getUser().subscribe((user) => {
        this.userService
          .get(user?.user_id!)
          .subscribe((user) => (this.user = user));
      });
    }

    this.newCarArr = this.cars.slice(0, 10);

    this.filter.valueChanges.subscribe((value) => {
      if (value) {
        this.newCarArr = this.cars;
      } else {
        this.newCarArr = this.cars.slice(0, 10);
      }
    });

    this.featuresSelection.valueChanges.subscribe((value) => {
      if (value === 'make') {
        this.options = this.controlService.carOptions.make;
      }
      if (value === 'fuel') {
        this.options = this.controlService.carOptions.fuel;
      }
      if (value === 'transmission') {
        this.options = this.controlService.carOptions.transmission;
      }
      if (value === 'bodyStyle') {
        this.options = this.controlService.carOptions.bodyStyle;
      }
      if (value === 'color') {
        this.options = this.controlService.carOptions.color;
      }
      if (value === 'numberOfDoors') {
        this.options = this.filterConfig.options.numberOfDoors;
      }
      if (value === 'numberOfSeats') {
        this.options = this.filterConfig.options.numberOfSeats;
      }
    });

    this.resultSelection.valueChanges.subscribe((value) => {
      if (value.length > 0) {
        const featureToFilter = this.featuresSelection.value;
        this.newCarArr = this.filterCars(value, this.cars, featureToFilter);
      } else {
        this.newCarArr = this.cars.slice(0, 10);
      }
    });
  }

  filterCars(properties: string[], cars: Car[], feature: string): Car[] {
    let filteredCarArr: Car[] = [];

    if (
      feature === 'make' ||
      feature === 'fuel' ||
      feature === 'transmission' ||
      feature === 'bodyStyle' ||
      feature === 'color' ||
      feature === 'numberOfDoors' ||
      feature === 'numberOfSeats'
    ) {
      properties.forEach((property) => {
        if (feature === 'bodyStyle') {
          filteredCarArr = [
            ...filteredCarArr,
            ...cars.filter((car) => car.features[feature] === property),
          ];
        }
        filteredCarArr = [
          ...filteredCarArr,
          ...cars.filter((car) => car[feature] === property),
        ];
      });
      return filteredCarArr;
    }
    return cars;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.resultSelection.value.length === 0 &&
      this.delayedCardLoading
    ) {
      if (this.page < this.cars.length / this.pagePerSize)
        this.newCarArr = [
          ...this.newCarArr,
          ...this.cars.slice(
            this.page * this.pagePerSize,
            this.page * this.pagePerSize + this.pagePerSize
          ),
        ];
      this.page++;
    }
  }

  onDelete(car: Car) {
    this.carService.deleteCar(car).subscribe();
  }

  onSliderOnChange(data: any, feature: string) {
    this.delayedCardLoading = false;
    const { endValueIndicatorText: end, startValueIndicatorText: start } = data;
    const filteredFeature = this.resultSelection.value;
    const featureToFilter = this.featuresSelection.value;

    if (!filteredFeature) {
      this.newCarArr = this.filterMinMax(
        Number(start),
        Number(end),
        this.cars,
        feature
      );
    } else {
      const filteredCarArr = this.filterCars(
        filteredFeature,
        this.cars,
        featureToFilter
      );
      this.newCarArr = this.filterMinMax(
        Number(start),
        Number(end),
        filteredCarArr,
        feature
      );
    }
  }

  filterMinMax(min: number, max: number, cars: Car[], feature: string): Car[] {
    if (feature === 'price') {
      return cars.filter((car) => car[feature] >= min && car[feature] <= max);
    } else if (feature === 'powerHp' || feature === 'fuelConsumption') {
      return cars.filter(
        (car) => car.features[feature] >= min && car.features[feature] <= max
      );
    } else {
      return cars;
    }
  }

  ngOnDestroy(): void {
    if (this.userSubcription) this.userSubcription.unsubscribe;
  }
}
