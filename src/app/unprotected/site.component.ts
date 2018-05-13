import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';

import { AuthService } from "../shared/auth.service";
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {User} from "../shared/user.interface";
import {AppSettings} from '../app.module';

import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';

import {TranslateService} from 'ng2-translate';




@Component({
  templateUrl: './site.component.html',
 // styleUrls: ['./site.component.css']
  //  template: ` `
})

export class SiteComponent implements OnInit {


lg="";
imageWidth: number = 100;

  myForm: FormGroup;
  users : any[];
  user  = [];
  usersj :string;
    error = false;
    errorMessage = '';
isUser=false;

  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  sizeLimit: number = 91000000;

  fileIsUpload=false;
  nameFileUpload="";

    constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private router: Router,private formBuilder: FormBuilder, public authService: AuthService,
                 private translate: TranslateService, private dataService: DataService) {
      translate.addLangs(["en", "fr"]);
      translate.setDefaultLang('en');



      this.lg=translate.getBrowserLang();

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');


      this.options = new NgUploaderOptions({
        url: AppSettings.URLServeur+'/banque/upload',
        autoUpload: true,
        calculateSpeed: true
      });

    }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          console.log('------>'+data.response);
          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileIsUpload=true;
            this.nameFileUpload=this.response.filename;


          }


        }
      });
    });
  }

  fileCertificateUpload="";
  fileCertificateUploadIsUpload=false;

  handleUploadfileCertificate(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          console.log('------>'+data.response);
          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileCertificateUploadIsUpload=true;
            this.fileCertificateUpload=this.response.filename;


          }


        }
      });
    });
  }

  fileArticlesUpload="";
  fileArticlesIsUpload=false;
  handleUploadfileArticles(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          console.log('------>'+data.response);
          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileArticlesIsUpload=true;
            this.fileArticlesUpload=this.response.filename;


          }


        }
      });
    });
  }

  fileFinancialsUpload='';
  fileFinancialsIsUpload=false;
  handleUploadfileFinancials(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          console.log('------>'+data.response);
          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileFinancialsIsUpload=true;
            this.fileFinancialsUpload=this.response.filename;


          }


        }
      });
    });
  }

  fileHareholdersUpload='';
  fileHareholdersIsUpload=false;
  handleUploadfileHareholders(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          console.log('------>'+data.response);
          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileHareholdersIsUpload=true;
            this.fileHareholdersUpload=this.response.filename;


          }


        }
      });
    });
  }

  fileLicenceUpload='';
  fileLicenceIsUpload=false;
  handleUploadLicence(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          console.log('------>'+data.response);
          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileLicenceIsUpload=true;
            this.fileLicenceUpload=this.response.filename;


          }


        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }


  addBanque(){


    this.addBanqueForm.value.dateCreation=new Date().getTime();
    this.addBanqueForm.value.etat="Demande";


 if(this.fileLicenceIsUpload){
   this.addBanqueForm.value.fileLicence=this.fileLicenceUpload;
 }

    if(this.fileHareholdersIsUpload){
      this.addBanqueForm.value.fileHareholders=this.fileHareholdersUpload;
    }

    if(this.fileFinancialsIsUpload){
      this.addBanqueForm.value.fileFinancials=this.fileFinancialsUpload;
    }


    if(this.fileArticlesIsUpload){
      this.addBanqueForm.value.fileArticles=this.fileArticlesUpload;
    }

    if(this.fileCertificateUploadIsUpload){
      this.addBanqueForm.value.fileCertificate=this.fileCertificateUpload;
    }






    this.dataService.addBanque(this.addBanqueForm.value).subscribe(
      res => {
        var newColi = res.json();

        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès";


      },
      error => {
        console.log(error)
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
      }

    );
  }





  addBanqueForm: FormGroup;
  identity= new FormControl("",Validators.required);
  certificate= new FormControl("",Validators.required);
  Licence= new FormControl("",Validators.required);
  Adresse= new FormControl("",Validators.required);
  tel= new FormControl("",Validators.required);
  fax= new FormControl("",Validators.required);
  email= new FormControl("",Validators.required);
  dateConstitution= new FormControl("",Validators.required);
  actionnaires= new FormControl("");
  fileCertificate= new FormControl("");
  fileArticles= new FormControl("");
  fileFinancials= new FormControl("");
  fileHareholders= new FormControl("");
  fileLicence= new FormControl("");
  dateCreation= new FormControl("");
  etat= new FormControl("");



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


    this.addBanqueForm = this.formBuilder.group({
      identity:this.identity,
    certificate:this.certificate,
    Licence:this.Licence,
    Adresse:this.Adresse,
    tel:this.tel,
    fax:this.fax,
    email:this.email,
    dateConstitution:this.dateConstitution,
    actionnaires:this.actionnaires,
    fileCertificate:this.fileCertificate,
    fileArticles:this.fileArticles,
    fileFinancials:this.fileFinancials,
    fileHareholders:this.fileHareholders,
    fileLicence:this.fileLicence,
    dateCreation:this.dateCreation,
    etat:this.etat

    });

    }

  public alertsSuccess=false;
  public alertsSuccessMsg="";
  public alertsDanger=false;
  public alertsDangerMsg="";





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
