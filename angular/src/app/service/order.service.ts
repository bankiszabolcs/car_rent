import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { Order } from '../model/order';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { ControlService } from './control.service';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private BASE_URL = environment.apiUrl;
  entityName: string = 'orders';

  constructor(
    private http: HttpClient,
    private controlService: ControlService
  ) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.BASE_URL + this.entityName);
  }

  get(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.BASE_URL + this.entityName}/${id}`);
  }

  getByUserId(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.BASE_URL + this.entityName}/user/${id}`
    );
  }

  getMoreOrder(ids: string[]): Observable<Order[]> {
    const orders$: any[] = [];
    ids.forEach((id) => orders$.push(this.get(id)));
    return forkJoin(orders$);
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.BASE_URL + this.entityName}/${order._id}`,
      order
    );
  }

  add(order: Order): Observable<Order> {
    return this.http.post<Order>(this.BASE_URL + this.entityName, order);
  }

  remove(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.BASE_URL + this.entityName}/${id}`);
  }

  duration = (startDate: Date, endDate: Date) => {
    return (
      Math.floor((Number(endDate) - Number(startDate)) / 1000 / 60 / 60 / 24) +
      1
    );
  };

  price = (price: number, duration: number) => {
    return duration * price;
  };

  adjustOrders = (orders: Order[]): Order[] => {
    return orders.map((order) => {
      return {
        ...order,
        username: order.userId?.username,
        carname: !order.carId?.make
          ? 'Autó időközben törölve lett.'
          : this.adjustCarName(order.carId!),
      };
    });
  };

  adjustCarName = (carToFormat: Car) => {
    const make = this.controlService.carOptions.make.find(
      (car) => car.value === carToFormat.make
    )!.key;
    let models = Object.keys(this.controlService.carOptions.model).find(
      (car) => car === carToFormat.make
    ) as keyof typeof this.controlService.carOptions.model;
    const model = this.controlService.carOptions.model[models].find(
      (model) => model.value === carToFormat.model
    )?.key;

    return make + ' ' + model;
  };
}
