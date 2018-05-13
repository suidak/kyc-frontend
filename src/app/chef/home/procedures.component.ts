import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Site }    from '../../models/site.interface';
import {TranslateService} from 'ng2-translate';

import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import {AppSettings} from '../../app.module';
import * as io from "socket.io-client";




@Component({

	selector: 'procedure-cmp',
  templateUrl: 'procedures.component.html',
  styleUrls: ['./forme.css']
})


export class ProceduresComponent implements OnInit {

  socket=io.connect(AppSettings.URLServeur);

  public site: Site;
  submitted = false;


  public listeTypeRonde=['Safety','Exterieure','Interieure','Ouverture','Fermeture','Option'];

   addProcedureForm: FormGroup;
  addProcedureTestForm: FormGroup;
   editProcedureForm: FormGroup;

   idSite= new FormControl("");
   idClient= new FormControl("");
   client= new FormControl("");
   etat= new FormControl("");
   remarque= new FormControl("",Validators.required);
  remarqueTest= new FormControl("",Validators.required);
   type= new FormControl("");
   dateCreation= new FormControl("");
    Site= new FormControl("");
   nom= new FormControl("");
   pieceJointe= new FormControl("");
   lien= new FormControl("");
   idUser= new FormControl("");
   user= new FormControl("");
  lg="";




 users=[];


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
  public  openeEditProcedure= false;

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
  listeProcedureJour:any;

	constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder, private translate: TranslateService) {


	  this.userActuelle= JSON.parse(localStorage.getItem('User'));


    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');




    this.lg=translate.getBrowserLang();

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');


    this.options = new NgUploaderOptions({
      url: AppSettings.URLServeur+'/procedure/upload',
      autoUpload: true,
      calculateSpeed: true
    });




  }


  listefileImageUploade=[];

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {

          this.response = JSON.parse(data.response);

          if(this.response.error_code=="0"){
            this.fileIsUpload=true;
            this.nameFileUpload=this.response.filename;
            if(!this.in_array(this.response.filename,this.listefileImageUploade)){
              this.listefileImageUploade.push(this.response.filename);
            };

          }


        }
      });
    });
  }

  in_array(string, array){
    var result = false;
    var i;
    for(i=0; i<array.length; i++){
      if(array[i] == string){
        result = true;
      }
    }
    return result;
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





  zones:any;
  actionAdd(){

    this.procedures=[];
    this.newRonde=null;
    this.isListeNewrondeAdd=false;

    this.isAdd=true;
    this.isListe=false;

  }


  actionAnnule(){
    this.getListeConsigesJour();
    this.isAdd=false;
    this.isListe=true;
    this.openeEditUser= false;
    this.listefileImageUploade=[];
  }


  procedureInfo:any;

  openedInfoProcedure(proc){
    this.procedureInfo=proc;
    this.openedInfo=true;


  }



  getListeConsigesJour(){


    this.dataService.getProcedureByIdSiteJour(this.userActuelle.site).subscribe(

      data =>{
        this.listeProcedureJour = data;

        $.getScript('../../../assets/public/js/scripthba.js');
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }


  getMAJListeConsigesJour(){


    this.dataService.getProcedureByIdSiteJour(this.userActuelle.site).subscribe(

      data =>{
        this.listeProcedureJour = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }


  getUsers() {

    this.dataService.getUsersAgentsByAgence(this.userActuelle.idAgence).subscribe(

      data => this.users = data,

      error => console.log(error),
      () => this.isLoading = false
    );

  }
  procedures=[];
  newRonde:any;
  isListeNewrondeAdd=false;

  addProcedure(){


  this.addProcedureTestForm.value.dateCreation=new Date().getTime();
   this.addProcedureTestForm.value.idSite=this.userActuelle.site._id;
     this.addProcedureTestForm.value.etat="Actif";
    this.addProcedureTestForm.value.idClient = this.userActuelle.site.idClient;
    this.addProcedureTestForm.value.client = this.userActuelle.site.client;
    this.addProcedureTestForm.value.idUser = this.userActuelle._id;
    this.addProcedureTestForm.value.user = this.userActuelle;
    this.addProcedureTestForm.value.remarque =  this.addProcedureTestForm.value.remarqueTest;
    this.addProcedureTestForm.value.pieceJointe = this.listefileImageUploade;


  this.dataService.addProcedure(this.addProcedureTestForm.value).subscribe(
      res => {
        var newRondeService = res.json();
        this.addAlertsConsigne(newRondeService);
        this.newRonde=newRondeService;
        this.procedures.push(this.newRonde);
        this.isListeNewrondeAdd=true;
        this.addProcedureTestForm.reset();
        this.listefileImageUploade=[];


        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès";

        this.socket.emit('addProcedure',this.userActuelle.site._id);



      },
      error => {
        console.log(error);
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
      }

    );


  }
  addAlertsConsigne(consigneobjet){

    var Cobject={
      type: String,
      idSite:String,
      idObjet:String,
      idAgent:String,
      idAgentCreate:String,
      dateCreation: Date,
      etat: String,
      objets:Object,
      agent: Object,
    };
    var object=consigneobjet;


    this.listAgentsSite.forEach(function(element) {


      var Cobject={
        type: "Procedure",
        idSite:this.userActuelle.site._id,
        idObjet:object._id,
        idAgent:element.idAgent,
        idAgentCreate:this.userActuelle._id,
        dateCreation:  new Date().getTime(),
        dateOpen:  new Date().getTime(),
        etat: "1",
        objets:object,
        agent: this.userActuelle,
      };

      this.dataService.addAlerts(Cobject).subscribe(
        res => {
          console.log(element.idAgent+" alert ----->");
          console.log(Cobject);

          this.socket.emit('addAlert',this.userActuelle.site._id+this.userActuelle._id);

        },
        error => {
          console.log(error);
          this.alertsDanger=true;
          this.alertsDangerMsg="Certains paramètres invalides";
        }

      );


    }.bind(this));





  }


  listAgentsSite=[];
  getListeAgentSite(){
    this.dataService.getListeAgentByIdSite(this.userActuelle.site._id).subscribe(
      data => {

        this.listAgentsSite = data;
        console.log('listAgentsSite==>');
        console.log(data);

      },

      error => console.log(error),
      () => this.isLoading = false
    );

  }


  delateProcedure(rd){


      this.dataService.deleteProcedure(rd).subscribe(
        res => {
          var pos = this.procedures.map(Procedures => { return rd._id }).indexOf(rd._id);
          this.procedures.splice(pos, 1);

        },
        error => console.log(error)
      );


  }


  procedureEdit:any;
  public openedEditProcedure(procedure) {
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
    this.openeEditProcedure = true;
    this.isListe= false;
    this.procedureEdit=procedure

  }

  editProcedure(procedure){
    this.dataService.editProcedure(procedure).subscribe(
      res => {
        this.procedureEdit = procedure;

        this.editProcedureForm.reset();
        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès";
      },
      error =>{
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";

      }
    );
  }


  ngOnInit() {

    this.actionAdd();
    this.getListeAgentSite();

    this.socket.on('mjrIncident'+this.userActuelle.site._id, function(data) {

      this.getMAJListeConsigesJour();

    }.bind(this));

    this.addProcedureForm = this.formBuilder.group({
      idSite:this.idSite,
      type: this.type,
      dateCreation: this.dateCreation,
      etat: this.etat,
      remarque:this.remarque,
      idClient:this.idClient,
      client:this.client,
      site:this.site,
      nom:this.nom,
      pieceJointe:this.pieceJointe,
      lien:this.lien,
      idUser:this.idUser,
      user:this.user,


    });

    this.addProcedureTestForm = this.formBuilder.group({
      idSite:this.idSite,
      type: this.type,
      dateCreation: this.dateCreation,
      etat: this.etat,
      remarqueTest:this.remarqueTest,
      idClient:this.idClient,
      client:this.client,
      site:this.site,
      nom:this.nom,
      pieceJointe:this.pieceJointe,
      lien:this.lien,
      idUser:this.idUser,
      user:this.user,


    });
    this.editProcedureForm = this.formBuilder.group({
      type: this.type,
      dateCreation: this.dateCreation,
      etat: this.etat,
      remarque:this.remarque,
      idClient:this.idClient,
      client:this.client,
      site:this.site,
      nom:this.nom,
      pieceJointe:this.pieceJointe,
      lien:this.lien,
      idUser:this.idUser,
      user:this.user,


    });





  }




}
