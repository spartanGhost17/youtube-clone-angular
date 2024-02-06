import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToSpace'
})
export class NewlineToSpacePipe implements PipeTransform {

  transform(value: string): string {
    // Replace newline characters with HTML line break tags
    return value.replace(/\n/g, '');
  }

}
