import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { DataService } from '../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Site }    from '../models/site.interface';
import {TranslateService} from 'ng2-translate';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { UsernameValidator } from '../services/usernameValidator'
import {AppSettings} from '../app.module';


@Component({
  templateUrl: './inscri.component.html',
 // styleUrls: ['./site.component.css']
  //  template: ` `
})

export class InscriComponent implements OnInit {


  public site: Site;

  submitted = false;


  editUserForm: FormGroup;
  addUserForm: FormGroup;
  lg="";

  listeTypeIdentite=['Passeport','ID','Driving lisence'];
  listePEE=['Yes','non'];
  idRole= new FormControl("");
  login= new FormControl("");
  password= new FormControl("");
  confPassword= new FormControl("");
  typeIdentite=new FormControl("");
  numIdentite=new FormControl("");
  residenceFiscale=new FormControl("");
  PPE=new FormControl("");
  FATCA=new FormControl("");

  nbrTentatives= new FormControl("");
  dateModifPassword= new FormControl("");
  listPasswords= new FormControl("");
  dateCreation= new FormControl("");
  lastDateLog= new FormControl("");
  typeUser= new FormControl("");
  nom= new FormControl("");
  prenom= new FormControl("");
  tel= new FormControl("");
  mail= new FormControl("");
  cofmail= new FormControl("");
  datenaissence= new FormControl("");
  adresse= new FormControl("");
  ville= new FormControl("");
  codePostal= new FormControl("");
  etat= new FormControl("");
  pays= new FormControl("");
  tocken= new FormControl("");
  file= new FormControl("");
  photo= new FormControl("");
  idSite= new FormControl("");
  Site= new FormControl("");

  matricule= new FormControl("");
  badge= new FormControl("");
  dateLivraisonCarte= new FormControl("");
  dateValiditeCarte= new FormControl("");



  sites=[];
  users=[];
  user  :any;
  client=[];
  isLoading = true;
  public opened= false;
  public  openeEditUser= false;
  public  openedInfo= false;

  public listeTypeUser=['SimpelUser','SuperAdmin','Admin','Agent'];
  public  listeEtatUser=['Actif','Inactif'];

  public alertsSuccess=false;
  public alertsSuccessMsg="";
  public alertsDanger=false;
  public alertsDangerMsg="";

  public closeAlertSuccess():void {
    this.alertsSuccess=false;
  }
  public closeAlertDanger():void {
    this.alertsDanger=false;
  }

  public isAdd=false;
  public isListe=true;

  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  sizeLimit: number = 91000000;
  errorMessage: string;
  fileIsUpload=false;
  nameFileUpload="";

