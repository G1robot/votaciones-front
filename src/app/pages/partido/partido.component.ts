import { Component, computed, inject, signal  } from '@angular/core';
import { PartidoService } from './partido.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FormPartidoComponent } from './form-partido/form-partido.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CronogramaComponent } from '../cronograma/cronograma.component';
import { PartidoDetalleDialogComponent } from './partido-detalle-dialog/partido-detalle-dialog.component';

export interface Partido{
  id?: string,
  nombre?: string,
  siglas?: string,
  nombreCandidato?: string,
  logo?: string,
  fotoCandidato?: string,
  descripcion?: string
}
@Component({
  selector: 'app-partido',
  imports: [MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './partido.component.html',
  styleUrl: './partido.component.css'
})
export class PartidoComponent {
  partidoService = inject(PartidoService);
  loading = signal(false);
  isLoading = computed(()=>this.loading());
  dialog = inject(MatDialog);
  partido:Partido={};	

  partidoResource = rxResource({
    loader: () => {
      this.loading.set(true);
      return this.partidoService.getAll().pipe(
        map((response: any) => {
          this.loading.set(false);
          return response.data.data;
        })
      );
    }
  });

  openDialog(data:any){
    this.partido = data;
    const nuevoForm = this.dialog.open(FormPartidoComponent,{
      width: '800px',
      maxWidth: '95vw',
      data:this.partido
    })

    nuevoForm.afterClosed().subscribe(resulta=>{
      if(resulta)
        this.partidoResource.reload();
    })
    this.partidoResource.reload();
  }

  abrirDetallePartido(partido: any) {
    this.dialog.open(PartidoDetalleDialogComponent, {
      width: '800px',
      data: { partidoId: partido.id }
    });
  }
  

  nuevo(){
    this.partido={
      id:'',nombre:'',siglas:'',nombreCandidato:'',logo:'',fotoCandidato:'',descripcion:''
    }
    this.openDialog(this.partido);
  }
  
  editar(item: any){
    this.openDialog(item);
  }

  eliminar(partido: Partido) {
    if (!partido.id) return;
  
    const confirmado = confirm(`¿Estás seguro de eliminar el partido "${partido.nombre}"?`);
    if (confirmado) {
      this.partidoService.delete(partido.id).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.partidoResource.reload();
          } else {
            alert('No se pudo eliminar: ' + res.message);
          }
        },
        error: err => {
          alert('Error al eliminar: ' + (err.error?.message || 'Error desconocido'));
        }
      });
    }
  }
  
}
