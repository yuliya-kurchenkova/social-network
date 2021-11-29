import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameUser'
})
export class NamePipe implements PipeTransform {
  transform(str: string): any {
    return str.slice(0, 1).toUpperCase() + '.'
  };

}
