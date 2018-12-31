import { Component, ElementRef, NgZone, OnInit, Renderer, ViewChild, ViewEncapsulation, EventEmitter, Output, Inject } from '@angular/core';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Category, VdlIconRegistry, VdlOption } from 'vdl-angular';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('input') public inputElement: ElementRef;

  title = 'BookshopUI';
    public categoryList: Category[] = [
    { displayName: 'Home', route: 'home', icon: 'fa-home' },
    { displayName: 'Inventory', route: 'inventory', icon: 'fa-clipboard' },
    {
      displayName: 'Giant',
      icon: 'fa-check-square',
      subCategories: [
        { displayName: 'Fee', icon: 'fa-car' },
        { displayName: 'Fi', icon: 'fa-calendar' },
        { displayName: 'Foe', icon: 'fa-birthday-cake' }
      ]
    }
  ];

  public selectedCategory: Category | null;

  constructor(vdlIconRegistry: VdlIconRegistry,
              private _sanitizer: DomSanitizer,
              private _renderer: Renderer,
              private _route: ActivatedRoute,
              private _router: Router,
              private _ngZone: NgZone,
              @Inject(DOCUMENT) private document: any) {
    vdlIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  public categorySelected(category: Category) {
    console.log('Selected Category: ' + category.route);
    this.selectedCategory = category;
  }

  onActivate(event) {
   console.log('Got onActivate event path: ' + event.path);
  }





  public onCategorySelect(category: Category) {
    console.log('Selected onCategorySelect: ' + category.route);
    this._router.navigate([category.route]);
  }

  public alert(value: string) {
    alert(value);
  }



  private findCategoryByRoute(categories: Category[], route: string): Category | null {
    const trimmedRoute: string = route.startsWith('/') ? route.substr(1) : route; //  trimStart(route, '/');

    function reducer(pv: Category, cv: Category): Category {
      if (cv.subCategories && cv.subCategories.length > 0) {
        return cv.subCategories.reduce(reducer, pv);
      }
      return cv.route === trimmedRoute ? cv : pv;
    }

    return categories.reduce(reducer);

  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnInit() {
    this.selectedCategory = this.categoryList[0];
    console.log('App-Admin has initialized with route: ' + this._route.snapshot.url[0]);


    this._router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
            console.log('Got router.events: ' + event.urlAfterRedirects);
               this.selectedCategory = this.findCategoryByRoute(this.categoryList, event.urlAfterRedirects);
         }
      }
    );
  }


}
