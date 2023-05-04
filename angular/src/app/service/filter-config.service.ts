import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterConfigService {
  constructor() {}

  filteredFeatures = [
    { name: 'Gyártmány', value: 'make' },
    { name: 'Üzemanyag', value: 'fuel' },
    { name: 'Váltó', value: 'transmission' },
    { name: 'Kivitel', value: 'bodyStyle' },
    { name: 'Ajtók száma', value: 'numberOfDoors' },
    { name: 'Ülések száma', value: 'numberOfSeats' },
  ];

  options = {
    numberOfDoors: [
      { key: '3', value: '3' },
      { key: '4', value: '4' },
      { key: '5', value: '5' },
    ],
    numberOfSeats: [
      { key: '3', value: '3' },
      { key: '4', value: '4' },
      { key: '5', value: '5' },
    ],
  };
}
