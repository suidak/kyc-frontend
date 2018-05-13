import { Component ,OnInit, NgZone, Inject,EventEmitter} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Site }    from '../../models/site.interface';
import {TranslateService} from 'ng2-translate';

import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

import * as io from "socket.io-client";
import {AppSettings} from '../../app.module';


@Component({

	selector: 'home-cmp',

	templateUrl: 'consignes.component.html',
  styleUrls: ['./forme.css']
})


export class ConsignesComponent implements OnInit {
  socket=io.connect(AppSettings.URLServeur);
  public site: Site;
  submitted = false;



  public listeTypeRonde=['Safety','Exterieure','Interieure','Fermeture','Option'];
  public listeTypeConsigne=['Périodiques','Permanentes'];
  public listeEtatConsigne=['Actif','Inactif'];

   addConsigneForm: FormGroup;
   editConsigneForm: FormGroup;
   addConsigneTestForm: FormGroup;





   tetat= new FormControl("", Validators.required);
   tremarque= new FormControl("", Validators.required);
   ttype= new FormControl("", Validators.required);
   tdateCreation= new FormControl("");
   tdateDebut= new FormControl("");
   tdateFin= new FormControl("");
   tdatePublication= new FormControl("");





   idSite= new FormControl("");
   idClient= new FormControl("");
   client= new FormControl("");
   etat= new FormControl("", Validators.required);
   remarque= new FormControl("", Validators.required);
   type= new FormControl("", Validators.required);
   dateCreation= new FormControl("");
   dateDebut= new FormControl("");
   dateFin= new FormControl("");
   datePublication= new FormControl("");

  lg="";

  public users=[];

  public isLoading = true;
public opened= false;
public  openeEditConsigne= false;
public  openedInfo= false;
public    consigne:any;
public listeTypeUser=['SimpelUser','SuperAdmin','Admin','Agent'];
public  listeEtatUser=['Actif','Inactif'];

  public alertsSuccess=false;
  public alertsSuccessMsg="";
  public alertsDanger=false;
  public alertsDangerMsg="";

