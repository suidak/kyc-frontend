import { BrowserModule } from '@angular/platform-browser';
//import { DialogModule } from '@progress/kendo-angular-dialog';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignesComponent } from './consignes.component';
import { CarouselModule, AlertModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from './equal-validator.directive';
import { HttpModule } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

import { NgUploaderModule } from 'ngx-uploader';


import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';

//import { UploadModule } from '@progress/kendo-angular-upload';
import {TranslateModule} from "ng2-translate";

import {ModalModule} from "ngx-modal";
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [BrowserModule,CommonModule, CarouselModule, NgbDropdownModule.forRoot(),TabsModule, AlertModule.forRoot(),ModalModule,FormsModule,
      ReactiveFormsModule,HttpModule,DatePickerModule,TranslateModule.forRoot(),NgUploaderModule,SharedModule],
    declarations: [ConsignesComponent,EqualValidator],
    exports: [ConsignesComponent],



})

export class ConsignesModule {
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
const platform = platformBrowserDynamic();
