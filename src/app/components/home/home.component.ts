import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiServiceUrl: any;

  constructor(private _apiService: ApiService) { 
      this.apiServiceUrl = _apiService.getApiServiceUrl();
  }

  ngOnInit() {
  }

}
