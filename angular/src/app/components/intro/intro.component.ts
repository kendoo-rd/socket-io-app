import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  messages = [];
  someIsTyping = false;
  whoIsTyping = 'somebody';

  constructor(private chat:ChatService) {

    chat.onMessage.subscribe( message => {

      this.messages.push( message );

    });

    chat.onTyping.subscribe( name => {

      console.log( `${name} is typing ...`)

      this.whoIsTyping = name;

      this.someIsTyping = true;

      setTimeout(()=>{
        this.someIsTyping = false;
      }, 2000)
    })

  }

  ngOnInit() {
  }

  join( username ) {
    this.chat.join( username );
  }


  sendToEveryone() {
    this.chat.sendToEveryone('Hello everyone');
  }

  sendToOthers() {
    this.chat.sendToOthers('Hello people!');
  }

  send_Me_A_Message() {
    this.chat.sendMeMessage();
  }


  onTyping() {

    this.chat.sendTyping()
  }



}
