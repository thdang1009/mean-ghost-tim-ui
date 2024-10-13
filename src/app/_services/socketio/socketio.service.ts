import { Injectable } from '@angular/core';
import { handleSocketReadingInfo } from '@shares/common';
import { SK_READING_INFO_REALTIME_UPDATE, CONSTANT } from '@shares/constant';
import { environment } from '@environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  subcribedChanel = new Set();

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      path: '/socket',
      autoConnect: true,
      transports: ['polling', 'websocket'],
    });
    this.socket.on('connect', () => {
      const id = this.socket.id || this.socket.io.engine.id || this.socket.json.id;
      console.log(id);
      localStorage.setItem(CONSTANT.SOCKET_ID, id);
    });

    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  subcribeChanel(chanel, handler, that) {
    if (!this.subcribedChanel.has(chanel)) {
      this.subcribedChanel.add(chanel);
      this.socket.on(chanel, handler.bind(that));
    }
  }
}
