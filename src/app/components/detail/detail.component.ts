import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from '../../model/attribute';
import { Detail } from '../../model/detail';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  attribute: any;

    constructor(private _apiService: ApiService, private _cacheService: CacheService,
                private route: ActivatedRoute, private router: Router) {

    }
    
    getAttribute(id: number) {
        this._apiService.readAttribute(id).subscribe(
            success => {
                this.attribute = success;
            },
            error => this._apiService.handleError(error)
        );    
    }

  ngOnInit() {
      this.getAttribute(999);
  }

}
