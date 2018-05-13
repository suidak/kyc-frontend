import { Component ,OnInit, NgZone, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import {TranslateService} from 'ng2-translate';
import * as io from "socket.io-client";
import {AppSettings} from '../../app.module';


@Component({

  selector: 'infosite-cmp',
  templateUrl: './infosite.html',
  styleUrls: ['./forme.css']
})
export class InfositeComponent implements OnInit  {

  socket=io.connect(AppSettings.URLServeur);


   addEntreForm: FormGroup;
   heure= new FormControl("", Validators.required);
   poste= new FormControl("");
   cheke= new FormControl("");
   chekec= new FormControl("");
  shift= new FormControl("", Validators.required);



  listAgentsSite:any;
  nbrAgentsSite=0;
  listAgentsSitePreson=[];
  isListeAccesEntre=false;
  nbrAgentsSitePreson=0;
  listAgentsSiteAbson=[];
  nbrAgentsSiteAbson=0;

  isLoading = true;
  user:any;
  datexxxxx= new Date();

  postes=[];

  isListeMaterielles=true;
  materielles:any;
  cles:any;
  isListeCles=true;
  isopenMat=false;
  isopenCle=false;
  matrielle:any;

  openresMat(){
    if(this.isopenMat){
      this.isopenMat=false;

      this.isListeMaterielles=false;
      this.getMaterielleNonAffecter();
    }else{
      this.getMaterielleNonAffecter();
      this.isListeMaterielles=true;
      this.isopenMat=true;
      $.getScript('../../../assets/public/js/scripthba.js');
    }

  }

  openrescle(){
    if(this.isopenCle){
      this.isopenCle=false;
    }else{
      this.isListeCles=true;
      this.getClesNonAffecter();
      this.isopenCle=true;
      $.getScript('../../../assets/public/js/scripthba.js');
    }

  }

  getMaterielleNonAffecter() {

    this.dataService.getMaterielleByIdSiteNonAffecter(this.userActuelle.site._id).subscribe(
      data => {
        this.materielles = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  getClesNonAffecter() {


    this.dataService.getClesBysiteNonAffecter(this.userActuelle.site._id).subscribe(

      data => this.cles = data,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  listeMatChec=[];

  checkboxmat(element,flag,i) {


    var materielle=element;
    var materielleJson=element;
    if(flag){

      this.listeMatChec[i]=materielle;

    }else{

      delete  this.listeMatChec[i];

    }


  }

  listeCleChec=[];

  checkboxcle(element,flag,i) {
    var clechec=element;
    var clechecJson=element;
    if(flag){

      this.listeCleChec[i]=clechec;
    }else{

      delete  this.listeCleChec[i];
    }

  }

  getPostes(){

    this.dataService.getPostesagents(this.userActuelle.site._id).subscribe(

      data =>{
        this.postes = data;


      },

      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getListeAgentSite(){

    this.listAgentsSite=null;
    this.nbrAgentsSite=0;
    this.listAgentsSitePreson=[];
    this.nbrAgentsSitePreson=0;
    this.listAgentsSiteAbson=[];
    this.nbrAgentsSiteAbson=0;

    this.dataService.getListeAgentByIdSite(this.userActuelle.site._id).subscribe(
      data => {
        this.listAgentsSite = data;
        this.nbrAgentsSite=this.listAgentsSite.length;
        $.getScript('../../../assets/public/js/scripthba.js');

        var siteAct=this.userActuelle.site._id;
        var listePreson=[];
        var listeAbson=[];
        var nbrrPreson=0;
        var nbrrAbson=0;

        data.forEach(function(element) {

          element.idSite=siteAct;



         this.dataService.getAccesAgentByIdSiteIdAgent(element).subscribe(

            datax =>{


              if(datax.length!=0){


                if(datax[0].type=="Entrée"){
                  element.poste=datax[0].poste;
                  element.shift=datax[0].shift;
                  this.listAgentsSitePreson.push(element);
                  this.listeIdAgentPreson.push(element.Agent._id);
                  this.isListeAccesEntre=true;
                  this.nbrAgentsSitePreson++


                }else{
                  element.poste=datax.poste;
                  element.shift=datax.shift;
                  this.listAgentsSiteAbson.push(element);

                  this.nbrAgentsSiteAbson++;


                };

              }else{

                this.listAgentsSiteAbson.push(element);
                this.nbrAgentsSiteAbson++;


              };

            } ,

            error => console.log(error),
            () => this.isLoading = false
          );

console.log("-------------------------------");
          console.log(this.listAgentsSitePreson);

        }.bind(this));


      },

      error => console.log(error),
      () => this.isLoading = false
    );



  }



  getMAJListeAgentSite(){

    this.listAgentsSite=null;
    this.nbrAgentsSite=0;
    this.listAgentsSitePreson=[];
    this.nbrAgentsSitePreson=0;
    this.listAgentsSiteAbson=[];
    this.listeIdAgentPreson=[];
    this.listeIdAgentAbson=[];

    this.nbrAgentsSiteAbson=0;

    this.dataService.getListeAgentByIdSite(this.userActuelle.site._id).subscribe(
      data => {
        this.listAgentsSite = data;
        console.log("this.listAgentsSite=>");
        console.log(this.listAgentsSite);
        this.nbrAgentsSite=this.listAgentsSite.length;
        var siteAct=this.userActuelle.site._id;
        var listePreson=[];
        var listeAbson=[];
        var nbrrPreson=0;
        var nbrrAbson=0;

        data.forEach(function(element) {

          element.idSite=siteAct;

          this.dataService.getAccesAgentByIdSiteIdAgent(element).subscribe(

            datax =>{


              if(datax.length!=0){


                if(datax[0].type=="Entrée"){
                  element.poste=datax[0].poste;
                  if(!this.in_array(element.Agent._id,this.listeIdAgentPreson)){
                    this.listAgentsSitePreson.push(element);
                    this.listeIdAgentPreson.push(element.Agent._id);
                    this.nbrAgentsSitePreson++;
                  }


                  this.isListeAccesEntre=true;

                  console.log("this.listAgentsSitePreson=>");
                  console.log(this.listAgentsSitePreson);
                  console.log("this.listeIdAgentPreson=>");
                  console.log(this.listeIdAgentPreson);
                  console.log("this.nbrAgentsSitePreson=>");
                  console.log(this.nbrAgentsSitePreson);


                }
                else{
                  element.poste=datax.poste;

                  if(!this.in_array(element.Agent._id,this.listeIdAgentAbson)){
                    this.listAgentsSiteAbson.push(element);
                    this.listeIdAgentAbson.push(element.Agent._id);
                    this.nbrAgentsSiteAbson++;
                  }





                  console.log("this.nbrAgentsSiteAbson=>");
                  console.log(this.nbrAgentsSiteAbson);


                };

              }else{

                if(!this.in_array(element.Agent._id,this.listeIdAgentAbson)){
                  this.listAgentsSiteAbson.push(element);
                  this.listeIdAgentAbson.push(element.Agent._id);
                  this.nbrAgentsSiteAbson++;
                }
                console.log("this.listAgentsSiteAbson=>");
                console.log(this.listAgentsSiteAbson);


              };

            } ,

            error => console.log(error),
            () => this.isLoading = false
          );




        }.bind(this));


      },

      error => console.log(error),
      () => this.isLoading = false
    );



  }

  actionEntreAgent(agent){
    this.getPostes();
    this.getMaterielleNonAffecter();
    this.datexxxxx= new Date();
    this.user=agent;
    this.isAddEntre=true;

}

  addAccesMat(){

    var acc=this.newAcces;
    var user =this.userActuelle;
    var Service= this.dataService;

    this.listeMatChec.forEach(function(element) {
      element.dateReservation=new Date().getTime();
      element.userRs=acc;
      element.userRs.type='Agent';
      element.etat="Reserver";

      Service.editMaterielle(element).subscribe(
        res => {

          var objectSave = {
            idAcces: acc._id,
            idObjet: element._id,
            idSite:user.site._id,
            acces:acc,
            typeAcces:"Agent",
            dateReservation: new Date().getTime(),
            dateLivreson: null,
            type: "Materielle",
            objetType:element,
            etat:"In",
          };
          Service.addhistoriquereservations(objectSave).subscribe(
            res => {



            },
            error =>{console.log(error);}
          );


        },
        error =>{console.log(error);}
      );




    });
    this.socket.emit('addAccesAgent',this.userActuelle.site._id);

  }

  addAccesCle(){

    var acc=this.newAcces;
    var user =this.userActuelle;
    var Service= this.dataService;

    this.listeCleChec.forEach(function(element) {
      element.dateReservation=new Date().getTime();
      element.userRs=acc;
      element.userRs.type='Agent';
      element.etat="Reserver";



      Service.editCle(element).subscribe(
        res => {

          var objectSave = {
            idAcces:acc._id,
            idObjet: element._id,
            idSite:user.site._id,
            acces:acc,
            typeAcces:"Agent",
            dateReservation: new Date().getTime(),
            dateLivreson: null,
            type: "Cle",
            objetType:element,
            etat:"In",
          };
          Service.addhistoriquereservations(objectSave).subscribe(
            res => {



            },
            error =>{console.log(error);}
          );


        },
        error =>{console.log(error);}
      );






    });
    this.socket.emit('addAccesAgent',this.userActuelle.site._id);


  }

  newAcces:any;

  addEntreAgent(agent){
    var acceAgent={
      type: "Entrée",
      date: new Date().getTime(),
      heure:this.addEntreForm.value.heure,
      poste:this.addEntreForm.value.poste,
      etat: "Entrée",
      agent: agent,
      idAgent: agent._id,
      idSite:this.userActuelle.site._id,
      idShift:this.addEntreForm.value.shift._id,
      shift:this.addEntreForm.value.shift

    }

    this.dataService.addAccesagents(acceAgent).subscribe(
      res => {
        var acceAgent = res.json();
        this.newAcces=acceAgent;
        this.addEntreForm.reset();
        this.getMAJListeAgentSite();
        this.isAddEntre=false;
        this.poste=null;
        this.addAccesMat();
        this.addAccesCle();
        this.dataService.gethoriquereservationsAgentByIdSite(this.userActuelle.site).subscribe(

          data =>{

            console.log("getHoriquereservationsInBySite:");
            console.log(data);
            this.activitesCle = data;

            var xcleEntre=0;
            var xcleSortie=0;


            var xmatEntre=0;
            var xmatSortie=0;

            data.forEach(function(element) {

              if(element.type=="Cle"){
                xcleEntre++;

                if(element.etat!="In"){

                  xcleSortie++;

                }

              }else{
                xmatEntre++;


                if(element.etat!="In"){

                  xmatSortie++;

                }
              }


            });

            this.cleEntre=xcleEntre;
            this.cleSortie=xcleSortie;
            this.matEntre=xmatEntre;
            this.matSortie=xmatSortie;
            this.socket.emit('addAccesAgent',this.userActuelle.site._id);

          } ,

          error => console.log(error),
          () => this.isLoading = false
        );



      },
      error => {
        console.log(error);

      }

    );



  }

  validationActionEntreAgent(agent){

    var acceAgent={
      type: "Entrée",
      date: new Date().getTime(),
      etat: "Entrée",
      agent: agent,
      idAgent: agent._id,
      idSite:this.userActuelle.site._id,

    }

    this.dataService.addAccesagents(acceAgent).subscribe(
      res => {
        var acceAgent = res.json();
        this.getMAJListeAgentSite();

      },
      error => {
        console.log(error);

      }

    );



  }

  listeIdAgentPreson=[];
  listeIdAgentAbson=[]
  activitesEntre:any;
  getAccesEntres(){

    this.dataService.getAccesAgentsByIdSiteJourEntres(this.userActuelle.site).subscribe(

      data =>{
        this.activitesEntre = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );


  }
  actionSorty(){
    this.getAccesEntres();
    $.getScript('../../../assets/public/js/scripthba.js');

  }

  accesEntreActuelle:any;
  listesMaterellesEntre:any;
  isListeMaterelleEntre=false;
  validationVisiteurSorti=false;
  alertsSuccessMsg="";
  accesSorty(acces){

    this.dataService.getAccesAgentsByIdSiteIdAgentEntres(this.userActuelle.site,acces.Agent._id).subscribe(

      data =>{
        this.activitesEntre = data;
        console.log("this.accesEntreActuelle:");
        console.log(data);
        this.accesEntreActuelle=data[0];
        console.log("this.accesEntreActuelle:");
        console.log(this.accesEntreActuelle);
        this.dataService.getHoriquereservationsByIdEtatIn(this.accesEntreActuelle).subscribe(

          data =>{

            console.log("gethoriquereservationsById");
            console.log(data);

            if(data.length!=0){
              this.listesMaterellesEntre=data;
              this.isListeAccesEntre=false;
              this.isListeMaterelleEntre=true;



            }else{
              this.actionSortiAgent(this.accesEntreActuelle);

              this.alertsSuccessMsg="Opération effectuée avec succès";
            }

          } ,

          error => console.log(error),
          () => this.isLoading = false
        );
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );






  }

  actionSortiAgent(acce){


    var datSystem=new Date().getTime();
    var d = new Date();
    var h = this.addZero(d.getHours());
    var m = this.addZero(d.getMinutes());

    var acceAgent={
      type: "Sortie",
      date: d,
      heure:h + ":" + m ,
      poste:acce.poste,
      idShift:acce.idShift,
      shift:acce.shift,
      etat: "Sortie",
      agent: acce.agent,
      idAgent: acce.agent._id,
      idSite:this.userActuelle.site._id,


    }

    this.dataService.addAccesagents(acceAgent).subscribe(
      res => {
        var acceAgent = res.json();
        this.getMAJListeAgentSite();
        this.validationVisiteurSorti=false;
        this.socket.emit('addAccesAgent',this.userActuelle.site._id);
      },
      error => {
        console.log(error);

      }

    );



  }


  addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

  accesMaterilleSorty(acceMat){

    var historiqueMat=acceMat;



    historiqueMat.etat="Out";
    historiqueMat.dateLivreson= new Date().getTime();


    this.dataService.editHoriquereservations(historiqueMat).subscribe(
      res => {

        var materielleh=historiqueMat.objetType;

        materielleh.etat="Actif"

        if(historiqueMat.type=="Cle"){
          this.dataService.editCle(materielleh).subscribe(
            res => {

              var pos = this.listesMaterellesEntre.map(listesMaterellesEntre => { return historiqueMat._id }).indexOf(historiqueMat._id);
              this.listesMaterellesEntre.splice(pos, 1);

              if(this.listesMaterellesEntre.length==0){
                this.isListeMaterelleEntre=false;
                this.validationVisiteurSorti=true;
              }
            },
            error =>{console.log(error);}
          );
        }else{
          this.dataService.editMaterielle(materielleh).subscribe(
            res => {

              var pos = this.listesMaterellesEntre.map(listesMaterellesEntre => { return historiqueMat._id }).indexOf(historiqueMat._id);
              this.listesMaterellesEntre.splice(pos, 1);

              if(this.listesMaterellesEntre.length==0){
                this.isListeMaterelleEntre=false;
                this.validationVisiteurSorti=true;
              }
            },
            error =>{console.log(error);}
          );

        }





      },
      error =>{console.log(error);}
    );


  }


  activites:any;
 AgentEntre:Number=0;
  AgentrSortie:Number=0;
  updateActivite(){

    this.dataService.getAccesAgentsByIdSite(this.userActuelle.site).subscribe(

      data =>{
        console.log("getAccesAgentsByIdSite:");
        console.log(data);
        this.activites = data;
        var xAgentEntre=0;
        var xAgentrSortie=0;

        data.forEach(function(element) {
          if(element.etat=="Sortie"){

            xAgentrSortie++;
          }else{
            xAgentEntre++;
          }


        });

        this.AgentEntre=xAgentEntre;
        this.AgentrSortie=xAgentrSortie;


      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

    var ressss=JSON.stringify(this.activites);

  }

  activitesCle:any;


cleEntre:Number=0;
 cleSortie:Number=0;
  matEntre:Number=0;
   matSortie:Number=0;

  updateActiviteCles(){

   /* this.dataService.gethoriquereservationsAgentByIdSiteJour(this.userActuelle.site).subscribe(*/
      this.dataService.gethoriquereservationsAgentByIdSite(this.userActuelle.site).subscribe(

      data =>{

        console.log("getHoriquereservationsInBySite:");
        console.log(data);
        this.activitesCle = data;

        var xcleEntre=0;
        var xcleSortie=0;


        var xmatEntre=0;
        var xmatSortie=0;

        data.forEach(function(element) {

          if(element.type=="Cle"){
            xcleEntre++;

            if(element.etat!="In"){

              xcleSortie++;

            }

          }else{
            xmatEntre++;


            if(element.etat!="In"){

              xmatSortie++;

            }
          }


        });



        this.cleEntre=xcleEntre;
        this.cleSortie=xcleSortie;
        this.matEntre=xmatEntre;
        this.matSortie=xmatSortie;


      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  miseAjourActivity(){
    this.updateActivite();
    this.updateActiviteCles();

  }

  materiellesAcces=[];
  getMateriellesAcces(etat,type,typeUser) {



   /* this.dataService.gethoriquereservationsByIdSiteJourEtatTypeTypeUser(this.userActuelle.site,etat,type,typeUser).subscribe(*/
      this.dataService.gethoriquereservationsByIdSiteEtatTypeTypeUser(this.userActuelle.site,etat,type,typeUser).subscribe(

      data =>{


        this.materiellesAcces = data;

      },

      error => console.log(error),
      () => this.isLoading = false
    );

  }


  activitesAcces=[];

  getactivitesAccesEtatType(type,etat){

    this.dataService.getAccesAgentByIdSiteEtatType(this.userActuelle.site,etat,etat).subscribe(

      data =>{
        this.activitesAcces = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }


  ngOnInit() {

    this.getListeAgentSite();
    this.miseAjourActivity();
    this.getShifts(this.userActuelle.site);
    this.getSiteActuelle(this.userActuelle.site._id);
    $.getScript('../../../assets/public/js/scripthba.js');



    this.socket.on('mjrAccesAgent'+this.userActuelle.site._id, function(data) {
      this.getMAJListeAgentSite();
      this.miseAjourActivity();

    }.bind(this));



    this.addEntreForm = this.formBuilder.group({

      heure: this.heure,
      poste: this.poste,
      cheke:this.cheke,
      chekec:this.chekec,
      shift:this.shift,


    });


  }


  Listshifts=[];
  getShifts(site){

    console.log("newSite:"+site._id);


    this.dataService.getShifts(site).subscribe(

      data =>{
        this.Listshifts = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }



  siteActuelle:any;
  getSiteActuelle(id){
    this.dataService. getSitesById(id).subscribe(

      data =>{

        this.siteActuelle = data;


      },

      error => console.log(error),
      () => this.isLoading = false
    );
  }


isAddEntre=false;
  openAgentSiteAbson(){
    this.isAddEntre=false;

  }


  userActuelle:any;
  lg="";
  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder, private translate: TranslateService) {

    this.userActuelle= JSON.parse(localStorage.getItem('User'));



    translate.addLangs(["en", "fr"]);
    if(localStorage.getItem('longageSite')=="fr"){
      translate.setDefaultLang('fr');
    }else{
      translate.setDefaultLang('en');
    }


    this.lg=translate.getBrowserLang();

    let browserLang = translate.getBrowserLang();
    if((localStorage.getItem('longageSite')=="fr")||(localStorage.getItem('longageSite')=="en")){
      translate.use(localStorage.getItem('longageSite'));
    }else{
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

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

infoBatcheAgent:any;
  infoBadgeAgent(agent){


    this.dataService.getUsersByid(agent._id).subscribe(

      data =>{
        this.infoBatcheAgent = data[0];

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );


}



  printBadge(printpage: string){
    let popupWinindow
    let innerContents = document.getElementById(printpage).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }



  alertsSuccess=false;
  alertsDanger=false;
  openAccecEntre(){
    this.listeMatChec=[];
    this.listeCleChec=[];
    this.isopenMat=false;
    this.isopenCle=false;
    this.alertsSuccess=false;
    this.alertsDanger=false;
    this.addEntreForm.reset();
    this.poste=null;
    this.isModifAcces=false;
    this.historiqueAccesCleModif=[];
    this.historiqueAccesMatModif=[];
    this.isopenMatEdit=false;
    this.isListeMateriellesEdit=false;
    this.isopenCleEdit=false;
    this.isListeClesEdit=false;

  }



  isModifAcces=false;
  accesModif:any;
  historiqueAccesModif:any;
  historiqueAccesCleModif=[];
  historiqueAccesMatModif=[];

  closeEditAccesAgent(){
    this.isModifAcces=false;
    this.accesModif=null;
    this.historiqueAccesMatModif=[];
    this.historiqueAccesCleModif=[];

  }
  openedEditAcces(AgentPreson){

    console.log(AgentPreson);

    var acces:any;

    this.dataService.getAccesAgentByIdSiteJourIdAgentEtatIn(this.userActuelle.site._id,AgentPreson.idAgent).subscribe(

      data =>{
        acces = data;
        console.log(acces);
        this.isModifAcces=true;
        this.accesModif=acces;
        this.getMaterielleNonAffecter();
        this.getClesNonAffecter();
        console.log("Cles");
        console.log(this.cles);
        this.dataService.gethoriquereservationsById(acces).subscribe(

          data =>{
            this.historiqueAccesModif=data;
            console.log("data acces");
            console.log(data);
            if(data.length!=0){
              var listMat=[];
              var listCle=[];
              data.forEach(function(element) {
                if(element.etat=="In"){

                  if(element.type=="Cle"){
                    listCle.push(element.objetType._id);
                    this.cles.push(element.objetType);

                  }

                  if(element.type=="Materielle"){
                    listMat.push(element.objetType._id);
                    this.materielles.push(element.objetType);

                  }

                }


              }.bind(this));
              this.historiqueAccesMatModif=listMat;
              this.historiqueAccesCleModif=listCle;

              console.log("data acces mat");
              console.log( this.historiqueAccesMatModif);
              console.log("data acces cle");
              console.log( this.historiqueAccesCleModif);


            }else{
              console.log("data acces 0 ");
              console.log(data);
            }

          } ,

          error => console.log(error),
          () => this.isLoading = false
        );

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );






  }

  isopenMatEdit=false;
  isListeMateriellesEdit=false;

  openresMatEdit(){
    if(this.isopenMatEdit){
      this.isopenMatEdit=false;
      this.isListeMateriellesEdit=false;

    }else{

      this.isListeMateriellesEdit=true;
      this.isopenMatEdit=true;

    }

  }

  isopenCleEdit=false;
  isListeClesEdit=false;

  openrescleEdit(){
    if(this.isopenCleEdit){
      this.isopenCleEdit=false;
    }else{
      this.isListeClesEdit=true;
      this.isopenCleEdit=true;

    }

  }


  checkboxmatEdit(element,acces,flag,i) {


    console.log("element");
    console.log(element);
    console.log("acces");
    console.log(acces);


    var materielle=element;
    var materielleJson=element;
    if(flag){
      materielle.dateReservation=new Date().getTime();
      materielle.userRs=acces;
      materielle.etat="Reserver";
      this.dataService.editMaterielle(materielle).subscribe(
        res => {

          var objectSave = {
            idAcces: acces._id,
            idObjet: materielle._id,
            idSite:this.userActuelle.site._id,
            acces:acces,
            typeAcces:acces.type,
            dateReservation: new Date().getTime(),
            dateLivreson: null,
            type: "Materielle",
            objetType:materielle,
            etat:"In",
          };
          this.dataService.addhistoriquereservations(objectSave).subscribe(
            res => {

              this.socket.emit('addAcces',this.userActuelle.site._id);

            },
            error =>{console.log(error);}
          );


        },
        error =>{console.log(error);}
      );

      console.log("flag");

    }else{

      materielle.etat="Actif";
      var oldAcces:any;

      this.dataService.gethoriquereservationsByIdSiteJourIdResIdMat(this.userActuelle.site,acces._id,materielle._id).subscribe(
        data => {
          oldAcces=data[0];
          console.log("oldAcces");
          console.log(oldAcces);

          this.dataService.editMaterielle(materielle).subscribe(
            res => {

              oldAcces.etat="Out";
              oldAcces.dateLivreson=new Date().getTime();
              this.dataService.editHoriquereservations(oldAcces).subscribe(
                res => {

                  this.socket.emit('addAcces',this.userActuelle.site._id);

                },
                error =>{console.log(error);}
              );


            },
            error =>{console.log(error);}
          );

        },
        error =>{console.log(error);}
      );








      console.log("No flag");


    }


  }



  checkboxCleEdit(element,acces,flag,i)  {


    console.log("element");
    console.log(element);
    console.log("acces");
    console.log(acces);


    var materielle=element;
    var materielleJson=element;
    if(flag){
      materielle.dateReservation=new Date().getTime();
      materielle.userRs=acces;
      materielle.etat="Reserver";
      this.dataService.editCle(materielle).subscribe(
        res => {

          var objectSave = {
            idAcces: acces._id,
            idObjet: materielle._id,
            idSite:this.userActuelle.site._id,
            acces:acces,
            typeAcces:acces.type,
            dateReservation: new Date().getTime(),
            dateLivreson: null,
            type: "Cle",
            objetType:materielle,
            etat:"In",
          };
          this.dataService.addhistoriquereservations(objectSave).subscribe(
            res => {

              this.socket.emit('addAcces',this.userActuelle.site._id);

            },
            error =>{console.log(error);}
          );


        },
        error =>{console.log(error);}
      );

      console.log("flag");

    }else{

      materielle.etat="Actif";
      var oldAcces:any;

      this.dataService.gethoriquereservationsByIdSiteJourIdResIdMat(this.userActuelle.site,acces._id,materielle._id).subscribe(
        data => {
          oldAcces=data[0];
          console.log("oldAcces");
          console.log(oldAcces);

          this.dataService.editCle(materielle).subscribe(
            res => {

              oldAcces.etat="Out";
              oldAcces.dateLivreson=new Date().getTime();
              this.dataService.editHoriquereservations(oldAcces).subscribe(
                res => {

                  this.socket.emit('addAcces',this.userActuelle.site._id);

                },
                error =>{console.log(error);}
              );


            },
            error =>{console.log(error);}
          );

        },
        error =>{console.log(error);}
      );








      console.log("No flag");


    }


  }


}
