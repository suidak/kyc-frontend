import { Component ,OnInit, NgZone, Inject} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { DataService } from '../../services/data.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';


import {TranslateService} from 'ng2-translate';




@Component({

	selector: 'home-cmp',

	templateUrl: 'profile.component.html',
  styleUrls: ['./forme.css']
})

export class ProfilComponent implements OnInit {

  openeEditPwd=false;
  openeEditProfile=false;
  openProfile=true;
 alertsSuccess=false;
 alertsSuccessMsg="";
alertsDanger=false;
alertsDangerMsg="";
  lg="";
   user  :any;
   editUserForm: FormGroup;
   editPwdForm: FormGroup;

    password= new FormControl("", Validators.required);
    newPassword= new FormControl("", Validators.required);
    cofPassword= new FormControl("", Validators.required);


  userActuelle:any;

	constructor(@Inject(NgZone) private zone: NgZone,private http: Http, private dataService: DataService,
              private formBuilder: FormBuilder, private translate: TranslateService) {


    this.userActuelle= JSON.parse(localStorage.getItem('User'));

    this.user=JSON.parse(localStorage.getItem('User'));

    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');


    //console.log(translate.getBrowserLang());

    this.lg=translate.getBrowserLang();

    let browserLang = translate.getBrowserLang();

    if((localStorage.getItem('longageSite')=="fr")||(localStorage.getItem('longageSite')=="en")){
      translate.use(localStorage.getItem('longageSite'));
    }else{
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }




  }



  ngOnInit() {

    this.editPwdForm = this.formBuilder.group({
      password:this.password,
      newPassword:this.newPassword,
      cofPassword:this.cofPassword,

    });

  }


  openedEditPwd(){

    this.openeEditPwd=true;
    this.openeEditProfile=false;
    this.openProfile=false;

  }

  openedEditProfile(){

    this.openeEditPwd=false;
    this.openeEditProfile=true;
    this.openProfile=false;

  }

  editPwd(){

    let use=JSON.parse(localStorage.getItem('User'));
    use.password=Md5.hashStr(this.editPwdForm.value.newPassword);
    this.dataService.editUser(use).subscribe(
      res => {
        this.user = use;
        this.alertsSuccess=true;
        this.alertsSuccessMsg="Opération effectuée avec succès";
      },
      error =>{
        this.alertsDanger=true;
        this.alertsDangerMsg="Certains paramètres invalides";
        console.log(error);
      }
    );

   // this.user.password=Md5.hashStr( this.editPwdForm.value.newPassword);

  }

}
