import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.host); // ejemplo: http://localhost:3000
  }

  onResultadosActualizados(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('resultados-actualizados', (data) => {
        observer.next(data);
      });
    });
  }
}
