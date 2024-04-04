import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'newlineToBr',
    standalone: true
})
export class NewlineToBrPipe implements PipeTransform {

  transform(value: string): string {
    // Replace newline characters with HTML line break tags
    return value? value.replace(/\n/g, '<br>') : value;
  }
}
