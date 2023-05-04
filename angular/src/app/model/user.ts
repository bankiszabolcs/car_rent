import { Car } from './car';
import { Order } from './order';

export class User {
  [key: string]: any;
  _id?: string = '';
  email: string = 'bankiszabolcs@yahoo.com';
  username: string = 'bankiszabolcs';
  password: string = 'asd123456789';
  firstName: string = '';
  lastName: string = '';
  birthDate: string = '';
  phone: string = '06-20-131-4353';
  personalId: string = '';
  drivingLicense: string = '';
  address: {
    city: string;
    street: string;
    houseNumber: number;
    floor?: number;
    flatNumber?: number;
    zip: number;
  } = {
    city: '',
    street: '',
    houseNumber: 1,
    floor: 1,
    flatNumber: 1,
    zip: 1,
  };
  role?: 'admin' | 'user' = 'user';
  orders?: Order[] = [];
  favourites?: Car[] = [];
}
