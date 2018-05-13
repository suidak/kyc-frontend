import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Site }    from '../../models/site.interface';
import {TranslateService} from 'ng2-translate';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { UsernameValidator } from '../../services/usernameValidator';

import {AppSettings} from '../../app.module';



@Component({

	selector: 'home-cmp',

	templateUrl: 'agent.component.html',
  styleUrls: ['./forme.css']
})

export class AgentComponent implements OnInit {

  public site: Site;

submitted = false;


   editUserForm: FormGroup;
   addUserForm: FormGroup;
  lg="";


     idRole= new FormControl("");
    login= new FormControl("",Validators.required,UsernameValidator.loginTaken);
     password= new FormControl("", Validators.required);
    confPassword= new FormControl("",Validators.required);
    nbrTentatives= new FormControl("");
    dateModifPassword= new FormControl("");
    listPasswords= new FormControl("");
     dateCreation= new FormControl("");
    lastDateLog= new FormControl("");
    typeUser= new FormControl("");
     nom= new FormControl("", Validators.required);
     prenom= new FormControl("", Validators.required);
     tel= new FormControl("", Validators.required);
     mail= new FormControl("");
    cofmail= new FormControl("");
    datenaissence= new FormControl("");
    adresse= new FormControl("");
    ville= new FormControl("");
    codePostal= new FormControl("");
    etat= new FormControl("", Validators.required);
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

    typeAgent= new FormControl("", Validators.required);







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

  public listeTypeAgent=['Agent','ChefPost'];

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
  public isCard=false;


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

    this.userActuelle= JSON.parse(localStorage.getItem('User'));
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');


