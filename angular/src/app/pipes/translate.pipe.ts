import { Pipe, PipeTransform } from '@angular/core';
import { CarService } from '../service/car.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private carService: CarService) {}
  transform(value: string): string {
    this.carService.interpreter.map((word) => {
      value = word.en === value ? word.hu : value;
    });
    return value;
  }
}
