import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {TranslateService} from 'ng2-translate';

import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import * as io from "socket.io-client";
import {AppSettings} from '../../app.module';


@Component({

  selector: 'infoIncidents-cmp',
  templateUrl: './infoIncidents.component.html',
  styleUrls: ['./forme.css']
})

export class InfoIncidentsComponent implements OnInit {

  socket=io.connect(AppSettings.URLServeur);

  submitted = false;


  addvictimesForm: FormGroup;
  nomVictimes= new FormControl("");
  addauteursForm: FormGroup;
  nomAuteurs= new FormControl("");
  addtemoinsForm: FormGroup;
  nomTemoins= new FormControl("");
  telAuteurs= new FormControl("");
  telVictimes= new FormControl("");
  telTemoins= new FormControl("");
  addIncidentForm: FormGroup;

  type= new FormControl("", Validators.required);
  idSite= new FormControl("");
  idchefPoste= new FormControl("");
  dateCreation= new FormControl("");
  nature= new FormControl("");
  lieu= new FormControl("");
  date= new FormControl("", Validators.required);
  heure= new FormControl("", Validators.required);
  intervention= new FormControl("");
  heureArriveIntervention= new FormControl("");
  heureDepartIntervention= new FormControl("");
  numPV= new FormControl("");

  interventionP= new FormControl("");
  heureArriveInterventionP= new FormControl("");
  heureDepartInterventionP= new FormControl("");
  numPVP= new FormControl("");


  interventionS= new FormControl("");
  heureArriveInterventionS= new FormControl("");
  heureDepartInterventionS= new FormControl("");
  numPVS= new FormControl("");


  observation= new FormControl("");

  descriptifs= new FormControl("");
  complementInfo= new FormControl("");
  victimes= new FormControl("");
  auteurs= new FormControl("");
  temoins= new FormControl("");
  photos= new FormControl("");
  site= new FormControl("");
  chefpost= new FormControl("");
  emplacement= new FormControl("");
  souincident= new FormControl("");
  isLoading=true;
  lg="";

  public ismeridian: boolean = false;
  public isEnabled: boolean = true;
  public mytime: Date = new Date();


  listeTypeIncident=[];
  listeTypeIntervention=["Police","Secours"];
  private zones=[];

  user  :any;

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
  nameFileUpload="";


  fileIsUpload=false;
  listefileImageUploade=[];


  supImage(fileImg){
    this.listefileImageUploade.splice(fileImg, 1);
  }


  userActuelle:any;

