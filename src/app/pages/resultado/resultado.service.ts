import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resultado } from './resultado.model';
import { environment } from '../../environment/environment';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  http = inject(HttpClient)
  url = environment.host+'resultado';
  constructor() { }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  } 

  getAll() {
    return from(this.simulateDelay()).pipe(
      switchMap(() => {
        return this.http.get<Resultado[]>(this.url);
      })
    );
  }
}
