import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Site }    from '../../models/site.interface';
import {TranslateService} from 'ng2-translate';
import { NgUploaderOptions} from 'ngx-uploader';
import {AppSettings} from '../../app.module';
import * as io from "socket.io-client";


@Component({

	selector: 'ronde-cmp',

	templateUrl: 'ronde.component.html',
  styleUrls: ['./forme.css']
})


export class RondeComponent implements OnInit {

  socket=io.connect(AppSettings.URLServeur);

  public site: Site;
  submitted = false;
  datexxxxx= new Date();

  public listeTypeRonde=['Safety','Exterieure','Interieure','Ouverture','Fermeture','Option'];

  addRondeForm: FormGroup;

  idSite= new FormControl("");
  type= new FormControl("", Validators.required);
  dateCreation= new FormControl("");
  date= new FormControl("",Validators.required);
  debut= new FormControl("");
  fin= new FormControl("");
  element= new FormControl("");

  etat= new FormControl("");
  remarque= new FormControl("");
  idAgent= new FormControl("");
  agent= new FormControl("",Validators.required);
  idEmplacement= new FormControl("");
  emplacement= new FormControl("",Validators.required);
  userCreate= new FormControl("");



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



  public isAdd=false;
  public isListe=true;

  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  sizeLimit: number = 91000000; // 1MB
  errorMessage: string;
  fileIsUpload=false;
  nameFileUpload="";
  userActuelle:any;
  listeRondeJour:any;

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


this.getListeAgentSite();
    this.getListeZones();


  }



  listAgentsSite:any;
  zones:any;
  actionAdd(){

    this.getListeAgentSite();
    this.getListeZones();
    this.typeSelect=""
    this.zoneSelect=""
    this.rondes=[];
    this.newRonde=null;
    this.isListeNewrondeAdd=false;

    this.isAdd=true;
    this.isListe=false;
    this.listeElement=[];
    this.listeActions=[];
    this.listeActionChec=[];
    this.listeElementInput=[];

  }



  typeSelect="";
  appelMethodeType(event){
    this.typeSelect=event;
    console.log("this.typeSelect===>");
    console.log(this.typeSelect);
    this.getElementRonde();

  }

  zoneSelect:any;
  appelMethodeZone(event){
    this.zoneSelect=event;
    console.log("this.zoneSelect===>");
    console.log(this.zoneSelect);
    this.getElementRonde();
  }

  listeElement=[];
  listeActions=[];

  getElementRonde(){
    this.listeElement =[];
    this.listeActions =[];
    var data;
    if((this.typeSelect!="")&&(this.zoneSelect)){
      console.log("this.getElementRonde===>");
      this.dataService.getActionsElementsrondeByTypeAndZone(this.userActuelle.site._id,this.typeSelect,this.zoneSelect.name).subscribe(
        response => {
          console.log(" elements===>");
          console.log(response.json());
          if(response.json()){
            data=response.json();
            console.log(data.elements);
            console.log( data);

            this.listeElement = data.elements;
            this.listeActions = data.actions;
            console.log(" data.actions=");
            console.log( data.actions);
            console.log("data.elements=");
            console.log(data.elements);

          }else{
            this.listeElement =[];
            this.listeActions =[];
          }

        },
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

  listeElementInput=[];
  onSearchChange(element,flag,i){

    console.log('element=>');
    console.log(element);
    console.log('flag=>');
    console.log(flag);
    console.log('I=>');
    console.log(i);

    if(element!=""){
      console.log('element pas vide=>');
      this.listeElementInput[i]={"name":flag,'val':element};
      console.log('table element');
      console.log( this.listeElementInput);

    }else{
      delete   this.listeElementInput[i];
      console.log('element  vide=>');
      console.log('table element');
      console.log( this.listeElementInput);
    };


  }


  getListeAgentSite(){
    this.dataService.getListeAgentByIdSite(this.userActuelle.site._id).subscribe(
      data => {
        this.listAgentsSite = data;
        console.log("listAgentsSite=");
        console.log(this.listAgentsSite);
      },
      error => console.log(error),
      () => this.isLoading = false
    );

  }

  getListeZones(){

    this.dataService.getZones(this.userActuelle.site).subscribe(

      data =>{
        this.zones = data;
        console.log("zones="+this.zones);
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }


  getListeRondeJour(){


    this.dataService.getRondeByIdSiteJour(this.userActuelle.site).subscribe(

      data =>{
        this.listeRondeJour = data;
        console.log("listeRondeJour:");
        console.log(data);
        $.getScript('../../../assets/public/js/scripthba.js');
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
  rondes=[];
  newRonde:any;
  isListeNewrondeAdd=false;

  addRonde(){

    this.addRondeForm.value.dateCreation=new Date().getTime();
    this.addRondeForm.value.idSite=this.userActuelle.site._id;
    this.addRondeForm.value.etat="En cour";
    this.addRondeForm.value.idAgent= this.addRondeForm.value.agent._id;
    this.addRondeForm.value.agent= this.addRondeForm.value.agent;
    this.addRondeForm.value.idEmplacement= this.addRondeForm.value.emplacement._id;
    this.addRondeForm.value.userCreate=this.userActuelle;
    this.addRondeForm.value.actions=this.listeActionChec;
    this.addRondeForm.value.elements=this.listeElementInput;



    this.addRondeForm.value.dateDebut=new Date(this.addRondeForm.value.date);
    var hours = this.addRondeForm.value.debut.split(":")[0];
    var minutes = this.addRondeForm.value.debut.split(":")[1];
    this.addRondeForm.value.dateDebut.setHours(hours);
    this.addRondeForm.value.dateDebut.setMinutes(minutes);



    var valueDebut = this.addRondeForm.value.debut;
    var resValueDebut = valueDebut.replace(":", "");
    var valueFin = this.addRondeForm.value.fin;
    var resValueFin = valueFin.replace(":", "");
    if(resValueDebut>resValueFin){

      this.addRondeForm.value.dateFin=new Date(this.addRondeForm.value.date);
      var hours = this.addRondeForm.value.fin.split(":")[0];
      var minutes = this.addRondeForm.value.fin.split(":")[1];
      this.addRondeForm.value.dateFin.setHours(hours);
      this.addRondeForm.value.dateFin.setMinutes(minutes);
      this.addRondeForm.value.dateFin.setDate(this.addRondeForm.value.dateFin.getDate()+1);

    }else{
      this.addRondeForm.value.dateFin=new Date(this.addRondeForm.value.date);
      var hours = this.addRondeForm.value.fin.split(":")[0];
      var minutes = this.addRondeForm.value.fin.split(":")[1];
      this.addRondeForm.value.dateFin.setHours(hours);
      this.addRondeForm.value.dateFin.setMinutes(minutes);
    }





    console.log(this.addRondeForm.value);

    this.dataService.addRonde(this.addRondeForm.value).subscribe(
      res => {
        var newRondeService = res.json();
        this.newRonde=newRondeService;
        this.rondes.push(this.newRonde);
        this.isListeNewrondeAdd=true;
        // this.addRondeForm.reset();
        this.addRondeForm.value.debut="";
        this.addRondeForm.value.fin="";
        this.addRondeForm.value.zone=null;
        this.addRondeForm.value.element=null;
        this.addRondeForm.value.emplacement=null;

        this.addRondeForm.value.remarque=null;
        this.listeElement=[];
        this.listeActions=[];
        this.listeActionChec=[];
        this.listeElementInput=[];
        console.log("this.addRondeForm:");
        console.log(this.addRondeForm);
        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès";
        this.socket.emit('addRonde',this.userActuelle.site._id);

      },
      error => {
        console.log(error);
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
      }

    );


  }


  delateRonde(rd){

    this.dataService.deleteRonde(rd).subscribe(
      res => {
        var pos = this.rondes.map(rondes => { return rd._id }).indexOf(rd._id);
        this.rondes.splice(pos, 1);

      },
      error => console.log(error)
    );


  }


  prevEtap(){
    this.getListeRondeJour();
    this.isAdd=false;
    this.alertsSuccess=false;
    this.isListe=true;
    this.listeElement=[];
    this.listeActions=[];
    this.listeActionChec=[];
    this.listeElementInput=[];

  }


  ngOnInit() {
    //this.getClients();



    this.getListeRondeJour();


    this.socket.on('mjrRonde'+this.userActuelle.site._id, function(data) {
      this.getListeRondeJour();

    }.bind(this));


    this.addRondeForm = this.formBuilder.group({
      idSite:this.idSite,
      type: this.type,
      dateCreation: this.dateCreation,
      date: this.date,
      debut:this.debut,
      fin:this.fin,
      element:this.element,

      etat: this.etat,
      remarque:this.remarque,
      idAgent:this.idAgent,
      agent: this.agent,
      idEmplacement:this.idEmplacement,
      emplacement:this.emplacement,
      userCreate:this.userCreate,

    });







  }




}