  userActuelle:any;

  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder, private translate: TranslateService) {



    this.lg=translate.getBrowserLang();

    let browserLang = translate.getBrowserLang();
    if((localStorage.getItem('longageSite')=="fr")||(localStorage.getItem('longageSite')=="en")){
      translate.use(localStorage.getItem('longageSite'));
    }else{
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }



    this.options = new NgUploaderOptions({
      url: AppSettings.URLServeur+'/user/upload',
      autoUpload: true,
      calculateSpeed: true
    });

  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {

          this.response = JSON.parse(data.response);
          if(this.response.error_code=="0"){
            this.fileIsUpload=true;
            this.nameFileUpload=this.response.filename;


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



  actionAdd(){

    this.isAdd=true;
    this.isListe=false;

  }




  ngOnInit() {

    this.editUserForm = this.formBuilder.group({
      nom:this.nom,
      prenom:this.prenom,
      tel:this.tel,
      adresse:this.adresse,
      ville:this.ville,
      codePostal:this.codePostal,
      etat:this.etat,
      pays:this.pays,
      photo:this.photo,

    });

    this.addUserForm = this.formBuilder.group({
      idRole:this.idRole,
      login:this.login,
      nbrTentatives:0,
      dateModifPassword: new Date().getTime(),
      typeUser:this.typeUser,
      nom:this.nom,
      prenom:this.prenom,
      tel:this.tel,
      mail:this.mail,
      cofmail:this.cofmail,
      datenaissence:this.datenaissence,
      adresse:this.adresse,
      ville:this.ville,
      codePostal:this.codePostal,
      etat:this.etat,
      pays:this.pays,
      tocken:Md5.hashStr(this.idRole+''+new Date().getTime()),
      photo:this.photo,
      password:this.password,
      confPassword:this.confPassword,
      typeIdentite:this.typeIdentite,
      numIdentite:this.numIdentite,
      idSite:this.idSite,
      site:this.site,
      matricule:this.matricule,
      badge:this.badge,
      dateLivraisonCarte:this.dateLivraisonCarte,
      dateValiditeCarte:this.dateValiditeCarte,
      residenceFiscale:this.residenceFiscale,
      PPE:this.PPE,
      FATCA:this.FATCA,


    });




  }

  prevEtap(){

    this.isAdd=false;
    this.alertsSuccess=false;
    this.isListe=true;
    this.openeEditUser= false;

  }

  newUser:any;


  generationPWD(user){

    let gneratePWD=this.generatePassword();
    var addAddress=user.mail;
    var nomEmail =user.nom;
    var prenomEmail = user.prenom;
    var LoginAgent= user.login;

    user.password=Md5.hashStr(gneratePWD);
    this.dataService.editUser(user).subscribe(
      res => {
        this.user = user;


        var mail= {
          "email": {
            "addAddress": addAddress,
            "Subject": "Inscription sur Fact Group",
            "PWD":gneratePWD,
            "LOGIN":addAddress,
            "nom":nomEmail,
            "prenom":prenomEmail,
            "login":LoginAgent,
          }
        };

        this.dataService.sendMail(mail).subscribe(
          res => {
            this.alertsSuccess=true;
            this.alertsSuccessMsg="Votre E-mail a été envoyé avec succès";
          },
          error => {
            console.log(error);
          }

        );

        this.alertsSuccess=true;
        this.alertsSuccessMsg="Votre E-mail a été envoyé avec succès";
        this.editUserForm.reset();
      },
      error =>{
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalider";
        console.log(error);
      }
    );

  }

  addUser(){

    //this.addUserForm.value.photo=this.nameFileUpload;
    this.addUserForm.value.dateCreation=new Date().getTime();
    this.addUserForm.value.tocken=Md5.hashStr(this.idRole+''+new Date().getTime());
    this.addUserForm.value.dateModifPassword= new Date().getTime();
    this.addUserForm.value.typeUser= "CompteBanque";
    this.addUserForm.value.etat= "Demande";




    var addAddress=this.addUserForm.value.mail;
    let gneratePWD=this.addUserForm.value.password;
    var nomEmail =this.addUserForm.value.nom;
    var prenomEmail = this.addUserForm.value.prenom;
    var LoginAgent= this.addUserForm.value.login;

    this.addUserForm.value.password=Md5.hashStr(gneratePWD);

    var codeBar= {
      code: 'AGT-'+new Date().getTime(),
      url: "url",

    };


    this.dataService.addUser(this.addUserForm.value).subscribe(
      res => {
        var newUser = res.json();
        this.users.push(newUser);
        this.newUser= res.json();
        this.addUserForm.reset();
        this.nameFileUpload="";
        this.alertsSuccess=true;
        var mail= {
          "email": {
            "addAddress": addAddress,
            "Subject": "Inscription sur Fact Group",
            "PWD":gneratePWD,
            "LOGIN":addAddress,
            "nom":nomEmail,
            "prenom":prenomEmail,
            "login":LoginAgent,
          }
        };

        this.dataService.sendMail(mail).subscribe(
          res => {
            this.alertsSuccess=true;
            this.alertsSuccessMsg="Opération effectuée avec succès";
          },
          error => {
            console.log(error);
          }

        );
        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès";
        this.isAdd=true;


      },
      error => {
        console.log(error);
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalider";
      }

    );



  }

  editUser(user) {



    user.tocken=Md5.hashStr(this.idRole+''+new Date().getTime());

    if(user.codeBar){

      this.dataService.editUser(user).subscribe(
        res => {
          this.user = user;

          this.editUserForm.reset();
          this.alertsSuccess=true;
          this.alertsSuccessMsg="Opération effectuée avec succès";
        },
        error =>{
          this.alertsDanger=true;
          this.alertsDangerMsg="Certains paramètres invalider";
        }
      );

    }else{

      var codeBar= {
        code: 'AGT-'+new Date().getTime(),
        url: "url",

      };

      this.dataService.generationCodeBar(codeBar).subscribe(
        res => {


          var codebar=res;

          user.codeBar=codebar.code;
          user.photoCodeBar=codebar.photo;
          user.photoCodeBar64=codebar.photo64;
          this.dataService.editUser(user).subscribe(
            res => {
              this.user = user;

              this.editUserForm.reset();
              this.alertsSuccess=true;
              this.alertsSuccessMsg="Opération effectuée avec succès";
            },
            error =>{
              this.alertsDanger=true;
              this.alertsDangerMsg="Certains paramètres invalider";
              console.log(error);
            }
          );


        },
        error => {
          console.log(error);
        }

      );



    }


  }

  public closeEditUser() {
    this.openeEditUser = false;
    this.isListe= false;
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
  }

  public openedEditUser(user) {
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
    user.dateModifPassword=user.dateModifPassword.slice( 0, 10 );
    user.datenaissence=user.dateModifPassword.slice( 0, 10 );

    this.user = user;

    this.openeEditUser = true;
    this.isListe= false;

  }

  public closeInfoUser() {
    this.openedInfo = false;

  }

  public openedInfoUser(user) {
    this.user = user;
    this.openedInfo = true;
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.openeEditUser = false;
    this.alertsDanger=false;

  }

  public generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


}
