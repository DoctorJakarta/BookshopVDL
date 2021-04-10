import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookStatusFilter',
  pure: false
})
export class BookStatusFilterPipe implements PipeTransform {

  transform(books: Array<any>, status: string): Array<any> {
    if (!books ) return [];
    if (!status || status == '0') return books;           // "0" is used for All
    return books.filter(b => b.status == status);
  }

}
