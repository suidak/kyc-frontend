 import { Component ,OnInit, NgZone, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import {TranslateService} from 'ng2-translate';
import * as io from "socket.io-client";
import {AppSettings} from '../../app.module';
 import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


@Component({

  selector: 'controlacces-cmp',
  templateUrl: './controlacces.html',
  styleUrls: ['./forme.css']
})
export class ControlaccesComponent implements OnInit  {
  socket=io.connect(AppSettings.URLServeur);



  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.nom} ${data.prenom}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

isPermant=false;
  appelMethode(event){
    console.log("event==============>");
    console.log(event);


    if(event=="Permanent"){
    this.isPermant=true;

    }else{
      this.isPermant=false;
    }





  }


  addAccesForm: FormGroup;

     societe= new FormControl("");
     nom= new FormControl("");
     prenom= new FormControl("");
     motif= new FormControl("");
    emplacement= new FormControl("");
    permisFeu= new FormControl("");
    numPF= new FormControl("");
    numBadge= new FormControl("");
    notifComplement= new FormControl("");
    dateEntre= new FormControl("");
    dateSorti= new FormControl("");
    agent= new FormControl("");
    type= new FormControl("",Validators.required);
    etat= new FormControl("");
    personneVisite= new FormControl("");

     permant= new FormControl("");

   cheke=new FormControl("");
   chekec=new FormControl("");



  public listeTypeUser=['Visiteur','Contactant','Permanent','Réunion'];
   zones=[];

  isListeMaterielles=true;

  materielles:any;
  cles:any;
  isListeCles=true;
  private isLoading = true;
  etap=1;
  etap1=false;
  classE1="active";
  newSite:any;
  newZone:any;
  newCle:any;
  newContact:any;
  etap2=false;
  classE2="";
  etap3=false;
  classE3="";


  isopenMat=false;
  isopenCle=false;

  openresMat(){
    if(this.isopenMat){
      this.isopenMat=false;

      this.isListeMaterielles=false;

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



  nextEtap(etap){


    switch(etap) {
      case 1:
        this.etap=2;
        this.classE2="active";
        this.getMaterielleNonAffecter();
        this.isListeMaterielles=true;
        $.getScript('../../../assets/public/js/scripthba.js');

        break;
      case 2:
        this.etap=3;
        this.classE2="complete";
        this.classE3="active";
        this.isListeCles=true;
        this.getClesNonAffecter();
        $.getScript('../../../assets/public/js/scripthba.js');

        break;
      case 3:
        this.etap=4;
        this.classE3="complete";
        $.getScript('../../../assets/public/js/scripthba.js');


        break;

    }


  }

  prevEtap(etap){


    switch(etap) {
      case 2:
        this.etap=1;

        $.getScript('../../../assets/public/js/scripthba.js');
        break;
      case 3:
        this.etap=2;
        this.getMaterielleNonAffecter();
        this.isListeMaterielles=true;
        $.getScript('../../../assets/public/js/scripthba.js');
        break;


    }


  }

  openAccecEntre(){
    this.listeMatChec=[];
    this.listeCleChec=[];
    this.isopenMat=false;
    this.isopenCle=false;
    this.alertsSuccess=false;
    this.alertsDanger=false;
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


  addAccesMat(){

    var acc=this.newAcces;
    var user =this.userActuelle;
    var Service= this.dataService;

    this.listeMatChec.forEach(function(element) {
      element.dateReservation=new Date().getTime();
      element.userRs=acc;
      element.etat="Reserver";

      Service.editMaterielle(element).subscribe(
        res => {

          var objectSave = {
            idAcces: acc._id,
            idObjet: element._id,
            idSite:user.site._id,
            acces:acc,
            typeAcces:acc.type,
            dateReservation: new Date().getTime(),
            dateLivreson: null,
            type: "Materielle",
            objetType:element,
            etat:"In",
          };
          Service.addhistoriquereservations(objectSave).subscribe(
            res => {

              this.socket.emit('addAcces',this.userActuelle.site._id);

            },
            error =>{console.log(error);}
          );


        },
        error =>{console.log(error);}
      );




    });

  }

  addAccesCle(){

    var acc=this.newAcces;
    var user =this.userActuelle;
    var Service= this.dataService;

    this.listeCleChec.forEach(function(element) {
      element.dateReservation=new Date().getTime();
      element.userRs=acc;
      element.etat="Reserver";



      Service.editCle(element).subscribe(
        res => {

          var objectSave = {
            idAcces:acc._id,
            idObjet: element._id,
            idSite:user.site._id,
            acces:acc,
            typeAcces:acc.type,
            dateReservation: new Date().getTime(),
            dateLivreson: null,
            type: "Cle",
            objetType:element,
            etat:"In",
          };
          Service.addhistoriquereservations(objectSave).subscribe(
            res => {

              this.socket.emit('addAcces',this.userActuelle.site._id);

            },
            error =>{console.log(error);}
          );


        },
        error =>{console.log(error);}
      );






    });


  }


  public alertsSuccess=false;
  public alertsSuccessMsg="";
  public alertsDanger=false;
  public alertsDangerMsg="";
  public newAcces: any;

  addAcces(){

var dateEntree=new Date();
    dateEntree.setHours(dateEntree.getHours()+1);
    this.addAccesForm.value.dateEntre=dateEntree;
    this.addAccesForm.value.agent=this.userActuelle;
    this.addAccesForm.value.idSite=this.userActuelle.site._id;
    this.addAccesForm.value.etat="In";
    if(this.addAccesForm.value.type=="Permanent"){
      this.addAccesForm.value.societe=this.userActuelle.site.name;
      this.addAccesForm.value.nom=this.addAccesForm.value.permant.nom;
      this.addAccesForm.value.prenom=this.addAccesForm.value.permant.prenom;
      this.addAccesForm.value.codeBar=this.addAccesForm.value.permant.codeBar;
      this.addAccesForm.value.photoCodeBar=this.addAccesForm.value.permant.photoCodeBar;
      this.addAccesForm.value.photoCodeBar64=this.addAccesForm.value.permant.photoCodeBar64;



      console.log( "this.userActuelle.site.name===");
      console.log( this.userActuelle.site);

      console.log( "this.addAccesForm.value===");
      console.log( this.addAccesForm.value);
      console.log( "this.addAccesForm.value===");



      this.dataService.addAcces(this.addAccesForm.value).subscribe(
        res => {
          var newAccesService = res.json();
          this.newAcces=newAccesService;
          this.addAccesForm.reset();
          this.alertsSuccess=true;
          this.etap1=true;
          this.classE1="complete";
          this.alertsSuccessMsg="Opération effectuée avec succès";
          this.addAccesMat();
          this.addAccesCle();

          this.socket.emit('addAcces',this.userActuelle.site._id);

        },
        error => {
          console.log(error);
          this.alertsDanger=true;
          this.alertsDangerMsg="Certains paramètres invalides";
        }

      );


    }else{



    if(this.addAccesForm.value.personneVisite){
      this.addAccesForm.value.personneVisiteObject =this.addAccesForm.value.personneVisite;
      this.addAccesForm.value.personneVisite =this.addAccesForm.value.personneVisite.nom+" "+this.addAccesForm.value.personneVisite.prenom;

    }else{
      this.addAccesForm.value.personneVisite="";
    }

    var codeBar= {
      code: 'VIS-'+new Date().getTime(),
      url: "url",

    };


    this.dataService.generationCodeBar(codeBar).subscribe(
      res => {


        var codebar=res;


        this.addAccesForm.value.codeBar=codebar.code;
        this.addAccesForm.value.photoCodeBar=codebar.photo;
        this.addAccesForm.value.photoCodeBar64=codebar.photo64;
        this.dataService.addAcces(this.addAccesForm.value).subscribe(
          res => {
            var newAccesService = res.json();
            this.newAcces=newAccesService;
            this.addAccesForm.reset();
            this.alertsSuccess=true;
            this.etap1=true;
            this.classE1="complete";
            this.alertsSuccessMsg="Opération effectuée avec succès";
            this.addAccesMat();
            this.addAccesCle();

            this.socket.emit('addAcces',this.userActuelle.site._id);

          },
          error => {
            console.log(error);
            this.alertsDanger=true;
            this.alertsDangerMsg="Certains paramètres invalides";
          }

        );


      },
      error => {
        console.log(error)
      }

    );



    this.socket.emit('addAcces',this.userActuelle.site._id);



    }



  }

  printBadge(printpage: string){
    let popupWinindow
    let innerContents = document.getElementById(printpage).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

  getZones(site){

    this.dataService.getZones(site).subscribe(

      data => this.zones = data,

      error => console.log(error),
      () => this.isLoading = false
    );


  }

  getMaterielleNonAffecter() {

    this.dataService.getMaterielleByIdSiteNonAffecter(this.userActuelle.site._id).subscribe(
      data =>{
        this.materielles = data
      },

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

  public visitorEntre:Number=0;
  public visitorSortie:Number=0;
  public contractorEntre:Number=0;
  public contractorSortie:Number=0;
  public permanentEntre:Number=0;
  public permanentSortie:Number=0;
  public othersEntre:Number=0;
  public othersSortie:Number=0;
  public totalvisitorEntre:Number=0;
  public totalvisitorSortie:Number=0;
  public clevisitorEntre:Number=0;
  public clevisitorSortie:Number=0;
  public clecontractorEntre:Number=0;
  public clecontractorSortie:Number=0;
  public clepermanentEntre:Number=0;
  public clepermanentSortie:Number=0;
  public cleothersEntre:Number=0;
  public cleothersSortie:Number=0;
  public cletotalvisitorEntre:Number=0;
  public cletotalvisitorSortie:Number=0;
  public matvisitorEntre:Number=0;
  public matvisitorSortie:Number=0;
  public matcontractorEntre:Number=0;
  public matcontractorSortie:Number=0;
  public matpermanentEntre:Number=0;
  public matpermanentSortie:Number=0;
  public matothersEntre:Number=0;
  public matothersSortie:Number=0;
  public mattotalvisitorEntre:Number=0;
  public mattotalvisitorSortie:Number=0;


  activites:any;
  activitesCle:any;
  updateActivite(){

   /* this.dataService.getAccesByIdSiteJour(this.userActuelle.site).subscribe(*/

      this.dataService.getAccesInByIdSite(this.userActuelle.site).subscribe(

      data =>{
        this.activites = data;
        var xvisitorEntre=0;
        var xvisitorSortie=0;
        var xcontractorEntre=0;
        var xcontractorSortie=0;
        var xpermanentEntre=0;
        var xpermanentSortie=0;
        var xothersEntre=0;
        var xothersSortie=0;
        var xtotalvisitorEntre=0;
        var xtotalvisitorSortie=0;
        data.forEach(function(element) {
          switch(element.type) {
            case "Visiteur":
              xvisitorEntre++;
              xtotalvisitorEntre++

              if(element.etat!="In"){

                xvisitorSortie++;
                xtotalvisitorSortie++
              }

              break;
            case "Contacteur":

              xcontractorEntre++;
              xtotalvisitorEntre++;

              if(element.etat!="In"){
                xcontractorSortie++;
                xtotalvisitorSortie++;
              }

              break;
              case "Contactant":

              xcontractorEntre++;
              xtotalvisitorEntre++;

              if(element.etat!="In"){
                xcontractorSortie++;
                xtotalvisitorSortie++;
              }

              break;

            case "Permanent":

              xpermanentEntre++;
              xtotalvisitorEntre++;
              if(element.etat!="In"){

                xpermanentSortie++;
                xtotalvisitorSortie++;
              }


              break;

            case "Réunion":

              xothersEntre++;
              xtotalvisitorEntre++;
              if(element.etat!="In"){
                xothersSortie++;
                xtotalvisitorSortie++;
              }

              break;
          }
        });



        this.visitorEntre=xvisitorEntre;
        this.visitorSortie=xvisitorSortie;
        this.contractorEntre=xcontractorEntre;
        this.contractorSortie=xcontractorSortie;
        this.permanentEntre=xpermanentEntre;
        this.permanentSortie=xpermanentSortie;
        this.othersEntre=xothersEntre;
        this.othersSortie=xothersSortie;

        this.totalvisitorEntre=xtotalvisitorEntre;
        this.totalvisitorSortie=xtotalvisitorSortie;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );


    var ressss=JSON.stringify(this.activites);




  }

  updateActiviteCles(){

   /* this.dataService.gethoriquereservationsByIdSiteJour(this.userActuelle.site).subscribe(*/
 this.dataService.getHoriquereservationsInBySite(this.userActuelle.site).subscribe(

      data =>{
        this.activitesCle = data;

        var xclevisitorEntre=0;
        var xclevisitorSortie=0;
        var xclecontractorEntre=0;
        var xclecontractorSortie=0;
        var xclepermanentrEntre=0;
        var xclepermanentrSortie=0;
        var xcleothersEntre=0;
        var xcleothersSortie=0;
        var xcletotalvisitorEntre=0;
        var xcletotalvisitorSortie=0;

        var xmatvisitorEntre=0;
        var xmatvisitorSortie=0;
        var xmatcontractorEntre=0;
        var xmatcontractorSortie=0;
        var xmatpermanentrEntre=0;
        var xmatpermanentrSortie=0;
        var xmatothersEntre=0;
        var xmatothersSortie=0;
        var xmattotalvisitorEntre=0;
        var xmattotalvisitorSortie=0;

        data.forEach(function(element) {


          switch(element.acces.type) {
            case "Visiteur":


              if(element.type=="Cle"){
                xclevisitorEntre++;
                xcletotalvisitorEntre++

                if(element.etat!="In"){

                  xclevisitorSortie++;
                  xcletotalvisitorSortie++
                }

              }else{
                xmatvisitorEntre++;
                xmattotalvisitorEntre++

                if(element.etat!="In"){

                  xmatvisitorSortie++;
                  xmattotalvisitorSortie++
                }
              }




              break;
            case "Contacteur":

              if(element.type=="Cle"){

              xclecontractorEntre++;
              xcletotalvisitorEntre++;
              if(element.etat!="In"){
                xclecontractorSortie++;
                xcletotalvisitorSortie++;
              }
              }else{
                xmatcontractorEntre++;
                xmattotalvisitorEntre++;
                if(element.etat!="In"){
                  xmatcontractorSortie++;
                  xmattotalvisitorSortie++;
                }

              }

              break;
case "Contactant":

              if(element.type=="Cle"){

              xclecontractorEntre++;
              xcletotalvisitorEntre++;
              if(element.etat!="In"){
                xclecontractorSortie++;
                xcletotalvisitorSortie++;
              }
              }else{
                xmatcontractorEntre++;
                xmattotalvisitorEntre++;
                if(element.etat!="In"){
                  xmatcontractorSortie++;
                  xmattotalvisitorSortie++;
                }

              }

              break;

            case "Permanent":

              if(element.type=="Cle"){
                xclepermanentrEntre++;
                xcletotalvisitorEntre++;
                if(element.etat!="In"){

                  xclepermanentrSortie++;
                  xcletotalvisitorSortie++;
                }

              }else{
                xmatpermanentrEntre++;
                xmattotalvisitorEntre++;
                if(element.etat!="In"){

                  xmatpermanentrSortie++;
                  xmattotalvisitorSortie++;
                }
              }




              break;

            case "Réunion":

              if(element.type=="Cle"){
                xcleothersEntre++;
                xcletotalvisitorEntre++;
                if(element.etat!="In"){
                  xcleothersSortie++;
                  xcletotalvisitorSortie++;
                }

              }else{
                xmatothersEntre++;
                xmattotalvisitorEntre++;
                if(element.etat!="In"){
                  xmatothersSortie++;
                  xmattotalvisitorSortie++;
                }

              }



              break;
          }
        });



        this.clevisitorEntre=xclevisitorEntre;
        this.clevisitorSortie=xclevisitorSortie;
        this.clecontractorEntre=xclecontractorEntre;
        this.clecontractorSortie=xclecontractorSortie;
        this.clepermanentEntre=xclepermanentrEntre;
        this.clepermanentSortie=xclepermanentrSortie;
        this.cleothersEntre=xcleothersEntre;
        this.cleothersSortie=xcleothersSortie;
        this.cletotalvisitorEntre=xcletotalvisitorEntre;
        this.cletotalvisitorSortie=xcletotalvisitorSortie;

        this.matvisitorEntre=xmatvisitorEntre;
        this.matvisitorSortie=xmatvisitorSortie;
        this.matcontractorEntre=xmatcontractorEntre;
        this.matcontractorSortie=xmatcontractorSortie;
        this.matpermanentEntre=xmatpermanentrEntre;
        this.matpermanentSortie=xmatpermanentrSortie;
        this.matothersEntre=xmatothersEntre;
        this.matothersSortie=xmatothersSortie;

        this.mattotalvisitorEntre=xmattotalvisitorEntre;
        this.mattotalvisitorSortie=xmattotalvisitorSortie;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  miseAjourActivity(){
    this.updateActivite();
    this.updateActiviteCles();

  }

  activitesEntre:any;
  getAccesEntres(){

    this.dataService.getAccesByIdSiteEntres(this.userActuelle.site).subscribe(

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



  listesMaterellesEntre:any;
  isListeAccesEntre=true;
  isListeMaterelleEntre=false;
  validationVisiteurSorti=false;

  accesEntreActuelle:any;
  accesSorty(acces){

    this.accesEntreActuelle=acces;


    this.dataService.getHoriquereservationsByIdEtatIn(acces).subscribe(

      data =>{

        if(data.length!=0){
          this.listesMaterellesEntre=data;
          this.isListeAccesEntre=false;
          this.isListeMaterelleEntre=true;
          this.socket.emit('addAcces',this.userActuelle.site._id);


        }else{
          this.accesUserSorty(acces);

          this.alertsSuccessMsg="Opération effectuée avec succès";
        }

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );


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


  accesUserSorty(accesEntreActuelle){

    var acce=accesEntreActuelle;
    acce.etat="Out";

    var dateSortiii=new Date();
    dateSortiii.setHours(dateSortiii.getHours()+1);


    acce.dateSorti= dateSortiii;


    this.dataService.editAcces(acce).subscribe(
      res => {

        this.isListeMaterelleEntre=false;
        this.validationVisiteurSorti=false;
        this.isListeAccesEntre=true;
        this.getAccesEntres();
        this.socket.emit('addAcces',this.userActuelle.site._id);

      },
      error =>{console.log(error);}
    );


  }

  closeAcceEntre(){
    this.etap1=false;
    this.etap=1;
    this.classE1="active";
    this.etap2=false;
    this.classE2="";
    this.etap3=false;
    this.classE3="";
    this.addAccesForm.reset();
    this.newAcces=null;
  }


  activitesAcces=[];

  isModifAcces=false;
  accesModif:any;
  historiqueAccesModif:any;
  historiqueAccesCleModif=[];
  historiqueAccesMatModif=[];


  openedEditAcces(acces){
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



  checkboxCleEdit(element,acces,flag,i) {


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



  getactivitesAccesEtatType(type,etat){
    this.isModifAcces=false;
    this.dataService.getAccesByIdSiteJourEtatType(this.userActuelle.site,type,etat).subscribe(

      data =>{

        this.activitesAcces = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }


  getactivitesAccesEtat(etat){
    this.isModifAcces=false;

    this.dataService.getAccesByIdSiteJourEtat(this.userActuelle.site,etat).subscribe(

      data =>{
        this.activitesAcces = data;
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  materiellesAcces=[];
  getMateriellesAcces(etat,type,typeUser) {



    /*this.dataService.gethoriquereservationsByIdSiteJourEtatTypeTypeUser(this.userActuelle.site,etat,type,typeUser).subscribe(*/

     this.dataService.gethoriquereservationsByIdSiteEtatTypeTypeUser(this.userActuelle.site,etat,type,typeUser).subscribe(

      data =>{


        this.materiellesAcces = data;

      },

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  getMateriellesAccesnoTypeUser(etat,type) {



   /*this.dataService. gethoriquereservationsByIdSiteJourEtatType(this.userActuelle.site,etat,type).subscribe(*/

    this.dataService.gethoriquereservationsByIdSiteEtatType(this.userActuelle.site,etat,type).subscribe(

      data =>{


        this.materiellesAcces = data;

      },

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

    this.miseAjourActivity();
    this.getListePermanents();
    this.getSiteActuelle(this.userActuelle.site._id);

    this.socket.on('mjrAcces'+this.userActuelle.site._id, function(data) {

      this.miseAjourActivity();

    }.bind(this));

    this.addAccesForm = this.formBuilder.group({
      societe:this.societe,
      nom:this.nom,
      prenom:this.prenom,
      motif:this.motif,
      emplacement:this.emplacement,
      personneVisite:this.personneVisite,
      permant:this.permant,
      permisFeu:this.permisFeu,
      numPF:this.numPF,
      numBadge:this.numBadge,
      notifComplement:this.notifComplement,
      type:this.type,
      dateEntre:this.dateEntre,
      dateSorti:this.dateSorti,
      agent:this.agent,
      etat:this.etat,
      cheke:this.cheke,
      chekec:this.chekec



    });
    this.getZones( this.userActuelle.site);
    $.getScript('../../../assets/public/js/scripthba.js');
    // this.authService.getListUser().subscribe((data) => this.listeUser = data);


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

  userActuelle:any;
  lg="";
  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder,
              private translate: TranslateService, private _sanitizer: DomSanitizer) {

    this.userActuelle= JSON.parse(localStorage.getItem('User'));



    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');




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


}