  baseUrl="";

  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder, private translate: TranslateService) {
    this.baseUrl=AppSettings.BaseURL;
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



    if(this.userActuelle.site.type.incidents){
      if(this.userActuelle.site.type.incidents.length>0){

        var inss=[];


      }
    }
    else{

      this.dataService. getSitesById(this.userActuelle.site._id).subscribe(

        data =>{


          this.userActuelle.site=data;
          if(this.userActuelle.site.type.incidents){
            if(this.userActuelle.site.type.incidents.length>0){

              var inss=[];


            }
          }

        },

        error => console.log(error),
        () => this.isLoading = false
      );



    };



    /*;*/


    this.getListeTypeIncident();



    this.options = new NgUploaderOptions({
      url: AppSettings.URLServeur+'/incidents/upload',
      autoUpload: true,
      calculateSpeed: true
    });

  }



  getListeTypeIncident(){
    var listIdIncid = [];
    var inss=[];
    this.dataService.gettypesitesById(this.userActuelle.site.idType).subscribe(

      data =>{
        console.log("------------");
        console.log(data[0]);

        var list = data[0];

        list.incidents.forEach(function(element) {

          listIdIncid.push(element._id);

        });

        console.log("this.listIdIncid=>");
        console.log(listIdIncid);


        if(listIdIncid.length>0){
          this.dataService.getTypeincidentsByArray(JSON.stringify(listIdIncid)).subscribe(

            data =>{

              console.log("---------getTypeincidentsByArray--------->")
              console.log(data);

              data.forEach(function(element) {
                inss.push(element.name);

              });

              this.listeTypeIncident=inss;
              console.log("this.listeTypeIncident=>");
              console.log(this.listeTypeIncident);
              if(this.listeTypeIncident.length>0){
                this.updateActiviteIncidents();
              };

            } ,

            error => console.log(error),
            () => this.isLoading = false
          );



        }

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );







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


  getZones(site){

    this.dataService.getZones(site).subscribe(

      data => this.zones = data,

      error => console.log(error),
      () => this.isLoading = false
    );


  }

  listeVictim=[];
  islisteVictim=false;
  listeTemoins=[];
  islisteTemoins=false;
  listeAuteurs=[];
  islisteAuteurs=false;
  isValideForm=false;
  newIncident:any;

  addVictimes(){
    console.log("addVictimes:");
    console.log(this.addvictimesForm.value);
    this.listeVictim.push(this.addvictimesForm.value);
    this.islisteVictim=true;
    this.addvictimesForm.reset();

  }

  addAuteurs(){
    console.log("addVictimes:");
    console.log(this.addauteursForm.value);
    this.listeAuteurs.push(this.addauteursForm.value);
    this.islisteAuteurs=true;
    this.addauteursForm.reset();

  }

  addTemoins(){
    console.log("addVictimes:");
    console.log(this.addtemoinsForm.value);
    this.listeTemoins.push(this.addtemoinsForm.value);
    this.islisteTemoins=true;
    this.addtemoinsForm.reset();

  }

  listeContacts=[];

  addIncident(){

    this.alertsDanger=false;
    this.alertsDangerMsg="";

    console.log("addIncident:");
    console.log(this.addIncidentForm.value);

    this.addIncidentForm.value.dateCreation=new Date().getTime();
    this.addIncidentForm.value.idSite=this.userActuelle.site._id;
    this.addIncidentForm.value.idchefPoste=this.userActuelle._id;
    this.addIncidentForm.value.victimes=this.listeVictim;
    this.addIncidentForm.value.auteurs=this.listeAuteurs;
    this.addIncidentForm.value.temoins=this.listeTemoins;
    this.addIncidentForm.value.photos=this.listefileImageUploade;
    this.addIncidentForm.value.site=this.userActuelle.site;
    this.addIncidentForm.value.chefpost=this.userActuelle;
    this.addIncidentForm.value.actions=this.listeActionChec;

    console.log("liste contact select: ");
    console.log(this.userActuelle.site.client);
    console.log('liste mail contact :');

    console.log(this.listeMailcontact);


    var datesysteme=new Date();
    datesysteme.setHours(datesysteme.getHours()+0);
    console.log(datesysteme.getTime());

    var datesystemeRecu=new Date(this.addIncidentForm.value.date);
    var hours = this.addIncidentForm.value.heure.split(":")[0];
    var minutes = this.addIncidentForm.value.heure.split(":")[1];
    datesystemeRecu.setHours(hours);
    datesystemeRecu.setMinutes(minutes);
console.log('date====>');
    console.log('datesysteme-'+datesysteme);
    console.log('datesystemeRecu-'+datesystemeRecu);


    if(datesysteme<datesystemeRecu){
      console.log("erreur date event!!!!!");
      this.alertsDanger = true;
      this.alertsDangerMsg = "Vérifier date et heure";
    }else {


    this.dataService.addIncident(this.addIncidentForm.value).subscribe(
      res => {
        var newIncidentService = res.json();
        this.newIncident=res.json();
        this.addIncidentForm.reset();
        this.listeVictim=[];
        this.islisteVictim=false;
        this.listeTemoins=[];
        this.islisteTemoins=false;
        this.listeAuteurs=[];
        this.islisteAuteurs=false;
        this.listefileImageUploade=[];
        this.listeActionChec=[];
        this.fileIsUpload=false;
        this.alertsSuccess=true;
        this.alertsDanger=false;
        this.alertsDangerMsg="";
        this.alertsSuccessMsg="Opération effectuée avec succès";
        console.log("list contact listsEMAILsend =====>");
        console.log(this.listeMailcontact);

        var mail= {
          "email": {
            "addAddress": this.listeMailcontact ,
            "Subject": "Incident sur "+this.userActuelle.site.name,
            "Incident":newIncidentService
          }
        };

        console.log('email :');
        console.log(mail);

        this.dataService.sendMailIncident(mail).subscribe(
          res => {
            console.log("mail contact envoiyer: ");
            console.log(mail);
          },
          error => {
            console.log(error)
          }

        );

        this.socket.emit('addIncident',this.userActuelle.site._id);
        console.log('envoi socet haithem');


        this.updateActiviteIncidents();

      },
      error => {
        console.log(error);
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
      }

    );

    }

  }


  actionAdd(){
    console.log("actionAdd");
    this.listeSousZone=[];
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
  }

  ngOnInit() {

    this.getZones( this.userActuelle.site);
    this.socket.on('mjrIncident'+this.userActuelle.site._id, function(data) {
      this.updateActiviteIncidents();

    }.bind(this));

    this.addIncidentForm = this.formBuilder.group({
      idSite:this.idSite,
      idchefPoste:this.idchefPoste,
      dateCreation:this.dateCreation,
      type :this.type,
      nature:this.nature,
      lieu :this.lieu,
      date:this.date,
      heure :this.heure,
      intervention:this.intervention,
      heureArriveIntervention:this.heureArriveIntervention,
      heureDepartIntervention:this.heureDepartIntervention,
      numPV:this.numPV,
      interventionP:this.interventionP,
      heureArriveInterventionP:this.heureArriveInterventionP,
      heureDepartInterventionP:this.heureDepartInterventionP,
      numPVP:this.numPVP,
      interventionS:this.interventionS,
      heureArriveInterventionS:this.heureArriveInterventionS,
      heureDepartInterventionS:this.heureDepartInterventionS,
      numPVS:this.numPVS,
      observation:this.observation,
      descriptifs:this.descriptifs,
      complementInfo:this.complementInfo,
      victimes:this.victimes,
      auteurs:this.auteurs,
      temoins:this.temoins,
      photos:this.photos,
      site:this.site,
      emplacement:this.emplacement,
      souincident:this.souincident,
      chefpost:this.chefpost,

    });

    this.addvictimesForm = this.formBuilder.group({
      nomVictimes:this.nomVictimes,
      telVictimes:this.telVictimes,

    });
    this.addauteursForm = this.formBuilder.group({
      nomAuteurs:this.nomAuteurs,
      telAuteurs:this.telAuteurs,

    });
    this.addtemoinsForm = this.formBuilder.group({
      nomTemoins:this.nomTemoins,
      telTemoins:this.telTemoins,
    });



  }

  ActiviteIncidents:any;

  Vols=0;
  Nuisances=0;
  Agressions=0;
  Moeurs=0;
  Intrusions=0;
  Techniques=0;
  Autres=0;
  DangersPersonne=0;

  tabIncidents=[];


  updateActiviteIncidents(){

    console.log("updateActiviteIncidents . this.listeTypeIncident=>");
    console.log(this.listeTypeIncident);

    this.dataService.getIncidentsByIdSiteJour(this.userActuelle.site).subscribe(

      data =>{
        this.ActiviteIncidents = data;

        console.log("this.data=>");
        console.log(data);

        var tabInsi=[];

        this.listeTypeIncident.forEach(function(element) {

          tabInsi[element]={
            name:element,
            value:0,
            icon:"iconIncide.png"
          };

        });

        var newTabinsi=[];
        data.forEach(function(element) {

          tabInsi[element.type].value++;

          if(tabInsi[element.type].icon=="iconIncide.png"){
            this.dataService.getActionsTypeincidentsByName(element.type).subscribe(

              data =>{
                console.log(element.type+"--------------------------------->");
                console.log(data);

                if(data[0].icon){
                  tabInsi[element.type].icon=data[0].icon;
                }




              } ,

              error => console.log(error),
              () => this.isLoading = false
            );

          }



        }.bind(this));




        console.log("this.tabIncidents & this.listeTypeIncident=>");
        console.log(this.listeTypeIncident);


        this.listeTypeIncident.forEach(function(element) {

          newTabinsi.push(tabInsi[element]);
        });

        this.tabIncidents=newTabinsi;
        console.log("this.tabIncidents=>");
        console.log(this.tabIncidents);

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

    var ressss=JSON.stringify(this.ActiviteIncidents);

  }


  listeIncidentsType:any;

  getActiviteIncidentsByType(type){

    this.dataService.getIncidentsByIdSiteJourType(this.userActuelle.site,type).subscribe(

      data =>{
        this.listeIncidentsType = data;

        console.log(data);


      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  datexxxxx= new Date();
  listeActionIncidents=[];
  listeSousIncidents=[];
  incidentSelect:any;



  listeMailcontact=[];




  getListeMailContact(type){


    console.log("liste contact select: ");
    console.log(this.userActuelle.site.client.mail);


    this.listeMailcontact.push({"addAddress": this.userActuelle.site.client.mail});
    var liste=[];
    var typeInci=type;

    liste.push({"addAddress": this.userActuelle.site.client.mail});
    this.dataService.getUsersContactsBySite(this.userActuelle.site._id).subscribe(

      data =>{
        this.listeContacts = data;

        this.listeContacts.forEach(function(element) {

          let listeInciii=[];
          listeInciii=element.incident;

          if(this.in_array(typeInci,listeInciii)){
            liste.push({"addAddress": element.mail});
          }


        }.bind(this));

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

    this.listeMailcontact=liste;


  }

  listeSousZone=[];
  appelMethodeSousZone(event){
    if(event.sousZone){
      this.listeSousZone=event.sousZone;
    }else{
      this.listeSousZone=[];
    }

    console.log("listeSousZone==============>");
    console.log(this.listeSousZone);
  }

  appelMethode(event){
    console.log("event==============>");
    console.log(event);
    this.listeActionIncidents=[];
    this.listeSousIncidents=[];
    this.isCheckedSecours=false;
    this.isCheckedPolice=false;
    this.incidentSelect=null;


    if(event){
      this.listeMailcontact=[];
      this.getListeMailContact(event);
      this.dataService.getActionsTypeincidentsByName(event).subscribe(

        data =>{
          console.log("action :");
          console.log(data);
          if(data[0].actions){
            this.listeActionIncidents = data[0].actions;
          }
          if(data[0].sousincidents){
            this.listeSousIncidents = data[0].sousincidents;
          }

          this.incidentSelect=data[0];

        } ,

        error => console.log(error),
        () => this.isLoading = false
      );

    }





  }

  listeActionChec=[];
  checkboxActions(element,flag,i) {

    console.log("index:");
    console.log(i);
    var materielle=element;
    var materielleJson=element;
    if(flag){

      this.listeActionChec[i]=materielle;

    }else{

      delete  this.listeActionChec[i];

    }
    console.log('this.listeMatChec');
    console.log(this.listeActionChec);

  }

  isCheckedPolice=false;
  checkboxInterventionPolice(flag) {

    if(flag){

      this.isCheckedPolice=true;

    }else{

      this.isCheckedPolice=false;

    }
    console.log(this.isCheckedPolice);


  }

  isCheckedSecours=false;
  checkboxInterventionSecours(flag) {

    if(flag){

      this.isCheckedSecours=true;

    }else{

      this.isCheckedSecours=false;

    }


  }


}
