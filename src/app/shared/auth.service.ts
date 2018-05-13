import { Injectable } from "@angular/core";
import { User } from "./user.interface";
import  { Http ,Response,RequestMethod,Headers,RequestOptions   } from  "@angular/http";


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {AppSettings} from '../app.module';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/observable/throw';

// Observable operators
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/distinctUntilChanged';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/filter';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/switchMap';

import { tokenNotExpired } from 'angular2-jwt';




@Injectable()
export class AuthService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  Hero:any[];
  data:any[];
  name='';

  /* URLServeur="http://demo2.positiftunisie.com:3002";
   URLServeurSMTP='http://demo2.positiftunisie.com/serveurMail/index.php';*/
  URLServeur=AppSettings.URLServeur;
  constructor(public  http : Http,) {}

  signupUser(user: User) {

    console.log('signupUser');
    return this.http.get("http://localhost:80/webserviceAPP/index.php").map(response => response.json());
    /* return this.http
       .get(`http://jsonplaceholder.typicode.com/users`)
       .map((r: Response) => r.json().data as User[]);*/

    // return this.http.get('http://jsonplaceholder.typicode.com/users').map(res => res.json());

    //console.log(user.email);
    // return user.email

  }


  signinUserOld(user: User) {
    console.log('User.email:'+user.email);
    //return this.http.get("http://jsonplaceholder.typicode.com/users").map(response => response.json());
    return this.http.get("http://localhost:80/webserviceAPP/index.php").map(response => response.json()).catch(this.handleError);

  }

  getInfoUser(){
    return this.http.get("http://localhost:80/webserviceAPP/infouser.php").map(response => response.json()).catch(this.handleError);

  }

  getListUser(){
    return this.http.get("http://localhost:88888/webserviceAPP/listeuser.php").map(response => response.json()).catch(this.handleError);

  }


  signinUser(user: User){



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({method: RequestMethod.Post, headers: headers });
    let body = JSON.stringify(user);
    //let url = 'http://localhost:80/webserviceAPP/index.php';
    let url = this.URLServeur+'/login';
    return this.http.post(url, body, this.options).map(res => res.json());
    // this.data[user.email,user.password];

    /* console.log(user.email);
    let body = JSON.stringify(user);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });

     let url = 'http://localhost:80/webserviceAPP/index.php';



     return this.http.post(url, user.email , options)
       .map(response => response.json()).catch(this.handleError)*/
  }

  logout() {

  }

  isAuthenticated() {
    return false;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
