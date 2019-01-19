import { Book } from '../model/book';
import { Tag } from '../model/tag';
import { Reference } from '../model/reference';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const _service = 'http://localhost:8080/BookshopAPI/api/v1.0/';

const _myHeaders = new HttpHeaders()
//                      . set('Authorization', 'Bearer ' + jwt )
                        . set('Content-Type', 'application/json' );


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

    
  handleError(error: any) {
    console.log('Got API error status: ' + error.status);
    // Do something like this.router.navigate(['/error']);
  }




  //
  // Book Services
  //

  readBooks() {
    return this.http.get<Array<string>>(_service + 'book');
  }

  readBook(id: number) {
    return this.http.get<Array<string>>(_service + 'book/' + id);
  }

  createBook(book: Book) {
    return this.http.post<Array<string>>(_service + 'book', JSON.stringify(book), {headers: _myHeaders} );
  }

  updateBook(book: Book) {
    return this.http.put<Array<string>>(_service + 'book', JSON.stringify(book), {headers: _myHeaders} );
  }

  deleteBook(id: number) {
    return this.http.delete<Array<string>>(_service + 'book/' + id, {headers: _myHeaders} );
  }

  //
  // Referemce Services
  //

  readReferences() {
    return this.http.get<Array<string>>(_service + 'reference');
  }

  readReference(id: number) {
    return this.http.get<Array<string>>(_service + 'reference/' + id);
  }

  createReference(reference: Reference) {
    return this.http.post<Array<string>>(_service + 'reference', JSON.stringify(reference), {headers: _myHeaders} );
  }

  updateReference(reference: Reference) {
    return this.http.put<Array<string>>(_service + 'reference', JSON.stringify(reference), {headers: _myHeaders} );
  }

  deleteReference(reference: Reference) {
    return this.http.delete<Array<string>>(_service + 'reference/' + reference.id, {headers: _myHeaders} );
  }

  //
  // Tag Services
  //

  readTags() {
    return this.http.get<Array<string>>(_service + 'tag');
  }

  readTag(key: string) {
    return this.http.get<Array<string>>(_service + 'tag/' + key);
  }

  createTag(tag: Tag) {
    return this.http.post<Array<string>>(_service + 'tag', JSON.stringify(tag), {headers: _myHeaders} );
  }

  updateTag(tag: Tag) {
    return this.http.put<Array<string>>(_service + 'tag', JSON.stringify(tag), {headers: _myHeaders} );
  }

  deleteTag(key: string) {
    return this.http.delete<Array<string>>(_service + 'tag/' + key, {headers: _myHeaders} );
  }
}
