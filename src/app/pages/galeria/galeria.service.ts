import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Galeria } from './galeria.model';
import { environment } from '../../environment/environment';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  http = inject(HttpClient)
  url = environment.host+'galeria';

  constructor() { }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }

  getAll() {
    return from(this.simulateDelay()).pipe(
      switchMap(() => {
        return this.http.get<Galeria[]>(this.url);
      })
    );
  }

  getByPartido(partidoId: string) {
    return this.http.get<Galeria[]>(`${this.url}/${partidoId}`);
  }

  create(item:any){
    return this.http.post(this.url,item)
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:3000/galeria/${id}`);
  }

  getImagenes() {
    return this.http.get<Galeria[]>('http://localhost:3000/galeria'); // tu endpoint que devuelve nombres
  }
}
