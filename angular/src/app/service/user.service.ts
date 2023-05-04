import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Order } from '../model/order';
import { User } from '../model/user';
import { OrderService } from './order.service';
import { environment } from 'src/environments/environment';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = environment.apiUrl;
  entityName: string = 'users';

  actualUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL + this.entityName);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL + this.entityName}/${id}`);
  }

  isEmailUsed(email: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.BASE_URL + this.entityName}/emailUsed`,
      { email }
    );
  }

  isUsernameUsed(username: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.BASE_URL + this.entityName}/usernameUsed`,
      { username }
    );
  }

  isPasswordCorrect(password: string, id: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.BASE_URL + this.entityName}/checkPassword`,
      { password, id }
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.BASE_URL + this.entityName}/${user._id}`,
      user
    );
  }

  add(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.BASE_URL + this.entityName, user);
  }

  remove(id: string): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL + this.entityName}/${id}`);
  }

  addFavourites(user: User, car: Car): Observable<User> {
    const newFavourites = [...user.favourites!, car];
    return this.update({ ...user, favourites: newFavourites });
  }

  removeFavourites(user: User, carId: string): Observable<User> {
    const newUser = {
      ...user,
      favourites: user.favourites!.filter((car) => car._id !== carId),
    };
    return this.update(newUser);
  }

  bookCar(user: User, order: Order): Observable<User> {
    user.orders!.push(order);
    const newUser = { ...user };
    return this.update(newUser);
  }

  removeBooking(user: User, orderId: string): Observable<User> {
    const newUser = {
      ...user,
      orders: user.orders!.filter((order) => order._id !== orderId),
    };
    return this.update(newUser);
  }
}
