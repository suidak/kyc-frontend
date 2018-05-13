import { BrowserModule} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule ,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { SigninComponent } from "./unprotected/signin.component";
import { SiteComponent } from "./unprotected/site.component";
import { SignupComponent } from "./unprotected/signup.component";
import { InscriComponent } from "./unprotected/inscri.component";
import { InscrikeyComponent } from "./unprotected/inscrikey.component";
import { ChefComponent } from "./chef/chef.component";
import { ChefModule } from './chef/chef.module';
import { NgUploaderModule } from 'ngx-uploader';
import { DatePickerModule } from 'ng2-datepicker';


import { AuthGuard } from "./shared/auth.guard";
import { AuthService } from "./shared/auth.service";

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import {TranslateModule} from "ng2-translate";
import {TranslateStaticLoader,TranslateLoader} from "ng2-translate/ng2-translate";

import { SharedModule } from './shared/shared.module';

import { AlertModule } from 'ng2-bootstrap';

const appRoutes: Routes = [

  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, data: { title: 'signup' }},
  {path: 'inscri', component: InscriComponent, data: { title: 'inscri' }},
  {path: 'inscrikey', component: InscrikeyComponent, data: { title: 'inscriky' }},
  {path: 'site', component: SiteComponent, data: { title: 'Site' }},
  {path: 'signin', component: SigninComponent, data: { title: 'signinr' }},
  {path: 'chef', component: ChefComponent, data: { title: 'Agent' }},


];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,InscriComponent,
    InscrikeyComponent,
    SiteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgUploaderModule,
    ReactiveFormsModule,
    HttpModule,
    ChefModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    AlertModule,
    RouterModule.forRoot(appRoutes),
    SharedModule
  ],
  providers: [
    DataService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthGuard,
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

export class AppSettings {

/*
  public static BaseURL="https://demo2.positiftunisie.com";
  public static URLServeur="https://demo2.positiftunisie.com:3002";
  public static URLServeurSMTP='https://demo2.positiftunisie.com/serveurMail/index.php';
  public static URLServeurSMTPevenement='https://demo2.positiftunisie.com/serveurMail/evenements.php';
  public static  URLServeurSMTPcoli='https://demo2.positiftunisie.com/serveurMail/coli.php';
  public static URLServeurSMTPincident='https://demo2.positiftunisie.com/serveurMail/incident.php';
  public static URLServeurSMTPraportClient='https://demo2.positiftunisie.com/serveurMail/rapportPublication.php';
  public static URLServeurSMTPsendmail='https://demo2.positiftunisie.com/serveurMail/sendmail.php';
  public static URLServeurCodeBar='https://demo2.positiftunisie.com/generationCodeBar/index.php';
  public static URLServeurInjectionUser='https://demo2.positiftunisie.com/generationCodeBar/injectionUser.php';

*/

/*
  public static BaseURL="http://masterfact.eu";
  public static URLServeur="http://masterfact.eu:8080";
  public static URLServeurSMTP='http://demo.masterfact.eu/serveurMail/index.php';
  public static URLServeurSMTPevenement='http://demo.masterfact.eu/serveurMail/evenements.php';
  public static  URLServeurSMTPcoli='http://demo.masterfact.eu/serveurMail/coli.php';
  public static URLServeurSMTPincident='http://demo.masterfact.eu/serveurMail/incident.php';
  public static URLServeurSMTPraportClient='http://demo.masterfact.eu/serveurMail/rapportPublication.php';
  public static URLServeurSMTPsendmail='http://demo.masterfact.eu/serveurMail/sendmail.php';
  public static URLServeurCodeBar='http://demo.masterfact.eu/generationCodeBar/index.php';
  public static URLServeurInjectionUser='http://demo.masterfact.eu/generationCodeBar/injectionUser.php';
*/






 public static BaseURL="http://localhost:4200";
  public static URLServeur="http://localhost:3000";
  public static URLServeurKys="http://196.234.72.96:3000";
  public static URLServeurSMTP='http://localhost:80/serveurMail/index.php';
  public static URLServeurSMTPevenement='http://localhost:80/serveurMail/evenements.php';
  public static  URLServeurSMTPcoli='http://localhost:80/serveurMail/coli.php';
  public static URLServeurSMTPincident='http://localhost:80/serveurMail/incident.php';
  public static URLServeurSMTPraportClient='http://localhost:80/serveurMail/rapportPublication.php';
  public static URLServeurSMTPsendmail='http://localhost:80/serveurMail/sendmail.php';
  public static URLServeurCodeBar='http://localhost:80/generationCodeBar/index.php';
  public static URLServeurInjectionUser='http://localhost:80/generationCodeBar/injectionUser.php';


/*
  public static BaseURL="http://masterfact.eu";
  public static URLServeur="http://masterfact.eu:8080";
  public static URLServeurSMTP='http://masterfact.eu:80/serveurMail/index.php';
 public static URLServeurSMTPevenement='http://masterfact.eu:80/serveurMail/evenements.php';
 public static  URLServeurSMTPcoli='http://masterfact.eu:80/serveurMail/coli.php';
 public static URLServeurSMTPincident='http://masterfact.eu:80/serveurMail/incident.php';
 public static URLServeurSMTPraportClient='http://masterfact.eu:80/serveurMail/rapportPublication.php';
  public static URLServeurSMTPsendmail='http://masterfact.eu:80/serveurMail/sendmail.php';
 public static URLServeurCodeBar='http://masterfact.eu:80/generationCodeBar/index.php';
 public static URLServeurInjectionUser='http://masterfact.eu:80/generationCodeBar/injectionUser.php';
*/





}
