import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercasefl'
})
export class UppercaseflPipe implements PipeTransform {

  transform(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
