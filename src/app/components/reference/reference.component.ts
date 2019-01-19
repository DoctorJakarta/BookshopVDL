import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { VdlDialog, VdlDialogConfig, VdlDialogRef, VdlIconRegistry, VDL_DIALOG_DATA } from 'vdl-angular';
import { Reference } from '../../model/reference';

@Component({
  selector: 'app-reference',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})

export class ReferenceComponent implements OnInit {
    static config: VdlDialogConfig = {
        disableClose: true,
        autoFocus: true,                      // 2018-12-17  Focus doesnt seem to work
        width: '800px',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        }
    };

    reference: Reference;

    constructor(
                public dialogRefReference: VdlDialogRef<ReferenceComponent>,
                vdlIconRegistry: VdlIconRegistry,
                @Inject(VDL_DIALOG_DATA) data) {

        vdlIconRegistry.registerFontClassAlias('fontawesome', 'fa');
        this.reference = data.reference;
    }

    public static getConfig() {
        return this.config;
    }

    ngOnInit() {
    }

}
