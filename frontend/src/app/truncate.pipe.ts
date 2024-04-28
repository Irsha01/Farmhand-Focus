// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, words: number): string {
    if (!value) return ''; // Return empty string if value is falsy
    const wordArray = value.split(' ');
    if (wordArray.length <= words) return value; // Return original string if it has fewer words than the specified limit
    return wordArray.slice(0, words).join(' ') + '...'; // Join the first 'words' and add ellipsis
  }
}
