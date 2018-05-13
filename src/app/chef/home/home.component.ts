import { Component ,OnInit, NgZone, Inject, ViewChild} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



import * as io from "socket.io-client";
import {AppSettings} from '../../app.module';

import {TemplateRef } from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';

import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

export class ReversePipe {
  transform(value) {
    return value.slice().reverse();
  }
}


@Component({

	selector: 'timeline-cmp',
	templateUrl: './timeline.html',
	styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit  {


  testxxxxx: string ="hba";

  ngOnInit() {
    $.getScript('../../../assets/public/js/scripthba.js');

  }

}

@Component({

	selector: 'chat-cmp',
	templateUrl: './chat.html'
})
export class ChatComponent {}

@Component({

	selector: 'notifications-cmp',
	templateUrl: './notifications.html'
})
export class NotificationComponent { }

@Component({

	selector: 'home-cmp',
	templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;


  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [
    DAYS_OF_WEEK.FRIDAY,
    DAYS_OF_WEEK.SATURDAY
  ];

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string,
    event: CalendarEvent
  };

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }



  changeCalendarView(view) {

  }

  calendarOptions = {
    height: 500,
    fixedWeekCount : false,


    editable: true,
    eventLimit: true,
    events: [

    ]
  };

  calendarOptionsss = {
    height: 'parent',
    contentHeight: 'auto',
    fixedWeekCount : false,

    editable: true,
    eventLimit: true,
    defaultView: 'agendaWeek',
    allDaySlot: false,
    minTime: '06:00:00',
    maxTime: '23:00:00',
    header: {
      left: '',
      center: 'prev, title, next',
      right: ''
    },
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      }]
  };


	/*********************/


  socket=io.connect(AppSettings.URLServeur);

  user=[];
	myInterval: number = 5000;
	index: number = 0;
	slides: Array<any> = [];
	imgUrl: Array<any> = [];

  listeUser  : any[];

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  listFilter: string  ;
  errorMessage: string;

   addEvenementForm: FormGroup;
   idSite= new FormControl("");
   idClient= new FormControl("");
   client= new FormControl("");
   etat= new FormControl("");
   type= new FormControl("");
   dateCreation= new FormControl("");
    site= new FormControl("");

   nom= new FormControl("", Validators.required);
   remarque= new FormControl("", Validators.required);
   heure= new FormControl("");
   date= new FormControl("");
   contact= new FormControl("");

  public alertsSuccess=false;
  public alertsSuccessMsg="";
  public alertsDanger=false;
  public alertsDangerMsg="";
  datexxxxx= new Date();
  contacts=[];


  actionAddEvent(){
    this.getlistContacte();
    this.alertsSuccess=false;
    this.alertsSuccessMsg="";
    this.alertsDanger=false;
    this.alertsDangerMsg="";
    this.datexxxxx= new Date();

  }





  getlistContacte(){

    this.dataService.getUsersContactsBySite(this.userActuelle.site._id).subscribe(
      data =>{
        this.contacts = data;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

listeContactNotifEmail=[];
  checkboxEventNotifActions(element,flag,i) {

    console.log("index:");
    console.log(i);
    var materielle=element;
    var materielleJson=element;
    if(flag){

      this.listeContactNotifEmail[i]=materielle;

    }else{

      delete  this.listeContactNotifEmail[i];

    }
    console.log('this.listeContactNotifEmail');
    console.log(this.listeContactNotifEmail);

  }

erreurDate='';
  erreurTime='';
  addEvenement(){
    this.alertsDanger=false;
    this.alertsDangerMsg="";

    this.addEvenementForm.value.dateCreation=new Date().getTime();
    this.addEvenementForm.value.idSite=this.userActuelle.site._id;
    this.addEvenementForm.value.etat="En cour";

    this.addEvenementForm.value.idUser= this.userActuelle._id;
    this.addEvenementForm.value.user= this.userActuelle;
    this.addEvenementForm.value.date=new Date(this.addEvenementForm.value.date);

    var hours = this.addEvenementForm.value.heure.split(":")[0];
    var minutes = this.addEvenementForm.value.heure.split(":")[1];
    console.log("new date hours=====>");
    console.log(hours);
    console.log("new date minutes =====>");
    console.log(minutes);

    this.addEvenementForm.value.date.setHours(hours);
    this.addEvenementForm.value.date.setMinutes(minutes);
    console.log("new date =====>");
    console.log(this.addEvenementForm.value.date.getTime());

    console.log("new date system =====>");
    var datesysteme=new Date();
    datesysteme.setHours(datesysteme.getHours()+0);
    console.log(datesysteme.getTime());

    if(datesysteme<this.addEvenementForm.value.date){
      console.log("erreur date event!!!!!");
      this.alertsDanger = true;
      this.alertsDangerMsg = "Vérifier date et heure";
    }else {


      var sendNotif = false;

      if (this.addEvenementForm.value.contact) {
        this.addEvenementForm.value.idContact = this.addEvenementForm.value.contact._id;
        sendNotif = true;
      }
      if (this.listeContactNotifEmail.length > 0) {
        this.addEvenementForm.value.listeContactNotifEmail = this.listeContactNotifEmail;
      }

      this.dataService.addEvenement(this.addEvenementForm.value).subscribe(
        res => {
          var newRondeService = res.json();

          this.listeEvenementJour.push(newRondeService);
          this.addEvenementForm.reset();


          this.socket.emit('addEvenement', this.userActuelle.site._id);
          this.alertsSuccess = true;
          this.alertsSuccessMsg = "Opération effectuée avec succès";

          if (this.listeContactNotifEmail.length > 0) {

            this.listeContactNotifEmail.forEach(function (element) {


              var mail = {
                "email": {
                  "addAddress": element.mail,
                  "Subject": "Événements sur Fact Group",
                  "nom": element.nom,
                  "prenom": element.prenom,
                  "evenement": newRondeService
                }
              };

              this.dataService.sendMailEvenement(mail).subscribe(
                res => {
                  this.alertsSuccess = true;
                  this.alertsSuccessMsg = "Opération effectuée avec succès";
                },
                error => {
                  console.log(error)
                }
              );

            }.bind(this));


          } else {

            this.alertsSuccess = true;
            this.alertsSuccessMsg = "Opération effectuée avec succès";
            this.listeContactNotifEmail = [];

          }


          this.getListeEvenementJour();


        },
        error => {
          console.log(error);
          this.alertsDanger = true;
          this.alertsDangerMsg = "Certains paramètres invalides";
        }
      );

    }
  }

  prevEtapEvenement(){
    this.actionAddEvent();

  }



	/* END */
	/* Alert component */
	public alerts:Array<Object> = [
	   {
	     type: 'danger',
	     msg: 'Oh snap! Change a few things up and try submitting again.'
	   },
	   {
	     type: 'success',
	     msg: 'Well done! You successfully read this important alert message.',
	     closable: true
	   }
	 ];

	 public closeAlert(i:number):void {
	   this.alerts.splice(i, 1);
	 }
	/* END*/
  userActuelle:any;
  lg="";


  constructor(@Inject(NgZone) private zone: NgZone, private router: Router,private http: Http, private dataService: DataService,
              private formBuilder: FormBuilder, private translate: TranslateService,
              private modal: NgbModal) {

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




  toggleImage(): void {
    this.showImage = !this.showImage;
  }



  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }






  ngOnInit() {



    $.getScript('../../../assets/public/js/scripthba.js');

     this. getListeConsigesJour();
     this.getListeRondeJour();
     this. getListeProcedureJour();
     this.getListeEvenementJour();

    this.socket.on('mjrConsige'+this.userActuelle.site._id, function(data) {
      this. getListeConsigesJour();

    }.bind(this));
    this.socket.on('mjrRonde'+this.userActuelle.site._id, function(data) {
      this.getListeRondeJour();

    }.bind(this));
    this.socket.on('addProcedure'+this.userActuelle.site._id, function(data) {
      this. getListeProcedureJour();

    }.bind(this));

    this.socket.on('addEvenement'+this.userActuelle.site._id, function(data) {
      this.getListeEvenementJour();
    }.bind(this));


    this.addEvenementForm = this.formBuilder.group({
      idSite:this.idSite,
      type: this.type,
      dateCreation: this.dateCreation,
      etat: this.etat,
      remarque:this.remarque,
      idClient:this.idClient,
      client:this.client,
      site:this.site,
      date: this.date,
      heure: this.heure,
      contact: this.contact


    });





  }

  listeRondeJour=[];

  getListeRondeJour(){


    this.dataService.getRondeByIdSiteJour(this.userActuelle.site).subscribe(

      data =>{
        this.listeRondeJour = data;


      } ,

      error => console.log(error),
      () => this.isLoading = false
    );



  }

  listeConsigneJour=[];
  isLoading=false;
  getListeConsigesJour(){

    this.dataService.getConsigneByIdSiteCalander(this.userActuelle.site).subscribe(

      data =>{
        this.listeConsigneJour = data;

        if(data){
          var liste=[];
          var ch;

          data.forEach(function(element) {


            if(element.type=="Permanentes"){

              ch={
                start: startOfDay(new Date()),
                title: element.remarque,
                color: colors.blue,
              };

            }else{

              if(element.dateDebut && element.dateFin){
                ch={
                  title: element.remarque,
                  start: new Date(element.dateDebut.slice(0,10)) ,
                  end : new Date( element.dateFin.slice(0,10)),
                  color: colors.yellow,
                };

              }



            };


            liste.push(ch);
          });

          this.calendarOptions.events=liste;
          this.events =liste;





        };

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  listeProcedureJour=[];
  getListeProcedureJour(){

    this.dataService.getProcedureByIdSiteJourActif(this.userActuelle.site).subscribe(

      data =>{
        this.listeProcedureJour = data;
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  procedureInfo:any;
  openedInfo=false;
  openedInfoProcedure(proc){
    this.procedureInfo=proc;
    this.openedInfo=true;
  }

  listeEvenementJour=[];
  getListeEvenementJour(){

    this.dataService.getEvenementByIdSiteJour(this.userActuelle.site).subscribe(
      data =>{
        this.listeEvenementJour = data;

        $.getScript('../../../assets/public/js/scripthba.js');
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
