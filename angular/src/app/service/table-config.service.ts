import { Injectable } from '@angular/core';
import { Car } from '../model/car';
import { Order } from '../model/order';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class TableConfigService {
  constructor() {}

  carTableColumns = [
    {
      columnDef: 'make',
      header: 'Márka',
      cell: (element: Car) => `${element.make}`,
    },
    {
      columnDef: 'model',
      header: 'Modell',
      cell: (element: Car) => `${element.model}`,
    },
    {
      columnDef: 'price',
      header: 'Ár',
      cell: (element: Car) => `${element.price}`,
    },
    {
      columnDef: 'fuel',
      header: 'Üzemanyag',
      cell: (element: Car) => `${element.fuel}`,
    },
    {
      columnDef: 'year',
      header: 'Évjárat',
      cell: (element: Car) => `${element.year}`,
    },
    {
      columnDef: 'transmission',
      header: 'Váltó',
      cell: (element: Car) => `${element.transmission}`,
    },
  ];

  userTableColumns = [
    {
      columnDef: 'username',
      header: 'Felhasználónév',
      cell: (element: User) => `${element.username}`,
    },
    {
      columnDef: 'firstName',
      header: 'Keresztnév',
      cell: (element: User) => `${element.firstName}`,
    },
    {
      columnDef: 'lastName',
      header: 'Vezetéknév',
      cell: (element: User) => `${element.lastName}`,
    },
    {
      columnDef: 'birthDate',
      header: 'Születési év',
      cell: (element: User) => `${element.birthDate}`,
    },
    {
      columnDef: 'phone',
      header: 'Telefon',
      cell: (element: User) => `${element.phone}`,
    },
  ];

  orderTableColumns = [
    {
      columnDef: 'username',
      header: 'Felhasználónév',
      cell: (element: Order | any) => `${element.username}`,
    },
    {
      columnDef: 'carId',
      header: 'Autó',
      cell: (element: Order | any) => `${element.carname}`,
    },
    {
      columnDef: 'date',
      header: 'Dátum',
      cell: (element: Order) => `${element.date}`,
    },
    {
      columnDef: 'startDate',
      header: 'Kezdet',
      cell: (element: Order) => `${element.startDate}`,
    },
    {
      columnDef: 'endDate',
      header: 'Vég',
      cell: (element: Order) => `${element.endDate}`,
    },
    {
      columnDef: 'duration',
      header: 'Időtartam',
      cell: (element: Order) => `${element.duration}`,
    },
    {
      columnDef: 'price',
      header: 'Ár',
      cell: (element: Order) => `${element.price}`,
    },
  ];
}
