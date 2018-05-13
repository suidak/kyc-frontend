import { Injectable,Injector ,ReflectiveInjector} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import  { Http ,Response,RequestMethod,Headers,RequestOptions  } from  "@angular/http";

import { HttpModule } from '@angular/http';
import {AppSettings} from '../../app.module';
import 'rxjs/add/operator/toPromise';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';



interface ValidationResult{
  [key:string]:boolean;
}




function checkUser(control: FormControl,email:string) : Promise<ValidationResult>{

  return new Promise((resolve, reject) => {
    setTimeout(() => {

//var http:Http;
      var headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
      var options = new RequestOptions({ headers: headers });

       var  value = this.http.post(AppSettings.URLServeur+'/getUsersByMail', JSON.stringify({mail:email}), options).toPromise();


    //  var value= this.checkUser("hbahaythem@gmail.com");

      console.log("-----------------test mail exice-------------------");
      console.log(value);
      console.log("-----------------test mail exice-------------------");



      if (email === "hbahaythem@gmail.com") {
        resolve({"usernameTaken": true})
      } else {
        resolve(null);
      };

    }, 1000);
  });



}


function checkMailUser(control: FormControl, source: string) : Observable<ValidationResult> {

  const providers = (<any>HttpModule).decorators[0].args[0].providers;
  const injector = ReflectiveInjector.resolveAndCreate(providers);
  const http = injector.get(Http);

  const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  const options = new RequestOptions({ headers: headers });
  let url = AppSettings.URLServeur+'/getUsersByMail';

  return new Observable((obs: any) => {
    control
      .valueChanges
      .debounceTime(400)
      .flatMap(value =>  http.post(url, JSON.stringify({mail:source}),options).map(res => res.json()))
      .subscribe(
        data => {

          var user=data
          console.log(user);

          if (user != null) {

            obs.next({"usernameTaken": true});
          } else {
            obs.next(null);
          };



          obs.complete();
        },
        error => {
          console.log("-----------------test mail error-------------------");
          console.log(error);
          let message = error;
          let reason;
          if (message === 'Username taken') {
            reason = 'usernameTaken';
          }
          if (message === 'Email taken') {
            reason = 'emailTaken';
          }
          obs.next({ [reason]: true });
          obs.complete();
        }
      );
  });
}



@Injectable()
export class UsernameValidator {

  constructor(){}






  static startsWithNumber(control: FormControl): ValidationResult {

    if ( control.value !="" && !isNaN(control.value.charAt(0)) ){
      return {"startsWithNumber": true};
    }

    return null;
  }

  static usernameTaken(control: FormControl) {

    return checkMailUser(control,control.value);
    //return checkUser(control,control.value);


    /*return new Promise((resolve, reject) => {
     setTimeout(() => {
       // var http:Http;
      //  this.http.get(this.URLServeur+'/getUsersAgentsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);

        //return this.http.post(this.URLServeur+"/agence", JSON.stringify(agence), this.options);
       // var  value = http.post(AppSettings+'/getUsersByMail/'+control.value).map(res => res.json());


        //var headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
       // var options = new RequestOptions({ headers: headers });

     // var  value3 = this.checkUser(control.value);
      // var  value9 = dataService.getUsersByMail(control.value);

       // var  value="hbahaythem@gmail.com";

        var headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
       var options = new RequestOptions({ headers: headers });
       // var http=  Http;
        // var  value = this.http.post(AppSettings+'/getUsersByMail/', JSON.stringify({mail:control.value}), options);


        var value= this.checkUser("hbahaythem@gmail.com");

        console.log("-----------------test mail exice-------------------");
        console.log(value);
        console.log("-----------------test mail exice-------------------");



        if (control.value === "hbahaythem@gmail.com") {
          resolve({"usernameTaken": true})
        } else {
          resolve(null);
        };

     }, 1000);
    });*/

  }


  static oldusernameTaken(control: FormControl): Promise<ValidationResult> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {


        var headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
        var options = new RequestOptions({ headers: headers });
        const providers = (<any>HttpModule).decorators[0].args[0].providers;
        const injector = ReflectiveInjector.resolveAndCreate(providers);
        const http = injector.get(Http);
        let url = 'http://localhost:3000/getUsersByMail';
        var  value = http.post(url, JSON.stringify({mail:control.value}), options);

        if (control.value === "David") {
          resolve({"usernameTaken": true})
        } else {
          resolve(null);
        };

      }, 1000);
    });

  }




}
