import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Car } from '../model/car';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private BASE_URL = environment.apiUrl;
  entityName: string = 'cars';

  onCarDelete = new Subject<void>();

  constructor(private http: HttpClient) {}

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.BASE_URL + this.entityName}/${id}`);
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.BASE_URL + this.entityName);
  }

  getMoreCars(ids: string[]): Observable<Car[]> {
    const cars$: any[] = [];
    ids.forEach((id) => cars$.push(this.getCar(id)));
    return forkJoin(cars$);
  }

  updateCar(updatedCar: Car): Observable<Car> {
    return this.http.put<Car>(
      `${this.BASE_URL + this.entityName}/${updatedCar._id}`,
      updatedCar
    );
  }

  addCar(newCar: Car): Observable<Car[]> {
    return this.http.post<Car[]>(this.BASE_URL + this.entityName, newCar);
  }

  deleteCar(car: Car): Observable<Car> {
    return this.http.delete<Car>(
      `${this.BASE_URL + this.entityName}/${car._id}`
    );
  }

  interpreter = [
    { hu: 'Dízel', en: 'diesel' },
    { hu: 'Benzin', en: 'petrol' },
    { hu: 'Hibrid', en: 'hibrid' },
    { hu: 'Elektromos', en: 'electric' },
    { hu: 'Kézi', en: 'manual' },
    { hu: 'Félautomata', en: 'semi-automatic' },
    { hu: 'Automata', en: 'automatic' },
    { hu: 'Kompakt', en: 'compact' },
    { hu: 'Sedan', en: 'sedan' },
    { hu: 'Coupe', en: 'coupe' },
    { hu: 'Kombi', en: 'estate' },
    { hu: 'SUV', en: 'suv' },
    { hu: 'Furgon', en: 'van' },
    { hu: 'Egyterű', en: 'minivan' },
    { hu: 'Kis', en: 'small' },
    { hu: 'Kabrió', en: 'cabriolet' },
    { hu: 'Roadster', en: 'roadster' },
    { hu: 'Fehér', en: 'white' },
    { hu: 'Vörös', en: 'red' },
    { hu: 'Kék', en: 'blue' },
    { hu: 'Fekete', en: 'black' },
    { hu: 'Szürke', en: 'grey' },
    { hu: 'Fehér', en: 'white' },
    { hu: 'Egyéb', en: 'other' },
  ];
}
