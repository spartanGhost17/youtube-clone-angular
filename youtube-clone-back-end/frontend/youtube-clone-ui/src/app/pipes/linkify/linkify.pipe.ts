import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
  
  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Replace URLs with anchor tags
    return value.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  }
}
