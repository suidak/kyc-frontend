import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Site } from '../../models/site.interface';
import {TranslateService} from 'ng2-translate';


@Component({

  selector: 'home-cmp',

  templateUrl: 'colis.component.html',
  styleUrls: ['./forme.css']
})

export class ColisComponent implements OnInit {

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.nom} ${data.prenom}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  public site: Site;

  submitted = false;


  editDemandeForm: FormGroup;


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




  lg="";


  listeTypeIncident=[];


  sites=[];
  Demandes=[];
  Demande  :any;
  private client=[];
  private isLoading = true;
  public opened= false;

  public  openedInfo= false;

  public listeTypeUser=['SimpelUser','SuperAdmin','Admin','Agent'];
  public  listeEtatUser=['Actif','Inactif'];
  public  listeEtatDemandes=['Livrer','Non livrer'];

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



  userActuelle:any;

  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder,
              private translate: TranslateService,private _sanitizer: DomSanitizer) {

    this.userActuelle= JSON.parse(localStorage.getItem('User'));
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');


    let browserLang = translate.getBrowserLang();
    if((localStorage.getItem('longageSite')=="fr")||(localStorage.getItem('longageSite')=="en")){
      translate.use(localStorage.getItem('longageSite'));
    }else{
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    if(this.userActuelle.site.type.incidents.length>0){

      var inss=[];
      this.userActuelle.site.type.incidents.forEach(function(element) {

        inss.push(element.name);

      });
      this.listeTypeIncident=inss;

      console.log("this.listeTypeIncident :");
      console.log( this.listeTypeIncident);

    };



  }


  datexxxxx= new Date();
  actionAdd(){
    this.isAdd=true;
    this.isListe=false;
    this.datexxxxx= new Date();

  }

demandes:any;
  getDemande() {


    this.dataService.getBanqueDemande().subscribe(

      data =>{
        this.demandes = data;
        console.log("----------------demande---------");
        console.log(this.demandes)
        $.getScript('../../../assets/public/js/scripthba.js');
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  listePermanons=[];
  getListePermanents() {

    this.dataService.getUsersPermanentsActifBySite(this.userActuelle.site._id).subscribe(

      data =>{
        this.listePermanons = data;
        console.log("listePermanons=");
        console.log(this.listePermanons);

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  ngOnInit() {


    this.getDemande();


    this.getListePermanents();

    this.editDemandeForm = this.formBuilder.group({
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


  listeIncidents=[];
  appelMethode(newValue){
    console.log("---------------------->");
    console.log(newValue);
    this.listeIncidents=newValue.type.incidents;

  }


  actionValider(demande){
    var object={
      "name":demande.identity,
      "certificateInc":demande.certificate,
      "license":demande.Licence,
      "headquarter":demande.Adresse,
      "email":demande.email,
      "phoneNumber":demande.tel,
      "constitutionDate":demande.dateConstitution
    };
    var demandeEdit=demande;

    this.dataService.addCompteKYS(object).subscribe(
      res => {
        this.Demande = res;
        demandeEdit.etat="Valide";
        demandeEdit.key=res.key;
        console.log("------------------------------------");
        console.log(demandeEdit);
        console.log("------------------------------------");
        this.editDemande(demandeEdit);

        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès , key :"+res.key;
      },
      error =>{
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
        console.log(error);
      }
    );


  }



  editDemande(demande) {
    console.log(demande);
    console.log("this.editDemandeForm.value:");
    console.log(this.editDemandeForm.value);

    this.dataService.editBanque(demande).subscribe(
      res => {
        this.Demande = demande;
        console.log(demande);
        this.editDemandeForm.reset();
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

    this.getDemande();
    this.isAdd=false;
    this.isListe=true;
    this.openeEditDemande= false;
    this.alertsSuccess=false;

    this.editDemandeForm.reset();
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
  }


  public closeEditDemande() {
    this.openeEditDemande = false;
    this.isListe= false;
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
  }
  demande:any;
  demandeEdite:any;
  openeEditDemande=false;
  public openedEditDemande(demande) {
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";

    this.demande = demande;
    this.demandeEdite = demande;

    this.datexxxxx= new Date();

    this.openeEditDemande = true;
    this.isListe= false;

  }

  public closeInfoUser() {
    this.openedInfo = false;

  }

  public openedInfoDemande(demande) {
    this.demande = demande;
    this.openedInfo = true;




  }


  listIncidentsSelectEdit=[];
  listeIncidentChec=[];
  checkboxActions(element,flag,i) {

    console.log("index:");
    console.log(i);
    var materielle=element;
    var materielleJson=element;
    if(flag){

      this.listeIncidentChec[i]=materielle;

    }else{

      delete  this.listeIncidentChec[i];

    }
    console.log('this.listeIncidentChec');
    console.log(this.listeIncidentChec);

  }



  checkboxActionsEdit(element,flag,i) {
    if(flag){

      this.listIncidentsSelectEdit.push(element);

    }else{

      var listIdSelect=[];
      var listObjectSelect=[];
      var object=element;

      this.listIncidentsSelectEdit.forEach(function(incident) {

        if(object!=incident){
          listIdSelect.push(incident);
          listObjectSelect.push(incident);
        }


      });

      this.listIncidentsSelectEdit=listIdSelect;
    };



  }

  generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
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

}
