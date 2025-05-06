import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Socket} from 'socket.io-client';
import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root',
  })
export class SocketCliente {
    protected socket: Socket;
    constructor() {
        this.socket = io('http://localhost:88');
    }
    OnActualizarProducto(){
        return new Observable((subr)=>{
            this.socket.on('actualizar-producto', (data:any) => {
                subr.next(data);
            });
        })
        
    }
}