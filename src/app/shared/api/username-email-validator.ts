import { Injectable,Injector } from "@angular/core";

import  { Http    } from  "@angular/http";


import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


interface IUsernameEmailValidator {
}

function checkUser(control: FormControl, source: string) : Observable<IUsernameEmailValidator> {

  // Manually inject Http


  // Return an observable with null if the
  // username or email doesn't yet exist, or
  // an objet with the rejetion reason if they do

  let url = 'http://localhost:80/webserviceAPP/index.php';

  return new Observable((obs: any) => {
    control
      .valueChanges
      .debounceTime(400)
      .flatMap(value =>  this.http.post(url, JSON.stringify({ [source]: value })))
      .subscribe(
        data => {
          obs.next(null);
          obs.complete();
        },
        error => {
          let message = error.json().message;
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

export class UsernameEmailValidator {

  constructor() {}

  static checkUsername(control: FormControl) {
    return checkUser(control, 'username');
  }

  static checkEmail(control: FormControl) {
    return checkUser(control, 'email');
  }
}
