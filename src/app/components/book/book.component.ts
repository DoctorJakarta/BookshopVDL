import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../model/book';
import { Tag } from '../../model/tag';
import { TagCheckbox } from '../../model/tag';
import { Reference } from '../../model/reference';
import { ReferenceComponent } from '../reference/reference.component';

import { VdlDialogRef, VdlDialog, VdlDialogConfig } from 'vdl-angular';

export enum PAGE_TYPE {
    LIST_BOOKS = 'List',
    NEW_BOOK = 'New',
    EDIT_BOOK = 'Edit'
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
    public dialogRef: VdlDialogRef<ReferenceComponent>;

    PAGE_TYPE: typeof PAGE_TYPE = PAGE_TYPE;        // This exposed the enum to the HTML
    pageType = PAGE_TYPE.LIST_BOOKS;

    books: any;
    book: any;
    tags: Tag[];
    tagCheckboxMap: Map<string, TagCheckbox>;

    reference: any;

    constructor(private _apiService: ApiService, private _cacheService: CacheService,
                private dialog: VdlDialog,
                private route: ActivatedRoute, private router: Router) {

        this.tags = _cacheService.getTags();

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
                case PAGE_TYPE.LIST_BOOKS: this.books = this.getBooks();
           }
        });


    }

    listBooks() { this.router.navigate(['book', PAGE_TYPE.LIST_BOOKS]); }
    newBook() { this.router.navigate(['book', PAGE_TYPE.NEW_BOOK]); }
    editBook(id: number) { this.router.navigate(['book', PAGE_TYPE.EDIT_BOOK, { bookId: id} ] ); }

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
            if (this.tagCheckboxMap.get(t.key).checked) selectedTags.push(t);
        }
        return selectedTags;
    }

    ngOnInit() {

    }

}
