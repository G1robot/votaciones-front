import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url=environment.host+'auth/login';
  constructor(private router: Router) { }
  login(datos:any){
    return this.http.post(this.url,datos);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  saveToken(token:string){
    localStorage.setItem('token',token);
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode<any>(token!);
      return decoded.rol;
    }
    return null;
  }
}
