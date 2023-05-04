import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    if (value === 'bmw') {
      return 'BMW';
    } else {
      return value.charAt(0).toUpperCase() + value.slice(1, value.length);
    }
  }
}
