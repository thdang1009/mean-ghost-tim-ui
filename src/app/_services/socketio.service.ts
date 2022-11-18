import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  disconnect() {
    if (this.socket) {``
      this.socket.disconnect();
    }
  }
}
