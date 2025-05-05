import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from './persona.model';
import { environment } from '../../environment/environment';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  http = inject(HttpClient)
  url = environment.host+'persona';
  constructor() { }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  } 

  getAll() {
    return from(this.simulateDelay()).pipe(
      switchMap(() => {
        return this.http.get<Persona[]>(this.url);
      })
    );
  }
  create(item:any){
    return this.http.post(this.url,item)
  }

  update(id: any, data: any) {
    return this.http.patch(`http://localhost:3000/persona/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:3000/persona/${id}`);
  }
}
