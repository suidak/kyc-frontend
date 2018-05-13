import {Component, OnInit} from "@angular/core";
import {Md5} from 'ts-md5/dist/md5';
import { AuthService } from "../shared/auth.service";
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {User} from "../shared/user.interface";

import {TranslateService} from 'ng2-translate';

import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';


@Component({
  templateUrl: './inscrikey.component.html',
 // styleUrls: ['./site.component.css']
  //  template: ` `
})

export class InscrikeyComponent implements OnInit {

lg="";
imageWidth: number = 100;

    myForm: FormGroup;
  users : any[];
  user  = [];
  usersj :string;
    error = false;
    errorMessage = '';
isUser=false;

    constructor( private router: Router,private formBuilder: FormBuilder, public authService: AuthService,
                 private translate: TranslateService, private dataService: DataService) {
      translate.addLangs(["en", "fr"]);
      translate.setDefaultLang('en');



      this.lg=translate.getBrowserLang();

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }


inscrikeyForm: FormGroup;
  key= new FormControl("", Validators.required);
  cofkey= new FormControl("", Validators.required);

 onSignin() {

    this.myForm.value.password=Md5.hashStr(this.myForm.value.password.trim());



    this.authService.signinUser(this.myForm.value).subscribe(
      response => {

        this.users = response;
         if(response){

           if(response._id!=0){

             localStorage.setItem('User', JSON.stringify(response) );


             switch(response.typeUser) {
               case "SuperAdmin":
                 this.router.navigate([ 'superadmin/administrateur' ]);
                 //console.log( localStorage.getItem('User'));
                 break;
               case "Admin":
                this.router.navigate([ 'admin/site' ]);
                // console.log( localStorage.getItem('User'));
               break;
               case "ChefPoste":
                // this.router.navigate([ 'admin/site' ]);

                 this.router.navigate([ '/' ]);
                this.router.navigate([ '/' ]);
                 // console.log( localStorage.getItem('User'));
                 break;
               case "Agent":

                  var listeSite=[];
                 this.dataService.getSitesByIdChef().subscribe(

                   data =>{
                     listeSite = data;

                     if(listeSite.length==1){
                       var NewChef=JSON.parse(localStorage.getItem('User'));

                       NewChef.idSite=listeSite["0"]._id;
                       NewChef.site=listeSite["0"];
                       localStorage.setItem('User', JSON.stringify(NewChef) );
                       this.router.navigate([ 'chef/home' ]);
                     }
                   } ,

                   error => console.log(error),

                 );


                // this.router.navigate([ 'chef/home' ]);

                 // console.log( localStorage.getItem('User'));
                 break;

               case "Client":

                 var listeSite=[];
                 this.dataService.getSitesByIdClient().subscribe(

                   data =>{
                     listeSite = data;

                     if(listeSite.length==1){
                       var NewChef=JSON.parse(localStorage.getItem('User'));

                       NewChef.idSite=listeSite["0"]._id;
                       NewChef.site=listeSite["0"];
                       localStorage.setItem('User', JSON.stringify(NewChef) );
                       this.router.navigate([ 'client/home' ]);
                     }
                   } ,

                   error => console.log(error),

                 );


                 // this.router.navigate([ 'chef/home' ]);

                 // console.log( localStorage.getItem('User'));
                 break;

             }

           }


        }else{

          this.errorMessage='true';

        }


      },
      error => {
        alert(error.text());
        console.log(error.text());
      }


    );


  }



  onChangeLg(data) {


    this.lg=data;
    this.translate.use(data);
  }

    ngOnInit():any {

      this.inscrikeyForm = this.formBuilder.group({
        key:this.key,
        cofkey:this.cofkey

      });



    }


    inscikey(){

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
