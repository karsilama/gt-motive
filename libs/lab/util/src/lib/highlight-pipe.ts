import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  pure: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchTerm: string): string {
    if (!value || typeof value !== 'string' || !searchTerm) {
      return value;
    }

    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(`(${escaped})`, 'gi');

    return value.replace(regex, '<mark>$1</mark>');
  }
}
