import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { VdlModule } from './vdl-module';
import { ROUTES } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './styles/global.scss';

import { InventoryComponent } from './components/inventory/inventory.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    VdlModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
