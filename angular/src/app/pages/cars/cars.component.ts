import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Car } from 'src/app/model/car';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CarService } from 'src/app/service/car.service';
import { TableConfigService } from 'src/app/service/table-config.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CarsComponent implements OnInit, AfterViewInit, OnDestroy {
  private carService: CarService = inject(CarService);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private actRouter: ActivatedRoute = inject(ActivatedRoute);
  private tableConfigService: TableConfigService = inject(TableConfigService);

  isLoading: boolean = true;

  cars: Car[] = [];

  user: User = new User();

  favouriteCars: Car[] = [];

  viewMode: 'table' | 'card' = 'table';

  carTableColumns = this.tableConfigService.carTableColumns;
  displayedColumns = this.carTableColumns.map((i) => i.columnDef);

  userSubscription!: Subscription;

  dataSource = new MatTableDataSource<Car>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Car | null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.carService.getAllCars().subscribe((cars) => this.renderCars(cars));

    this.userSubscription = this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userService.get(user?.user_id!).subscribe((user) => {
          this.favouriteCars = user.favourites!;
          this.user = user;
        });
      }
    });

    this.carService.onCarDelete.subscribe(() =>
      this.carService.getAllCars().subscribe((cars) => this.renderCars(cars))
    );
  }

  renderCars(cars: Car[]) {
    this.dataSource.data = cars;
    this.cars = cars;

    this.isLoading = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
