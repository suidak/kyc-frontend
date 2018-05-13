import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NAV_DROPDOWN_DIRECTIVES } from './layout/shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './layout/shared/sidebar.directive';
import { AsideToggleDirective } from './layout/shared/aside.directive';
import { BreadcrumbsComponent } from './layout/shared/breadcrumb.component';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { HeaderComponent } from "./layout/header.component";
import { SidebarComponent } from "./layout/sidebar";
import { ChatMessageComponent } from "./layout/chat-message/chat-message.component";

import { AgentModule } from './agent/agent.module';
import { AgentComponent } from "./agent/agent.component";




import { HomeModule } from './home/home.module';


import { ConsignesModule } from './consignes/consignes.module';

import { ProfilModule } from './profil/profil.module';



import { HomeComponent } from "./home/home.component";



import { ConsignesComponent } from "./consignes/consignes.component";


import { ProfilComponent } from "./profil/profil.component";


import { ColisComponent } from "./colis/colis.component";
import { ColisModule } from './colis/colis.module';



import { ChefComponent } from './chef.component';

import {TranslateModule} from "ng2-translate";
import {ModalModule} from "ngx-modal";

import {MomentModule} from 'angular2-moment';
import {NgPipesModule} from 'ngx-pipes';

import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from '../shared/shared.module';

const appRoutes: Routes = [
  {
    path: 'chef',
    component: ChefComponent,
    children: [
      {path: '',component: HomeComponent, pathMatch: 'full' },
      {path: 'home',component: HomeComponent },


      {path: 'consignes', component: ConsignesComponent},

      {path: 'colis', component: ColisComponent},
      {path: 'agent', component: AgentComponent},

      {path: 'profil', component: ProfilComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule,
    MomentModule,
    HomeModule,ConsignesModule,ProfilModule,ColisModule,AgentModule,
    RouterModule.forChild(appRoutes),
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    CustomFormsModule,
    SharedModule

  ],
  declarations: [ChefComponent, HeaderComponent,SidebarComponent,ChatMessageComponent,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    BreadcrumbsComponent,
    AsideToggleDirective,
    ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  exports: [RouterModule,ChefComponent, HeaderComponent, SidebarComponent]
})
export class ChefModule { }