  datexxxxx= new Date();

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
  listeConsigneJour:any;

  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder, private translate: TranslateService) {

    this.userActuelle= JSON.parse(localStorage.getItem('User'));
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    if((localStorage.getItem('longageSite')=="fr")||(localStorage.getItem('longageSite')=="en")){
      translate.use(localStorage.getItem('longageSite'));
    }else{
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }



  }

  ngOnInit() {

    this.getListeConsigesJour();
    this.getListeAgentSite();

    this.addConsigneForm = this.formBuilder.group({
      idSite:this.idSite,
      type: this.type,
      dateCreation: this.dateCreation,
      datePublication:this.datePublication,
      dateDebut:this.dateDebut,
      dateFin:this.dateFin,
      etat: this.etat,
      remarque:this.remarque,
      idClient:this.idClient,
      client:this.client


    });


    this.addConsigneTestForm = this.formBuilder.group({
      idSite:this.idSite,
      ttype: this.ttype,
      tdateCreation: this.tdateCreation,
      tdatePublication:this.tdatePublication,
      tdateDebut:this.tdateDebut,
      tdateFin:this.tdateFin,
      tetat: this.tetat,
      tremarque:this.tremarque,
      idClient:this.idClient,
      client:this.client


    });

    this.editConsigneForm = this.formBuilder.group({
      idSite:this.idSite,
      type: this.type,
      dateCreation: this.dateCreation,
      datePublication:this.datePublication,
      dateDebut:this.dateDebut,
      dateFin:this.dateFin,
      etat: this.etat,
      remarque:this.remarque,
      idClient:this.idClient,
      client:this.client


    });

    this.socket.on('mjrConsige'+this.userActuelle.site._id, function(data) {
      this.getMajListeConsigesJour();

    }.bind(this));


  }


  zones:any;
  actionAdd(){

    this.datexxxxx= new Date();
    this.consignes=[];
    this.newRonde=null;
    this.isListeNewrondeAdd=false;

    this.isAdd=true;
    this.isListe=false;

  }


  openedEditConsigne(consig){
    this.consigne=consig;
    this.consigne.datePublication=consig.datePublication.slice( 0, 10 );
    this.consigne.dateDebut=consig.dateDebut.slice( 0, 10 );
    this.consigne.dateFin=consig.dateFin.slice( 0, 10 );
    this.openeEditConsigne= true;
    this.openedInfo= false;
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
    console.log( this.consigne);


  }

  editConsigne(consigne){

    if(consigne.type=="Permanentes"){
      consigne.dateFin="2020-01-01T00:00:00.813Z";
      consigne.dateDebut="2017-01-01T00:00:00.813Z";

    }

    this.dataService.editConsigne(consigne).subscribe(
      res => {
        this.consigne = consigne;
        console.log(consigne);
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


  actionAnnule(){
    this.openeEditConsigne= false;
    this.openedInfo= false;
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
  }

  getListeConsigesJour(){
    this.dataService.getBanqueValide().subscribe(

      data =>{
        this.listeConsigneJour = data;
        console.log("listeConsigneJour:");
        console.log(data);
        $.getScript('../../../assets/public/js/scripthba.js');

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }

  getMajListeConsigesJour(){
    this.dataService.getConsigneByIdSiteJour(this.userActuelle.site).subscribe(

      data =>{
        this.listeConsigneJour = data;
        console.log("listeConsigneJour:");
        console.log(data);
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }


  getUsers() {


console.log("getUsersAgentsByAgence="+this.userActuelle.idAgence);
    this.dataService.getUsersAgentsByAgence(this.userActuelle.idAgence).subscribe(

      data => this.users = data,

      error => console.log(error),
      () => this.isLoading = false
    );

  }
  consignes=[];
  newRonde:any;
  isListeNewrondeAdd=false;

  addConsigne(){


   this.addConsigneTestForm.value.dateCreation=new Date().getTime();
    this.addConsigneTestForm.value.datePublication=new Date().getTime();
   this.addConsigneTestForm.value.idSite=this.userActuelle.site._id;
    this.addConsigneTestForm.value.idClient= this.userActuelle._id;
    this.addConsigneTestForm.value.client= this.userActuelle;
    this.addConsigneTestForm.value.dateFin=this.addConsigneTestForm.value.tdateFin;
    this.addConsigneTestForm.value.dateDebut=this.addConsigneTestForm.value.tdateDebut;
    this.addConsigneTestForm.value.remarque=this.addConsigneTestForm.value.tremarque;
    this.addConsigneTestForm.value.type=this.addConsigneTestForm.value.ttype;
    this.addConsigneTestForm.value.etat=this.addConsigneTestForm.value.tetat;
    if(this.addConsigneTestForm.value.ttype=="Permanentes"){
      this.addConsigneTestForm.value.dateFin="2020-01-01T00:00:00.813Z";
      this.addConsigneTestForm.value.dateDebut="2017-01-01T00:00:00.813Z";

    }


    if(this.addConsigneTestForm.value.tdateDebut>this.addConsigneTestForm.value.tdateFin){
      this.alertsDanger=true;
      this.alertsDangerMsg = "Vérifier date et heure";
    }
    else{
      var datesysteme=new Date();
      datesysteme.setHours(datesysteme.getHours()+0);
      console.log("------------**********----------------");
      console.log(this.addConsigneTestForm.value.tdateDebut);
      console.log(datesysteme);
      console.log("------------**********----------------");
      console.log(datesysteme<this.addConsigneTestForm.value.tdateDebut);

      if(datesysteme<this.addConsigneTestForm.value.tdateDebut){
        console.log("erreur date event!!!!!");
        this.alertsDanger = true;
        this.alertsDangerMsg = "Vérifier date et heure";
      }else{
        this.dataService.addConsigne(this.addConsigneTestForm.value).subscribe(
          res => {
            var newRondeService = res.json();
            this.addAlertsConsigne(newRondeService);
            this.newRonde=newRondeService;
            this.consignes.push(this.newRonde);
            this.isListeNewrondeAdd=true;
            this.addConsigneTestForm.reset();
            this.alertsSuccess=true;
            this.getMajListeConsigesJour();
            this.alertsSuccessMsg="Opération effectuée avec succès";
            this.socket.emit('addConsigne',this.userActuelle.site._id);

          },
          error => {
            console.log(error);
            this.alertsDanger=true;
            this.alertsDangerMsg="Certains paramètres invalides";
          }

        );

      }




    }





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
          type: "Consigne",
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



  prevEtap(){
    this.getListeConsigesJour();
    this.isAdd=false;
    this.alertsSuccess=false;
    this.isListe=true;
  }

  delateConsigne(rd){


      this.dataService.deleteConsigne(rd).subscribe(
        res => {
          var pos = this.consignes.map(consignes => { return rd._id }).indexOf(rd._id);
          this.consignes.splice(pos, 1);

        },
        error => console.log(error)
      );


  }










}
