import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T extends { [key: string]: any }>
  implements PipeTransform
{
  transform(value: T[], phrase: string): T[] {
    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = phrase.toLowerCase();

    return value.filter((item) => {
      return (
        ('' + item['make']).toLowerCase().includes(phrase) ||
        ('' + item['model']).toLowerCase().includes(phrase)
      );
    });
  }
}
