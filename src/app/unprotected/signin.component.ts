import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Md5} from 'ts-md5/dist/md5';

import { AuthService } from "../shared/auth.service";
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {User} from "../shared/user.interface";

import {TranslateService} from 'ng2-translate';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']

})

export class SigninComponent implements OnInit {


lg="";
imageWidth: number = 100;

    myForm: FormGroup;
  users : any[];
  user  = [];
  usersj :string;
    error = false;
    errorMessage = '';
  MessageErreur='Login ou mot de passe invalide!';
isUser=false;

    constructor( private router: Router,private fb: FormBuilder, public authService: AuthService,
                 private translate: TranslateService, private dataService: DataService) {
      translate.addLangs(["en", "fr"]);
      translate.setDefaultLang('en');


this.lg=translate.getBrowserLang();

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }


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

                 break;
               case "Admin":
                this.router.navigate([ 'admin/site' ]);

               break;
               case "type1":


                 this.router.navigate([ '/' ]);
                 this.router.navigate([ '/' ]);

                 break;

               case "ChefPoste":


                 this.router.navigate([ '/' ]);
                 this.router.navigate([ '/' ]);

                 break;
               case "Agent":

                  var listeSite=[];

                 this.dataService.getSitesByIdAgent().subscribe(

                   data =>{
                     listeSite = data;

                     if(data.length>0){

                       var NewChef=JSON.parse(localStorage.getItem('User'));

                       console.log("listeSite->:");
                       console.log(listeSite);

                       NewChef.idSite=listeSite["0"].Site._id;
                       NewChef.site=listeSite["0"].Site;
                       NewChef.typeAgent=listeSite["0"].type;
                       NewChef.listSite=listeSite;
                       localStorage.setItem('User', JSON.stringify(NewChef) );

                       if(listeSite["0"].type=="ChefPost"){


                         this.router.navigate([ 'chef/colis' ]);
                       }
                       if(listeSite["0"].type=="Agent"){


                         this.router.navigate([ 'chef/home' ]);

                         //  this.router.navigate([ 'agent/home' ]);
                       }

                     }

                     if(data.length==0){
                       this.errorMessage='true';
                       this.MessageErreur='Votre compte est en cours de configuration !';

                     }


                     //  this.router.navigate([ 'chef/home' ]);
                   // }
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
                     console.log(data);
                     console.log(data.length);



                     if(data.length>0){
                       var NewChef=JSON.parse(localStorage.getItem('User'));

                       NewChef.idSite=listeSite["0"]._id;
                       NewChef.site=listeSite["0"];
                       NewChef.listSite=listeSite;
                       localStorage.setItem('User', JSON.stringify(NewChef) );
                       this.router.navigate([ 'client/home' ]);
                     }

                     if(data.length==0){
                       this.errorMessage='true';
                       this.MessageErreur='Votre compte est en cours de configuration !';

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
          this.MessageErreur='Login ou mot de passe invalide!';

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

      console.log("-----------");
        this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
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
