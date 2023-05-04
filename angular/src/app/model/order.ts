import { Car } from './car';
import { User } from './user';

export class Order {
  [key: string]: any;
  _id?: string = '';
  userId?: User;
  carId?: Car;
  date: string = '';
  startDate: string = '';
  endDate: string = '';
  duration?: number = 1;
  price?: number = 1000;
}
