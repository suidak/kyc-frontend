import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../shared/auth.service";
import { Router } from '@angular/router';
import {User} from "../shared/user.interface";

import {TranslateService} from 'ng2-translate';

@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {


  lg="";
  imageWidth: number = 100;

  myForm: FormGroup;
  users : any[];
  user  = [];
  usersj :string;
  error = false;
  errorMessage = '';
  isUser=false;

  constructor( private router: Router,private fb: FormBuilder, public authService: AuthService,private translate: TranslateService) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');




    this.lg=translate.getBrowserLang();

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }


  onSignin() {

    this.authService.signinUser(this.myForm.value).subscribe(
      response => {

        this.users = response;
        if(response){

          if(response._id!=0){

            localStorage.setItem('User', JSON.stringify(response) );


            switch(response.typeUser) {
              case "SuperAdmin":
                this.router.navigate([ 'superadmin/administrateur' ]);
                break;
              case "Admin":
                this.router.navigate([ 'admin/site' ]);
                break;

            }

          }


        }else{

          this.errorMessage='true';

        }


      },
      error => {
        alert(error.text());

      }


    );


  }


  onChangeLg(data) {


    this.lg=data;
    this.translate.use(data);
  }

  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
    });

  }

  afficherProps(obj, nomObjet) {
    var résultat = "";
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        résultat += nomObjet + "." + i + " = " + obj[i].id + "\n";

        if(obj[i].id!=0){
          this.router.navigate([ 'back' ]);
        }else{
          this.errorMessage='true';
        }

      }
    }
    return résultat;
  }

  listerToutesLesPropriétés(o){
    var objectToInspect;
    var result = [];

    for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    }
    return result;
  }
}
