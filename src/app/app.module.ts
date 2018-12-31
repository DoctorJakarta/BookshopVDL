import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';

import {
  VdlExpansionModule,
  VdlAutocompleteModule,
  VdlBreadcrumbsModule,
  VdlButtonModule,
  VdlButtonToggleModule,
  VdlCardModule,
  VdlCheckboxModule,
  VdlChipsModule,
  VdlDataTableModule,
  VdlDatepickerModule,
  VdlDetailsPanelModule,
  VdlDialogModule,
  VdlFormFieldModule,
  VdlGlobalHelpModule,
  VdlGlobalNotificationModule,
  VdlGridListModule,
  VdlIconModule,
  VdlInputModule,
  VdlListModule,
  VdlLoginModule,
  VdlMenuModule,
  VdlMomentDateModule,
  VdlNativeDateModule,
  VdlNotificationModule,
  VdlPanelModule,
  VdlPopoverModule,
  VdlProgressBarModule,
  VdlProgressSpinnerModule,
  VdlRadioModule,
  VdlScrollableContainerModule,
  VdlSelectModule,
  VdlSidenavModule,
  VdlSliderModule,
  VdlSlideToggleModule,
  VdlStepperModule,
  VdlTabsModule,
  VdlTitleBarModule,
  VdlToolbarModule,
  VdlTooltipModule,
  VdlTopBarModule,
  VdlWizardModule
} from 'vdl-angular';
import { InventoryComponent } from './components/inventory/inventory.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules} ),

  VdlExpansionModule,
  VdlAutocompleteModule,
  VdlBreadcrumbsModule,
  VdlButtonModule,
  VdlButtonToggleModule,
  VdlCardModule,
  VdlCheckboxModule,
  VdlChipsModule,
  VdlDataTableModule,
  VdlDatepickerModule,
  VdlDetailsPanelModule,
  VdlDialogModule,
  VdlFormFieldModule,
  VdlGlobalHelpModule,
  VdlGlobalNotificationModule,
  VdlGridListModule,
  VdlIconModule,
  VdlInputModule,
  VdlListModule,
  VdlLoginModule,
  VdlMenuModule,
  VdlMomentDateModule,
  VdlNativeDateModule,
  VdlNotificationModule,
  VdlPanelModule,
  VdlPopoverModule,
  VdlProgressBarModule,
  VdlProgressSpinnerModule,
  VdlRadioModule,
  VdlScrollableContainerModule,
  VdlSelectModule,
  VdlSidenavModule,
  VdlSliderModule,
  VdlSlideToggleModule,
  VdlStepperModule,
  VdlTabsModule,
  VdlTitleBarModule,
  VdlToolbarModule,
  VdlTooltipModule,
  VdlTopBarModule,
  VdlWizardModule
  ],
    declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
