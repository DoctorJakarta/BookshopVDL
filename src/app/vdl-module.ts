import { NgModule } from '@angular/core';

import { VdlAutocompleteModule } from '@vdlx/vdl-angular/autocomplete';
import { VdlAvatarModule } from '@vdlx/vdl-angular/avatar';
import { VdlBadgeModule } from '@vdlx/vdl-angular/badge';
import { VdlBreadcrumbsModule } from '@vdlx/vdl-angular/breadcrumbs';
import { VdlButtonModule } from '@vdlx/vdl-angular/button';
import { VdlButtonToggleModule } from '@vdlx/vdl-angular/button-toggle';
import { VdlCardModule } from '@vdlx/vdl-angular/card';
import { VdlCheckboxModule } from '@vdlx/vdl-angular/checkbox';
import { VdlChipsModule } from '@vdlx/vdl-angular/chips';
import { VdlDataTableModule } from '@vdlx/vdl-angular/data-table';
import { VdlDatepickerModule } from '@vdlx/vdl-angular/datepicker';
import { VdlDetailsPanelModule } from '@vdlx/vdl-angular/details-panel';
import { VdlDialogModule } from '@vdlx/vdl-angular/dialog';
import { VdlDividerModule } from '@vdlx/vdl-angular/divider';
import { VdlExpansionModule } from '@vdlx/vdl-angular/expansion';
import { VdlFormFieldModule } from '@vdlx/vdl-angular/form-field';
import { VdlGlobalHelpModule } from '@vdlx/vdl-angular/global-help';
import { VdlGlobalNotificationModule } from '@vdlx/vdl-angular/global-notification';
import { VdlGridListModule } from '@vdlx/vdl-angular/grid-list';
import { VdlIconModule } from '@vdlx/vdl-angular/icon';
import { VdlInputModule } from '@vdlx/vdl-angular/input';
import { VdlListModule } from '@vdlx/vdl-angular/list';
import { VdlLoginModule } from '@vdlx/vdl-angular/login';
import { VdlMenuModule } from '@vdlx/vdl-angular/menu';
import { VdlMomentDateModule, VdlNativeDateModule } from '@vdlx/vdl-angular/core';
import { VdlNotificationModule } from '@vdlx/vdl-angular/notification';
import { VdlPaginatorModule } from '@vdlx/vdl-angular/paginator';
import { VdlPanelModule } from '@vdlx/vdl-angular/panel';
import { VdlPopoverModule } from '@vdlx/vdl-angular/popover';
import { VdlProgressBarModule } from '@vdlx/vdl-angular/progress-bar';
import { VdlProgressSpinnerModule } from '@vdlx/vdl-angular/progress-spinner';
import { VdlRadioModule } from '@vdlx/vdl-angular/radio';
//import { VdlScrollableContainerModule } from '@vdlx/vdl-angular/scrollbar';
import { VdlScrollableContainerModule } from '@vdlx/vdl-angular/scrollable-container';
import { VdlSelectModule } from '@vdlx/vdl-angular/select';
import { VdlSidenavModule } from '@vdlx/vdl-angular/sidenav';
import { VdlSliderModule } from '@vdlx/vdl-angular/slider';
import { VdlSlideToggleModule } from '@vdlx/vdl-angular/slide-toggle';
import { VdlSortModule } from '@vdlx/vdl-angular/sort';
import { VdlStepperModule } from '@vdlx/vdl-angular/stepper';
import { VdlTabsModule } from '@vdlx/vdl-angular/tabs';
import { VdlTitleBarModule } from '@vdlx/vdl-angular/title-bar';
import { VdlToolbarModule } from '@vdlx/vdl-angular/toolbar';
import { VdlTooltipModule } from '@vdlx/vdl-angular/tooltip';
import { VdlTopBarModule } from '@vdlx/vdl-angular/top-bar';
import { VdlWizardModule } from '@vdlx/vdl-angular/wizard';
import { VdlTableModule } from '@vdlx/vdl-angular/table';
/**
 * NgModule that includes all Vdlerial modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    VdlAutocompleteModule,
    VdlAvatarModule,
    VdlBadgeModule,
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
    VdlDividerModule,
    VdlExpansionModule,
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
    VdlPaginatorModule,
    VdlPanelModule,
    VdlPopoverModule,
    VdlProgressBarModule,
    VdlProgressSpinnerModule,
 //   VdlRadioModule,
    VdlScrollableContainerModule,
    VdlSelectModule,
    VdlSidenavModule,
    VdlSliderModule,
    VdlSlideToggleModule,
    VdlSortModule,
    VdlStepperModule,
    VdlTableModule,
    VdlTabsModule,
    VdlTitleBarModule,
    VdlToolbarModule,
    VdlTooltipModule,
    VdlTopBarModule,
    VdlWizardModule
  ]
})
export class VdlModule {}
