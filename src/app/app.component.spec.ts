import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VdlModule } from './vdl-module';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        VdlModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [AppComponent, TopbarComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'vdl-angular-cli-starter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.title).toEqual('vdl-angular-cli-starter');
  });
});
