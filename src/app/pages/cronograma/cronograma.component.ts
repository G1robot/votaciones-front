import { Component, computed, inject, Input, signal  } from '@angular/core';
import { CronogramaService } from './cronograma.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FormCronogramaComponent } from './form-cronograma/form-cronograma.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface Cronograma{
  id?: string,
  actividad?: string,
  descripcion?: string,
  fecha?: Date,
  hora?: string,
  partidoId?: string
}
@Component({
  selector: 'app-cronograma',
  imports: [MatDialogModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.css'
})
export class CronogramaComponent {
  @Input() partidoId: string = '';


  cronogramaService = inject(CronogramaService);
  loading = signal(false);
  isLoading = computed(()=>this.loading());
  dialog = inject(MatDialog);
  cronograma:Cronograma={};	


  cronogramaResource = rxResource({
    loader: () => {
      this.loading.set(true);
      return this.cronogramaService.getByPartido(this.partidoId).pipe(
        map((response: any) => {
          this.loading.set(false);
          return response.data?.data || response;
        })
      );
    }
  });
  

  openDialog(data:any){
    this.cronograma = data;
    const nuevoForm = this.dialog.open(FormCronogramaComponent,{
      data:this.cronograma
    })
    nuevoForm.afterClosed().subscribe(resulta=>{
      if(resulta)
        //
        this.cronogramaResource.reload();
    })
    this.cronogramaResource.reload();
  }

  nuevo(){
    this.cronograma={
      id:'',actividad:'',descripcion:'',fecha:new Date(),hora:'',partidoId:this.partidoId
    }
    this.openDialog(this.cronograma);
  }

  eliminar(cronograma: Cronograma) {
    if (!cronograma.id) return;
  
    const confirmado = confirm(`¿Estás seguro de eliminar el cronograma "${cronograma.actividad}"?`);
    if (confirmado) {
      this.cronogramaService.delete(cronograma.id).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.cronogramaResource.reload();
          } else {
            alert('No se pudo eliminar: ' + res.message);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  editar(item: any) {
    this.openDialog(item);
  }
  

}
