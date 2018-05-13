import { BrowserModule } from '@angular/platform-browser';

import { RouterModule,Routes } from '@angular/router';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {InfoIncidentsComponent } from './infoIncidents.component';
import { CarouselModule, AlertModule } from 'ng2-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from './equal-validator.directive';
import { HttpModule } from '@angular/http';

import {ModalModule} from "ngx-modal";

import { TimelineComponent, ChatComponent, NotificationComponent } from './home.component';
import {ControlaccesComponent } from './controlacces.component';
import {InfositeComponent } from './infosite.component';
import {RondeComponent } from './ronde.component';
import {ConsignesComponent } from './consignes.component';
import {ProceduresComponent } from './procedures.component';
import {TranslateModule} from "ng2-translate";
import {MomentModule} from 'angular2-moment';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgUploaderModule } from 'ngx-uploader';
/*import {CalendarModule,CalendarComponent} from "ap-angular2-fullcalendar";*/

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [BrowserModule,CommonModule, CarouselModule, NgbDropdownModule.forRoot(),
      AlertModule,ModalModule,FormsModule,TabsModule.forRoot(),NgUploaderModule,
      ReactiveFormsModule,HttpModule,TranslateModule.forRoot(),MomentModule, RouterModule,
      BrowserAnimationsModule,
      NgbModalModule.forRoot(),
      CalendarModule.forRoot(),
      Ng2AutoCompleteModule
    ],
    declarations: [HomeComponent, TimelineComponent, ChatComponent, NotificationComponent,
      ControlaccesComponent,InfositeComponent,EqualValidator,InfoIncidentsComponent,RondeComponent,
      ProceduresComponent,ConsignesComponent

    ],
    exports: [HomeComponent, TimelineComponent, ChatComponent, NotificationComponent,
      ControlaccesComponent,InfositeComponent,InfoIncidentsComponent,RondeComponent,
      ConsignesComponent,ProceduresComponent]
}
)

export class HomeModule {

}
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
const platform = platformBrowserDynamic();
