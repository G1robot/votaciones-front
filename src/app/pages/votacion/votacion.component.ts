import { Component, computed, inject, signal  } from '@angular/core';
import { VotacionService } from './votacion.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Partido{
  id?: string,
  nombre?: string,
  siglas?: string,
  nombreCandidato?: string,
  logo?: string,
  fotoCandidato?: string,
  descripcion?: string
}

export interface Votacion{
  partidoId?: string
}

@Component({
  selector: 'app-votacion',
  imports: [MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './votacion.component.html',
  styleUrl: './votacion.component.css'
})
export class VotacionComponent {
  selectedPartidoId = signal<string | null>(null);


  votacionService = inject(VotacionService);
  loading = signal(false);
  isLoading = computed(()=>this.loading());
  partido:Partido={};	
  votacion:Votacion={};

  partidoResource = rxResource({
    loader: () => {
      this.loading.set(true);
      return this.votacionService.getAll().pipe(
        map((response: any) => {
          this.loading.set(false);
          return response.data.data;
        })
      );
    }
  });

  votar(partido: Partido) {
    this.mostrarNotificacion(`Has seleccionado el partido: ${partido.id}`);
  }

  seleccionarPartido(partido: Partido) {
    this.selectedPartidoId.set(partido.id ?? null);
  }

  constructor(private snackBar: MatSnackBar) {} 

  mostrarNotificacion(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, 
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'] 
    });
  }


  nuevo(item: any) {
    this.votacion = {
      partidoId: item.id // solo mandamos el ID
    };
  
    this.votacionService.create(this.votacion).subscribe({
      next: (request: any) => {
        if (request.status === 'success') {
          this.mostrarNotificacion('Voto registrado con éxito!');
        }
      },
      error: err => {
        console.log(err);
        this.mostrarNotificacion('Error al registrar el voto!');
      }
    });
  }
  
  
}
