import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../model/subject';

export enum PAGE_TYPE {
    LIST_SUBJECTS = 'List',
    NEW_SUBJECT = 'New',
    EDIT_SUBJECT = 'Edit'
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})

export class SubjectComponent implements OnInit {

    PAGE_TYPE: typeof PAGE_TYPE = PAGE_TYPE;        // This exposed the enum to the HTML
    pageType = PAGE_TYPE.LIST_SUBJECTS;

    subjects: any;
    subject: any;

    constructor(private _apiService: ApiService, private _cacheService: CacheService,
                private route: ActivatedRoute, private router: Router) {

        this.route.params.subscribe(params => {
            if (params['pageType']) this.pageType = params['pageType'];

            switch (this.pageType) {
                case PAGE_TYPE.NEW_SUBJECT: this.subject = new Subject(); break;
                case PAGE_TYPE.EDIT_SUBJECT: this.subject = this.getSubject( params['subjectId'] ); break;
                case PAGE_TYPE.LIST_SUBJECTS: this.subjects = this.getSubjectList();
           }
        });


    }
    
    listSubjects() { this.router.navigate(['subject', PAGE_TYPE.LIST_SUBJECTS]); }
    newSubject() { this.router.navigate(['subject', PAGE_TYPE.NEW_SUBJECT]); }
    editSubject(id: number) { this.router.navigate(['subject', PAGE_TYPE.EDIT_SUBJECT, { subjectId: id} ] ); }

    getSubjectList() {
        this._apiService.readSubjects().subscribe(
            success => {
                this.subjects = success;
                this._cacheService.setSubjects(success);            // Cache is refreshed whenever List is called, which happens after New/Update
            },
            error => this._apiService.handleError(error)
        );
    }

    getSubject(id: number) {
        this._apiService.readSubject(id).subscribe(
            success => {
                this.subject = success;
            },
            error => this._apiService.handleError(error)
        );    
    }

    upsertSubject(isNew: boolean) {
        let apiServieRequest;
        if ( isNew ) apiServieRequest = this._apiService.createSubject(this.subject);
        else         apiServieRequest = this._apiService.updateSubject(this.subject);               

        apiServieRequest.subscribe(
            success => {
                this.listSubjects();
            },
            error => this._apiService.handleError(error)
        );
    }

    deleteSubject(id: number) {
        if ( confirm('Are you sure you want to delete the subject, instead of inactivating it?')) {
            this._apiService.deleteSubject(id).subscribe(
                success => {
                    this.listSubjects();
                },
                error => this._apiService.handleError(error)
            );
        }
    }


  ngOnInit() {
  }

}
