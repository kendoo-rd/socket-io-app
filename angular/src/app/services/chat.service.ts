import { Injectable, Output, EventEmitter } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;

  @Output() onMessage:EventEmitter<any> = new EventEmitter<any>();
  @Output() onTyping:EventEmitter<any> = new EventEmitter<any>();

  constructor() {

    //  Create Socket
    this.socket = io('http://localhost:3000');


    //  Respond to messages
    this.socket.on('message', message => {

      this.onMessage.emit(message);
    })

    this.socket.on('typing', who => {

      console.log('typing received from server', who)
      this.onTyping.emit( who );

    })
  }


  join( username ) {
    this.socket.emit('join', username);
  }

  sendToEveryone( message ) {
    this.socket.emit('messageToEveryone', message);
  }

  sendToOthers( message ) {
    this.socket.emit('messageToOthers', message);
  }

  sendMeMessage() {
    this.socket.emit('messageMe');
  }

  sendTyping() {

    this.socket.emit('typing');
  }
}