    /*console.log(translate.getBrowserLang());*/

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

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }





  actionAnnule(){
    this.getUsers();
    this.isAdd=false;
    this.isListe=true;
    this.openeEditUser= false;
  }


  getUsers() {

    this.dataService.getListeAgentDemande().subscribe(

      data =>{
        this.users = data;

        setTimeout(() => {
          $.getScript('../../../assets/public/js/scripthba.js');
        });
        this.isAdd=false;
        this.isCard=false;


      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  majGetUsers() {

    this.dataService.getListeAgentDemande().subscribe(

      data =>{
        this.users = data;
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }


  delateAgent(agent){
    if(window.confirm("Are you sure you want to permanently delete this item?")) {

      var objectSaved = {
        idAgent: agent._id,
        idSite: this.userActuelle.site._id ,
        dateCreation: new Date().getTime(),
        type:"Agent",
        Site:this.userActuelle.site,
        Agent :agent


      };
      this.dataService.deleteAgentSite(objectSaved).subscribe(
        res => {
          this.majGetUsers();

        },
        error =>{console.log(error);}
      );
    }

  }


  getSites() {


  this.dataService.getSites().subscribe(

    data => this.sites = data,

    error => console.log(error),
    () => this.isLoading = false
  );

}


   addSite(){
    console.log("Add site");
}

  ngOnInit() {

    this.getUsers();
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
      idAgence:"",
      photo:this.photo,
      password:this.password,
      confPassword:this.confPassword,
      idSite:this.idSite,
      site:this.site,
      matricule:this.matricule,
      badge:this.badge,
      dateLivraisonCarte:this.dateLivraisonCarte,
      dateValiditeCarte:this.dateValiditeCarte,
      typeAgent:this.typeAgent,


    });




  }

  prevEtap(){
    this.getUsers();
    this.isAdd=false;
    this.alertsSuccess=false;
    this.isListe=true;
    this.openeEditUser= false;

  }

  newUser:any;

  addUser(){


    console.log("idAgence:"+this.userActuelle.idAgence);

    this.addUserForm.value.photo=this.nameFileUpload;
    this.addUserForm.value.dateCreation=new Date().getTime();
    this.addUserForm.value.tocken=Md5.hashStr(this.idRole+''+new Date().getTime());
    this.addUserForm.value.password==Md5.hashStr(this.addUserForm.value.password) ;
    this.addUserForm.value.dateModifPassword= new Date().getTime();
    this.addUserForm.value.typeUser= "Agent";
    this.addUserForm.value.idAgence=this.userActuelle.idAgence ;
    this.addUserForm.value.idSite= this.userActuelle.site._id;
    this.addUserForm.value.site=this.userActuelle.site;
    var codeBar= {
      code: 'AGT-'+new Date().getTime(),
      url: "url",

    };
    console.log("codeBar:"+codeBar.code);

    var typeUserAgent=this.addUserForm.value.typeAgent;

    this.dataService.generationCodeBar(codeBar).subscribe(
      res => {
        var codebar=res;
        console.log('codebar');
        console.log(codebar);
        this.addUserForm.value.codeBar=codebar.code;
        this.addUserForm.value.photoCodeBar=codebar.photo;
        this.addUserForm.value.photoCodeBar64=codebar.photo64;
        this.dataService.addUser(this.addUserForm.value).subscribe(
          res => {
            var newUser = res.json();
            this.newUser= res.json();
            this.addUserForm.reset();
            this.nameFileUpload="";

            var objectSave = {
              idAgent: newUser._id,
              idSite:  this.userActuelle.site._id ,
              dateCreation: new Date().getTime(),
              type:typeUserAgent,
              Site: this.userActuelle.site,
              Agent :newUser
            };

            this.dataService.addAgentSite(objectSave).subscribe(
              res => {
                this.users.push(newUser);
                this.alertsSuccess=true;
                this.alertsSuccessMsg="Opération effectuée avec succès";

              },
              error =>{console.log(error);}
            );


          },
          error => {
            console.log(error)
            this.alertsDanger=true;
            this.alertsDangerMsg="Certains paramètres invalides";
          }

        );


      },
      error => {
        console.log(error)
      }

    );


  }

  editUser(user) {

    console.log(user);

     user.tocken=Md5.hashStr(this.idRole+''+new Date().getTime());

    if(1){

      this.dataService.editUser(user).subscribe(
        res => {
          this.user = user;
          console.log(user);
          this.editUserForm.reset();
          this.alertsSuccess=true;
          this.alertsSuccessMsg="Opération effectuée avec succès";
        },
        error =>{
          this.alertsDanger=true;
          this.alertsDangerMsg="Certains paramètres invalides";
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
  userModif=true;
  public openedEditUser(user) {
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
    user.dateModifPassword=user.dateModifPassword.slice( 0, 10 );
    user.datenaissence=user.dateModifPassword.slice( 0, 10 );

    this.user = user;
    this.userModif = user;

    this.openeEditUser = true;
    this.isListe= false;

  }

  public closeInfoUser() {
    this.openedInfo = false;

  }

  public openedInfoUser(user) {
    this.user = user;
    this.openedInfo = true;
    this.isCard=false;

  }
  Demande:any;
  valideCompte(demande){

    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";

    console.log("------------------------------------>>>");


    var object={
      "fname":demande.nom,
      "lname":demande.prenom,
      "dataHash":"123456789",
      "country":demande.pays,
      "birthdate":""+demande.datenaissence+"",
      "bankAccount":"0x732500782143dc0aec1ed8fcab1a1d5189dadca0"
    };
    console.log(object);
    var demandeEdit=demande;

    this.dataService.addCompteKYS(object).subscribe(
      res => {
        this.Demande = res;
        demandeEdit.etat="Valide";
        demandeEdit.key=res.key;
        console.log("------------------------------------");
        console.log(res);
        console.log("------------------------------------");
        this.editUser(demandeEdit);

        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès,key :"+res.key;
      },
      error =>{
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
        console.log(error);
      }
    );



  }




  infoBatcheAgent:any;
  openedGenerateBadge(agent){
    console.log("agent--->");
    console.log(agent);

    this.dataService.getUsersByid(agent._id).subscribe(

      data =>{
        this.infoBatcheAgent = data[0];
        console.log("infoBatcheAgent:");
        console.log(data);
        this.isCard=true;
        this.isListe= false;
        this.alertsSuccess=false;
        this.alertsSuccessMsg="";
        this.alertsDanger=false;
        this.alertsDangerMsg="";
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );


  }

  printBadge(printpage){
    console.log("printpage--->");
    console.log(printpage);
  var headstr = "<html><head><title></title></head><body>";
    var footstr = "</body>";
    var newstr =  document.getElementById(printpage).innerHTML;
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr+newstr+footstr;
    window.print();
    document.body.innerHTML = oldstr;
    document.close();
    console.log("fin--->");
    return false;
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
