import { Component ,OnInit, NgZone, Inject,ElementRef} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import * as io from "socket.io-client";
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {AppSettings} from '../../app.module';



export class ReversePipe {
  transform(value) {
    return value.slice().reverse();
  }
}

@Component({

	selector: 'sidebar-admin-cmp',
	templateUrl: './sidebar.html',
  styleUrls: ['./chat.scss']
})



export class SidebarComponent implements OnInit {


  socket=io.connect(AppSettings.URLServeur);
	isActive = false;
  isChat= false;
  isLoading = false
	showMenu: string = '';

  lg="";
  messages:any;
  userActuelle:any;

   addMessageForm: FormGroup;
   text= new FormControl("", Validators.required);
   etat= new FormControl("");
   idSite= new FormControl("");
   dateCreation= new FormControl("");
   dateOuverture = new FormControl("");
   idEnvoyeur= new FormControl("");
   idReserveur= new FormControl("");
   envoyeur= new FormControl("");
   reserveur= new FormControl("");
   site= new FormControl("");


  listeUsersChat=[];

  getListeUsersChat() {



    this.dataService.getSitesByIdAgent().subscribe(

      data =>{


        var listeUser=[];


        data.forEach(function(element) {
          if(!this.in_array(element.Site.client.mail,listeUser)){
            if(this.userActuelle.typeAgent!='Agent'){
              listeUser.push(element.Site.client);
            }

          }
          if(!this.in_array(element.Site.admin.mail,listeUser)){
            if(this.userActuelle.typeAgent!='Agent'){
              listeUser.push(element.Site.admin);
            }

          }

        }.bind(this));
        this.listeUsersChat=listeUser;

      } ,

      error => console.log(error),
      () => this.isLoading = false
    );





  }

 alertsDanger=false;
 alertsDangerMsg="";
 newMessage:any;
  alertsSuccess=false;
 alertsSuccessMsg="";

  addMessage(){



      this.addMessageForm.value.dateCreation=new Date().getTime();
      this.addMessageForm.value.messagePrinsipalle= this.addMessageForm.value.text;
      this.addMessageForm.value.idEnvoyeur=this.userActuelle._id;
      this.addMessageForm.value.idReserveur=this.userchat._id;
      this.addMessageForm.value.mailEnvoyeur=this.userActuelle.mail;
      this.addMessageForm.value.mailReserveur=this.userchat.mail;
      this.addMessageForm.value.etat="Nom lus";
      this.addMessageForm.value.idSite=this.userActuelle.site._id;
      this.addMessageForm.value.envoyeur=this.userActuelle;
      this.addMessageForm.value.reserveur=this.userchat;
      this.addMessageForm.value.site=this.userActuelle.site;


      this.dataService.addChat(this.addMessageForm.value).subscribe(
        res => {
          var newMessageService = res.json();
          this.newMessage=res.json();
          this.alertsSuccess=true;
          this.alertsSuccessMsg="Opération effectuée avec succès";

          this.socket.emit('sendChatTo',{user:this.userchat._id,msg:this.newMessage});

          this.ListChatUserChat.push(this.newMessage);
          const scrollPane: any = this.el.nativeElement.querySelector('.scrollbar');
          scrollPane.scrollTop = scrollPane.scrollHeight;

        },
        error => {
          console.log(error);
          this.alertsDanger=true;
          this.alertsDangerMsg="Certains paramètres invalides";
        }

      );


      this.addMessageForm.reset();


  }



  constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,private formBuilder: FormBuilder, private translate: TranslateService,
              public el: ElementRef) {
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


  userchat:any;
closeChat(){
    this. isChat= false;
}

  openChat(UsersChat){
  document.querySelector('body').classList.toggle('aside-menu-hidden');


  this.userchat=UsersChat;
  this.getListChatUserChat(this.userActuelle._id,this.userchat._id);
  this. isChat= true;

  }

  ListChatUserChat=[];
  getListChatUserChat(idUser,idUserChat){
    this.dataService.getListeChatInByIdUsers(this.userActuelle._id,this.userchat._id).subscribe(

      data =>{


        this.ListChatUserChat = data;

        setTimeout(() => {
          this.scrollToBottom();
        });
      } ,

      error => console.log(error),
      () => this.isLoading = false
    );

  }

  ngOnInit():any {

  this.getListeUsersChat();

    this.socket.on('receiveChatTo'+this.userActuelle._id, function(data) {

      this.ListChatUserChat.push(data.msg);
      const scrollPane: any = this.el.nativeElement.querySelector('.scrollbar');
      scrollPane.scrollTop = scrollPane.scrollHeight;


    }.bind(this));



    this.addMessageForm = this.formBuilder.group({

      text:this.text,
      etat:this.etat,
      idSite:this.idSite,
      dateCreation:this.dateCreation,
      dateOuverture:this.dateOuverture,
      idEnvoyeur:this.idEnvoyeur,
      idReserveur:this.idReserveur,
      envoyeur:this.envoyeur,
      reserveur:this.reserveur,
      site:this.site

    });




    this.messages=[
      {
        author: {name:"haithem",avatarSrc:"assets/img/avatars/7.jpg"},
        sentAt:  new Date(),
        text: 'Yet let me weep for such a feeling loss.',
        thread:  {name:"client",avatarSrc:"assets/img/avatars/7.jpg"}
      },
      {
        author: {name:"haithem",avatarSrc:"assets/img/avatars/7.jpg"},
        sentAt:  new Date(),
        text: 'Yet let me weep for such a feeling loss.',
        thread:  {name:"client",avatarSrc:"assets/img/avatars/7.jpg"}
      },
      {
        author: {name:"haithem",avatarSrc:"assets/img/avatars/7.jpg"},
        sentAt:  new Date(),
        text: 'Yet let me weep for such a feeling loss.',
        thread:  {name:"client",avatarSrc:"assets/img/avatars/7.jpg"}
      },
      {
        author: {name:"haithem",avatarSrc:"assets/img/avatars/7.jpg"},
        sentAt:  new Date(),
        text: 'Yet let me weep for such a feeling loss.',
        thread:  {name:"client",avatarSrc:"assets/img/avatars/7.jpg"}
      }

    ];

  }

	eventCalled() {
		this.isActive = !this.isActive;
	}

	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
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

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.scrollbar');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }


}
