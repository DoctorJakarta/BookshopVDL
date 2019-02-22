import { Component, ElementRef,  NgZone, OnInit, Renderer,  ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { VdlAutocompleteTrigger, VdlIconRegistry, VdlOption, GlobalNotification, GlobalHelp,  Category } from 'vdl-angular';
import { NgModel } from '@angular/forms';
import { ApiService } from './services/api.service';
import { CacheService } from './services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vdl-angular-cli-starter';
  public selectedCategory: Category | null;

  public inputTypeahead: string;
  public inputValue: any;


  public categories: Category[] = [
    { displayName: 'Home', route: 'home', icon: 'fa-home' },
    { displayName: 'Books', route: 'book/List', icon: 'fa-columns' },
    { displayName: 'Export', route: 'export', icon: 'fa-download' },
    { displayName: 'Configuration', icon: 'fa-cog', expanded: true,
        subCategories:[
            { displayName: 'Attributes', route: 'attribute/List', icon: 'fa-list-alt' },
            { displayName: 'Subjects', route: 'subject/List', icon: 'fa-sitemap' },
            { displayName: 'Tags', route: 'tag/List', icon: 'fa-tags' }
        ]
    }
   ];

  constructor(private _apiService: ApiService, private _cacheService: CacheService,
                vdlIconRegistry: VdlIconRegistry,
                private _sanitizer: DomSanitizer,
                private _renderer: Renderer,
                private _router: Router,
                private _ngZone: NgZone,
                private _elementRef: ElementRef
    ) {
        vdlIconRegistry.registerFontClassAlias('fontawesome', 'fa');
        vdlIconRegistry.addSvgIcon(
        'ux-veritas',
        _sanitizer.bypassSecurityTrustResourceUrl('/assets/ux-veritas.svg')
        );
  }


  public onCategorySelect(category: Category) {
    this._router.navigate([category.route]);
    const routedContent = this._elementRef.nativeElement.querySelector(
      '.routed-content'
    );

    if (routedContent) {
      routedContent.scrollTop = 0;
    }
  }

  private findCategoryByRoute(
    categories: Category[],
    route: string
  ): Category | null {
    const trimmedRoute: string = route.startsWith('/') ? route.substr(1) : route;
    let trimmedCvRoute = '';

    function reducer(pv: Category, cv: Category): Category {
      if (cv.subCategories && cv.subCategories.length > 0) {
        return cv.subCategories.reduce(reducer, pv);
      }

      trimmedCvRoute = cv.route.startsWith('/') ? cv.route.substr(1) : cv.route;

      return trimmedCvRoute === trimmedRoute ? cv : pv;
    }

    return categories.reduce(reducer);
  }

    getTags() {
        this._apiService.readTags().subscribe(
            success => { this._cacheService.setTags(success); },
            error => this._apiService.handleError(error)
        );
    }
    getAttributes() {
        this._apiService.readAttributes().subscribe(
            success => {
                this._cacheService.setAttributes(success);            // Cache is refreshed whenever List is called, which happens after New/Update
            },
            error => this._apiService.handleError(error)
        );
    }

/*     getAttributes() {
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
    } */

    // getAttribute(id: number) {
    //     this._apiService.readAttribute(id).subscribe(
    //         success => {  this._cacheService.addAttribute(success); },
    //         error => this._apiService.handleError(error)
    //     );    
    // }

    getSubjects() {
        this._apiService.readSubjects().subscribe(
            success => {
               this._cacheService.setSubjects(success);            // Cache is refreshed whenever List is called, which happens after New/Update
            },
            error => this._apiService.handleError(error)
        );
    }

    public ngOnInit() {

        this.getTags();
        this.getAttributes();
        this.getSubjects();


        this.selectedCategory = this.categories[0];
        this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.selectedCategory = this.findCategoryByRoute(
            this.categories,
            event.urlAfterRedirects
            );
        }
        });
  }
}
