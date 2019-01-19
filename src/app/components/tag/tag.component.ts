import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../model/tag';

export enum PAGE_TYPE {
    LIST_TAGS = 'List',
    NEW_TAG = 'New',
    EDIT_TAG = 'Edit'
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})

export class TagComponent implements OnInit {
    PAGE_TYPE: typeof PAGE_TYPE = PAGE_TYPE;        // This exposed the enum to the HTML
    pageType = PAGE_TYPE.LIST_TAGS;

    tags: any;
    tag: any;

    constructor(private _apiService: ApiService, private _cacheService: CacheService,
                private route: ActivatedRoute, private router: Router) {

        this.route.params.subscribe(params => {
            if (params['pageType']) this.pageType = params['pageType'];

            switch (this.pageType) {
                case PAGE_TYPE.NEW_TAG: this.tag = new Tag(); break;
                case PAGE_TYPE.EDIT_TAG: this.tag = this.getTag( params['tagKey'] ); break;
                case PAGE_TYPE.LIST_TAGS: this.tags = this.getTagList();
           }
        });


    }
    
    listTags() { this.router.navigate(['tag', PAGE_TYPE.LIST_TAGS]); }
    newTag() { this.router.navigate(['tag', PAGE_TYPE.NEW_TAG]); }
    editTag(key: string) { this.router.navigate(['tag', PAGE_TYPE.EDIT_TAG, { tagKey: key} ] ); }

    getTagList() {
        this._apiService.readTags().subscribe(
            success => {
                this.tags = success;
                this._cacheService.setTags(success);            // Cache is refreshed whenever List is called, which happens after New/Update
            },
            error => this._apiService.handleError(error)
        );
    }

    getTag(key: string) {
        this._apiService.readTag(key).subscribe(
            success => {
                this.tag = success;
            },
            error => this._apiService.handleError(error)
        );    
    }

    upsertTag(isNew: boolean) {
        let apiServieRequest;
        if ( isNew ) apiServieRequest = this._apiService.createTag(this.tag);
        else         apiServieRequest = this._apiService.updateTag(this.tag);               

        apiServieRequest.subscribe(
            success => {
                this.listTags();
            },
            error => this._apiService.handleError(error)
        );
    }

    deleteTag(key: string) {
        if ( confirm('Are you sure you want to delete the tag, instead of inactivating it?')) {
            this._apiService.deleteTag(key).subscribe(
                success => {
                    this.listTags();
                },
                error => this._apiService.handleError(error)
            );
        }
    }

  ngOnInit() {
  }

}
