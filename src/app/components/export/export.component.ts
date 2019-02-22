import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Book, SALE_STATUS } from '../../model/book';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})

export class ExportComponent implements OnInit {

    books: any;

    constructor(private _apiService: ApiService) {
        this.searchBooksByString(SALE_STATUS.LIST);
    }

    searchBooksByString(status: string){
        this._apiService.searchBooksByStatus(status).subscribe(
            success => {
                this.books = success;
            },
            error => this._apiService.handleError(error)
        );
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
