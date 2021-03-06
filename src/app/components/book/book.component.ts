import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BOOK_STATUS } from '../../model/book';
import { Attribute, ATTR } from '../../model/attribute';
import { Subject } from '../../model/subject';
import { Tag } from '../../model/tag';
import { TagCheckbox } from '../../model/tag';
import { Reference } from '../../model/reference';
import { ReferenceComponent } from '../reference/reference.component';

// import { VdlDialogRef, VdlDialog, VdlDialogConfig } from 'vdl-angular';
import { VdlDialog } from '@vdlx/vdl-angular/dialog';
import { VdlDialogConfig } from '@vdlx/vdl-angular/dialog';
import { VdlDialogRef } from '@vdlx/vdl-angular/dialog';

export enum PAGE_TYPE {
    LIST_BOOKS = 'List',
    NEW_BOOK = 'New',
    EDIT_BOOK = 'Edit',
    EXPORT_BOOKS = 'Export'
}
export enum SEARCH_TYPE {
    YEAR    = 'year',
    AUTHOR  = 'author',
    TAG     = 'tag'
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

    BOOK_STATUS: typeof BOOK_STATUS = BOOK_STATUS;    // This exposes the enum to the HTML
    bookStatusNames = Book.getStatusNames();
    // selectedStatus = BOOK_STATUS.PREP;
    selectedBookStatus = '0';

    // CONDITION: typeof CONDITION = CONDITION;    // This exposes the enum to the HTML
    // conditionList: string[] = new Array("New", "As New", "Fine", "Near Fine", "Very Good", "Good", "Fair", "Poor");
    // selectedCondition = "Very Good";

    attrBinding: Attribute;
    attrCondition: Attribute;
    attrSize: Attribute;
    attrRarity: Attribute;
    attrReprints: Attribute;

    subjects: Subject[] = [];

    books: any;
    book: any;
    tags: Tag[];
    tagCheckboxMap: Map<number, TagCheckbox>;

    reference: any;

    searchType: string;
    searchValue: string;
    searchTag: string;

    constructor(private apiService: ApiService, private cacheService: CacheService,
                private dialog: VdlDialog,
                private route: ActivatedRoute, private router: Router) {

        this.getCacheLists();

        this.route.params.subscribe(params => {
            if (params['pageType']) this.pageType = params['pageType'];
            if ( params['bookStatus']) this.selectedBookStatus = params['bookStatus'];

            switch (this.pageType) {
                case PAGE_TYPE.NEW_BOOK:
                    this.tagCheckboxMap = this.cacheService.getTagCheckboxMap(null);
                    this.book = new Book();
                    break;
                case PAGE_TYPE.EDIT_BOOK:
                    this.book = this.getBook( params['bookId'] );
                    break;
                case PAGE_TYPE.LIST_BOOKS:
                case PAGE_TYPE.EXPORT_BOOKS:
                    if (params['searchType']) {
                        this.searchType = params['searchType'];
                        this.searchValue = params['searchValue'];
                        this.books = this.searchBy(this.searchType, this.searchValue);
                    }
                    else if (params['searchTag']) {
                        this.searchTag = params['searchTag'];
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

    getCacheLists() {
        this.subjects = this.cacheService.getSubjects();
        this.tags = this.cacheService.getTags();
        this.attrBinding = this.cacheService.getAttribute(ATTR.BINDING);
        this.attrCondition = this.cacheService.getAttribute(ATTR.CONDITION);
        this.attrSize = this.cacheService.getAttribute(ATTR.SIZE);
        this.attrRarity = this.cacheService.getAttribute(ATTR.RARITY);
        this.attrReprints = this.cacheService.getAttribute(ATTR.REPRINTS);
    }

    searchBooks(searchType: string) {
        alert("Searching for: " + this.searchValue);
        this.router.navigate(['book', PAGE_TYPE.LIST_BOOKS, { searchType: searchType, searchValue: this.searchValue} ] );
    }
    returnToSearch() {
        console.log('Returning to search with type: ' + this.searchType  );
        console.log('Returning to search with value: ' + this.searchValue  );
        if ( this.searchType ) {
            this.searchBooks(this.searchType);
        } else {
            this.listBooks();
        }
    }
    searchBy(type: string, value: string) {
        this.apiService.searchBooksBy(type, value).subscribe(
            success => {
                this.books = success;
            },
            error => this.apiService.handleError(error)
        );
    }

    getBooks() {
        this.apiService.readBooks().subscribe(
            success => {
                this.books = success;
            },
            error => this.apiService.handleError(error)
        );
    }



    getBook(id: number) {
        this.apiService.readBook(id).subscribe(
            success => {
                this.book = success;
                this.tagCheckboxMap = this.cacheService.getTagCheckboxMap(this.book.tags);
             },
            error => this.apiService.handleError(error)
        );
    }

    upsertBook() {
        console.log('Upserting book with tagCheckboxMap: ' + this.tagCheckboxMap.size);

        this.book.tags = this.getSelectedTags();

        console.log('Upserting book with tags: ' + this.book.tags.length);
        let apiServiceRequest;
        if ( this.book.id ) apiServiceRequest = this.apiService.updateBook(this.book);
        else                apiServiceRequest = this.apiService.createBook(this.book);


        apiServiceRequest.subscribe(
            success => {
                // this.listBooks();
                this.returnToSearch();
            },
            error => this.apiService.handleError(error)
        );
    }

    deleteBook(id: number) {
        if ( confirm('Are you sure you want to delete the book, instead of inactivating it?')) {
            this.apiService.deleteBook(id).subscribe(
                success => {
                    this.listBooks();
                },
                error => this.apiService.handleError(error)
            );
        }
    }

    public deleteReference(ref: Reference) {
        if (confirm('Are you sure you want to delet the reference: ' + ref.desc)) {
            this.apiService.deleteReference(ref).subscribe(
                success => {
                    this.listBooks();
                }
            );
        }
    }
    public openReferenceDialog(ref?: Reference) {
        console.log('Opening Reference Dialog: ' + ref);
       if ( ref == null ) this.reference = new Reference(this.book.id);
       else { this.reference = ref; }

        const dialogConfig = new VdlDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
           reference: this.reference
       };

        this.dialogRef = this.dialog.open(ReferenceComponent, dialogConfig);

        this.dialogRef.afterClosed().subscribe(
            (newReference: Reference) => {
                let service = this.apiService.createReference(newReference);
                if ( newReference.id ) service = this.apiService.updateReference(newReference);
                service.subscribe(
                    success => {
                        // this.listBooks();
                        this.returnToSearch();
                  },
                    error =>  this.apiService.handleError(error)
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
        for ( const t of this.cacheService.getTags() ) {
            if (this.tagCheckboxMap.get(t.id).checked) { selectedTags.push(t); }
        }
        return selectedTags;
    }

    getSaleStatusKeys() {
        return Array.from(this.bookStatusNames.keys());
    }

    // getConditionKeys() {
    //     return Object.keys(this.CONDITION);
    // }

    launchImageUrl(url: string) {
        window.open(this.BASE_URL + url, '_blank');
    }

    filterBookStatus() {
        this.router.navigate(['book', PAGE_TYPE.LIST_BOOKS, { bookStatus: this.selectedBookStatus }]);
    }

    getBookStatusKeys() {
        return Array.from(this.bookStatusNames.keys());
    }

    print(): void {
      let printContents;
      let popupWin;
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
