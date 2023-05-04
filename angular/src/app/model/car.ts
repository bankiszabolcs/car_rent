export class Car {
  [key: string]: any;
  _id?: string = '';
  make: string = '';
  model: string = '';
  price!: number;
  fuel: string = '';
  year!: number;
  transmission: string = '';
  features: {
    color: string;
    bodyStyle: string;
    numberOfDoors: number;
    numberOfSeats: number;
    powerHp: number;
    cubicCapacity: number;
    fuelConsumption: number;
    airCondition: boolean;
  } = {
    color: '',
    bodyStyle: '',
    numberOfDoors: 0,
    numberOfSeats: 0,
    powerHp: 0,
    cubicCapacity: 0,
    fuelConsumption: 0,
    airCondition: false,
  };
  discount: boolean = false;
  available: boolean = false;
}
