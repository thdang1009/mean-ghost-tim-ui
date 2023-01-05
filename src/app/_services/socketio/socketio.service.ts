import { Injectable } from '@angular/core';
import { handleSocketReadingInfo } from '@app/_shares/common';
import { SK_READING_INFO_REALTIME_UPDATE } from '@app/_shares/constant';
import { environment } from '@environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      path: '/socket',
      autoConnect: true,
      transports: ['polling', 'websocket'],
    });
    this.socket.on('connect', (data) => {
      console.log('socket connected');
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
}
