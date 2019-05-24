import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, SALE_STATUS } from '../../model/book';
import { Attribute, ATTR } from '../../model/attribute';
import { Subject } from '../../model/subject';
import { Tag } from '../../model/tag';
import { TagCheckbox } from '../../model/tag';
import { Reference } from '../../model/reference';
import { ReferenceComponent } from '../reference/reference.component';

import { VdlDialogRef, VdlDialog, VdlDialogConfig } from 'vdl-angular';

export enum PAGE_TYPE {
    LIST_BOOKS = 'List',
    NEW_BOOK = 'New',
    EDIT_BOOK = 'Edit',
    EXPORT_BOOKS = 'Export'
}
export enum SEARCH_TYPE {
    YEAR = 'year',
    AUTHOR = 'author'
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

    BASE_URL = 'http://localhost/books/';

    public dialogRef: VdlDialogRef<ReferenceComponent>;

    SEARCH_TYPE: typeof SEARCH_TYPE = SEARCH_TYPE;        // This exposed the enum to the HTML

    PAGE_TYPE: typeof PAGE_TYPE = PAGE_TYPE;        // This exposed the enum to the HTML
    pageType = PAGE_TYPE.LIST_BOOKS;

    SALE_STATUS: typeof SALE_STATUS = SALE_STATUS;    // This exposes the enum to the HTML
    saleStatusNames = Book.getSaleStatusNames();
    selectedSaleStatus = SALE_STATUS.PREP;  

    // CONDITION: typeof CONDITION = CONDITION;    // This exposes the enum to the HTML
    // conditionList: string[] = new Array("New", "As New", "Fine", "Near Fine", "Very Good", "Good", "Fair", "Poor");
    // selectedCondition = "Very Good";  

    attrBinding: Attribute;
    attrCondition: Attribute;
    attrSize: Attribute;

    subjects: Subject[] = [];

    books: any;
    book: any;
    tags: Tag[];
    tagCheckboxMap: Map<number, TagCheckbox>;

    reference: any;

    searchType: string;
    searchValue: string;

    constructor(private _apiService: ApiService, private _cacheService: CacheService,
                private dialog: VdlDialog,
                private route: ActivatedRoute, private router: Router) {
 
        this.getCacheLists();

        this.route.params.subscribe(params => {
            if (params['pageType']) this.pageType = params['pageType'];

            switch (this.pageType) {
                case PAGE_TYPE.NEW_BOOK: 
                    this.tagCheckboxMap = this._cacheService.getTagCheckboxMap(null);
                    this.book = new Book(); 
                    break;
                case PAGE_TYPE.EDIT_BOOK: 
                    this.book = this.getBook( params['bookId'] );
                    break;
                case PAGE_TYPE.LIST_BOOKS: 
                case PAGE_TYPE.EXPORT_BOOKS: 
                    if (params['searchType']){
                        this.searchType = params['searchType'];
                        this.searchValue = params['searchValue'];
                        this.books = this.searchBy(this.searchType, this.searchValue);                
                    } 
                    else this.books = this.getBooks();
                    break;          
           }
        });
    }

    listBooks() { this.router.navigate(['book', PAGE_TYPE.LIST_BOOKS]); }
    newBook() { this.router.navigate(['book', PAGE_TYPE.NEW_BOOK]); }
    editBook(id: number) { this.router.navigate(['book', PAGE_TYPE.EDIT_BOOK, { bookId: id} ] ); }
    exportBooks() { this.router.navigate(['book', PAGE_TYPE.EXPORT_BOOKS]); }

    getCacheLists(){
        this.subjects = this._cacheService.getSubjects();
        this.tags = this._cacheService.getTags();
        this.attrBinding = this._cacheService.getAttribute(ATTR.BINDING);
        this.attrCondition = this._cacheService.getAttribute(ATTR.CONDITION);
        this.attrSize = this._cacheService.getAttribute(ATTR.SIZE);
    }

    searchBooks(searchType: string) { 
        this.router.navigate(['book', PAGE_TYPE.LIST_BOOKS, { searchType: searchType, searchValue: this.searchValue} ] ); 
    }

    searchBy(type: string, value: string){
        this._apiService.searchBooksBy(type, value).subscribe(
            success => {
                this.books = success;
            },
            error => this._apiService.handleError(error)
        );
    }

    getBooks() {
        this._apiService.readBooks().subscribe(
            success => {
                this.books = success;
            },
            error => this._apiService.handleError(error)
        );
    }



    getBook(id: number) {
        this._apiService.readBook(id).subscribe(
            success => {
                this.book = success;
                this.tagCheckboxMap = this._cacheService.getTagCheckboxMap(this.book.tags);
             },
            error => this._apiService.handleError(error)
        );    
    }

    upsertBook() {
        console.log('Upserting book with tagCheckboxMap: ' + this.tagCheckboxMap.size);
        
        this.book.tags = this.getSelectedTags();

        console.log('Upserting book with tags: ' + this.book.tags.length);
        let apiServieRequest;
        if ( this.book.id ) apiServieRequest = this._apiService.updateBook(this.book);
        else                apiServieRequest = this._apiService.createBook(this.book);

 
        apiServieRequest.subscribe(
            success => {
                this.listBooks();
            },
            error => this._apiService.handleError(error)
        );
    }

    deleteBook(id: number) {
        if ( confirm('Are you sure you want to delete the book, instead of inactivating it?')) {
            this._apiService.deleteBook(id).subscribe(
                success => {
                    this.listBooks();
                },
                error => this._apiService.handleError(error)
            );
        }
    }

    public deleteReference(ref: Reference) {
        if (confirm('Are you sure you want to delet the reference: ' + ref.desc)) {
            this._apiService.deleteReference(ref).subscribe(
                success => {
                    this.listBooks();
                }
            );
        }
    }
    public openReferenceDialog(ref?: Reference) {
        console.log('Opening Reference Dialog: ' + ref);
       if ( ref == null ) this.reference = new Reference(this.book.id);
       else this.reference = ref;

       const dialogConfig = new VdlDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;
       dialogConfig.data = {
           reference: this.reference
       };

       this.dialogRef = this.dialog.open(ReferenceComponent, dialogConfig);

        this.dialogRef.afterClosed().subscribe(
            (newReference: Reference) => {
                let service = this._apiService.createReference(newReference);
                if ( newReference.id ) service = this._apiService.updateReference(newReference);
                service.subscribe(
                    success => {
                        this.listBooks();
                    },
                    error =>  this._apiService.handleError(error)
                );
                this.dialogRef = null;
            },
            (err) => {},
            () => {
            console.log('Done adding reference');
            }
        );
    }

    getSelectedTags() {
        const selectedTags: Tag[] = [];
        for ( const t of this._cacheService.getTags() ) {
            if (this.tagCheckboxMap.get(t.id).checked) selectedTags.push(t);
        }
        return selectedTags;
    }

    getSaleStatusKeys() {
        return Array.from(this.saleStatusNames.keys());
    } 

    // getConditionKeys() {
    //     return Object.keys(this.CONDITION);
    // } 

    launchImageUrl(url: string){
        window.open(this.BASE_URL + url, '_blank');
    }

    print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
          <!-- <body onload="window.print();window.close()"> -->
          <body>
             ${printContents}
          </body>
        </html>`
      );
      popupWin.document.close();
  }  

    ngOnInit() {

    }

}
