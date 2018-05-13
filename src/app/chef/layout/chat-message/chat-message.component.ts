import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';



@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  message: any;
  currentUser: any;
  incoming: boolean;

  constructor() {
  }

  ngOnInit(): void {

    this.currentUser = {name:"haithem",avatarSrc:"assets/img/avatars/7.jpg"}
   this.message={
     author:this.currentUser,
     sentAt: new Date(),
     text: 'Yet let me weep for such a feeling loss.',
     thread: {name:"client",avatarSrc:"assets/img/avatars/7.jpg"}
   }
  }
}
