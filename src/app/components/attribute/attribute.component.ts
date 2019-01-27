import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from '../../model/attribute';
import { Detail } from '../../model/detail';

export enum PAGE_TYPE {
    LIST_ATTRIBUTES = 'List',
    NEW_ATTRIBUTE = 'New',
    EDIT_ATTRIBUTE = 'Edit'
}

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})


export class AttributeComponent implements OnInit {
    PAGE_TYPE: typeof PAGE_TYPE = PAGE_TYPE;        // This exposed the enum to the HTML
    pageType = PAGE_TYPE.LIST_ATTRIBUTES;

    attributes: any;
    attribute: any;

    constructor(private _apiService: ApiService, private _cacheService: CacheService,
                private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            if (params['pageType']) this.pageType = params['pageType'];

            switch (this.pageType) {
                case PAGE_TYPE.NEW_ATTRIBUTE: this.attribute = new Attribute(); break;
                case PAGE_TYPE.EDIT_ATTRIBUTE: this.attribute = this.getAttribute( params['attributeId'] ); break;
                case PAGE_TYPE.LIST_ATTRIBUTES: this.attributes = this.getAttributeList();
           }
        });
    }
    
    listAttributes() { this.router.navigate(['attribute', PAGE_TYPE.LIST_ATTRIBUTES]); }
    newAttribute() { this.router.navigate(['attribute', PAGE_TYPE.NEW_ATTRIBUTE]); }
    editAttribute(id: number) { this.router.navigate(['attribute', PAGE_TYPE.EDIT_ATTRIBUTE, { attributeId: id} ] ); }

    getAttributeList() {
        this._apiService.readAttributes().subscribe(
            success => {
                this.attributes = success;
                this._cacheService.setAttributes(success);            // Cache is refreshed whenever List is called, which happens after New/Update
            },
            error => this._apiService.handleError(error)
        );
    }
    
    getAttributes() {
        this._apiService.readAttributes().subscribe(
            success => {  
                const attributeNames = success; 
                for ( const name of attributeNames ) {
                    console.log("Got attribute Name: " + name);
                    this.getAttribute(999);
                }
            },
            error => this._apiService.handleError(error)
        );    
    }

    getAttribute(id: number) {
        this._apiService.readAttribute(id).subscribe(
            success => {
                this.attribute = success;
            },
            error => this._apiService.handleError(error)
        );    
    }

    // upsertAttribute(isNew: boolean) {
    //     let apiServieRequest;
    //     if ( isNew ) apiServieRequest = this._apiService.createAttribute(this.attribute);
    //     else         apiServieRequest = this._apiService.updateAttribute(this.attribute);               

    //     apiServieRequest.subscribe(
    //         success => {
    //             this.listAttributes();
    //         },
    //         error => this._apiService.handleError(error)
    //     );
    // }

  ngOnInit() {
   }

}
