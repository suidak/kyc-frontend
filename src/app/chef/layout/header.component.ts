import { Component,OnInit } from "@angular/core";
import { AuthService } from "../../shared/auth.service";
import {TranslateService} from 'ng2-translate';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import * as io from "socket.io-client";
import {AppSettings} from '../../app.module';
import {log} from "util";
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'my-header-admin',
    templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {

  socket=io.connect(AppSettings.URLServeur);
  usersinfo : string;
  user:any;
  imageWidth: number = 100;
  lg="";
  mailNonLue=0;
  chatNonLue=0;
  listeMailInNonLue:any;
  listeChatInNonLue=[];
  isLoading=true;

  getListeMessageInByMail(){

    this.dataService.getListeMessageInByMailNonLue(this.user.mail).subscribe(

      data =>{


        this.listeMailInNonLue = data;

        this.mailNonLue=data.length;
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  getListeChatInById(){

    this.dataService.getListeChatInByMailNonLue(this.user._id).subscribe(

      data =>{



        var listeData=data;
        var listeIdNonLue=[];

        listeData.forEach(function(element) {


          if(!this.in_array(element.idEnvoyeur,listeIdNonLue)){

            listeIdNonLue.push(element.idEnvoyeur);
            this.chatNonLue++;
            this.listeChatInNonLue.push(element);
          };
        }.bind(this));


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
        this.user.site=this.siteActuelle;
        console.log("this.siteActuelle");
        console.log(this.siteActuelle.isPrive);

      },

      error => console.log(error),
      () => this.isLoading = false
    );
  }


  constructor( private router: Router,private authService: AuthService, private translate: TranslateService,private http: Http,
               private dataService: DataService, private titleService: Title) {

    this.usersinfo=localStorage.getItem('User');

   this.user=JSON.parse(localStorage.getItem('User'));
this.getSiteActuelle(this.user.site._id);
console.log("---------------------------------");
    console.log("---------------------------------");
    console.log(this.user.site);
    console.log("---------------------------------");
    console.log("---------------------------------");

    this.titleService.setTitle(this.user.site.name);



   if( this.user.typeUser!="Agent"){
     this.router.navigate([ '/' ]);
   }



    this.usersinfo=localStorage.getItem('User');



     document.querySelector('body').classList.toggle('aside-menu-hidden');



    translate.addLangs(["en", "fr"]);



    this.lg=translate.getBrowserLang();

    let browserLang = translate.getBrowserLang();
    if((localStorage.getItem('longageSite')=="fr")||(localStorage.getItem('longageSite')=="en")){
      translate.use(localStorage.getItem('longageSite'));
      this.lg=localStorage.getItem('longageSite');
    }else{
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

  }

  changerSite(site){

    this.user.idSite=site.Site._id;
    this.user.site=site.Site;
    this.getSiteActuelle(site.Site._id)
    this.user.typeAgent=site.type;

    localStorage.setItem('User', JSON.stringify(this.user) );
    this.titleService.setTitle(site.Site.name);
    //this.getAlertNonLue();
    this.ngOnInit();
    this.router.navigate([ 'chef/rotation']);

    //this.router.navigate([ 'chef/home' ]);
    // location.reload();

  }

  onChangeLg(data) {


    this.lg=data;
    this.translate.use(data);
    localStorage.setItem('longageSite', data  );
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    localStorage.setItem('User', "" );
    this.router.navigate([ '/' ]);
    //this.authService.logout();
  }
  listeConsigneJour=[];
  getListeConsigesJour(){
    this.dataService.getNewConsigneByIdSiteJour(this.user.site).subscribe(

      data =>{
        this.listeConsigneJour = data;
        console.log("listeConsigneJour:");
        console.log(data);

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }


  listeAlertNonLue=[];
  nbrAlertNonLue=0;
  getAlertNonLue(){
    this.dataService.getAlertsBySiteAgentNonLue(this.user.site._id,this.user._id).subscribe(

      data =>{
        this.listeAlertNonLue = data;
        this.nbrAlertNonLue = data.length;
        console.log("listeAlertNonLue:");
        console.log(data);

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }

  ngOnInit(){
     this.getListeMessageInByMail();
    this.getListeChatInById();
    this.getListeConsigesJour();
    this.getAlertNonLue();

    this.openedInfo=false;
    this.openedConsigneInfo=false;

    this.socket.on('mjrConsige'+this.user.site._id, function(data) {
      this.getListeConsigesJour();

    }.bind(this));

    this.socket.on('receiveMailTo'+this.user._id, function(data) {

      this.getListeMessageInByMail();


    }.bind(this));

    this.socket.on('receiveChatTo'+this.user._id, function(data) {

      this.getListeChatInById();

    }.bind(this));

    console.log('addAlert test------------> :'+this.user.site._id+this.user._id);
    this.socket.on('mjrAlert'+this.user.site._id+this.user._id, function(data) {
      console.log('addAlert------------> :'+this.user.site._id+this.user._id);
      this.getAlertNonLue();

    }.bind(this));

  }




  procedureInfo:any;
  openedInfo=false;

  openedInfoProcedure(alert){
    alert.etat=0;
    this.dataService.editAlerts(alert).subscribe(
      res => {
        this.socket.emit('addAlert',this.user.site._id+this.user._id);

      },
      error =>{

        console.log(error);
      }
    );




    this.procedureInfo=alert.objets;
    this.openedInfo=true;


  }



  consigneInfo:any;
  openedConsigneInfo=false;

  openedInfoConsigne(alert){
    alert.etat=0;
    this.dataService.editAlerts(alert).subscribe(
      res => {
        this.socket.emit('addAlert',this.user.site._id+this.user._id);

      },
      error =>{

        console.log(error);
      }
    );




    this.consigneInfo=alert.objets;
    this.openedConsigneInfo=true;


  }


  onSignin() {


  }
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public toggled(open:boolean):void {

  }
  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
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
