import { Component, computed, inject, Input, signal  } from '@angular/core';
import { GaleriaService } from './galeria.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FormGaleriaComponent } from './form-galeria/form-galeria.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface Galeria{
  id?: string,
  foto?: string,
  descripcion?: string,
  partidoId?: string
}

@Component({
  selector: 'app-galeria',
  imports: [MatDialogModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  @Input() partidoId: string = '';

  galeriaService = inject(GaleriaService);
  loading = signal(false);
  isLoading = computed(()=>this.loading());
  dialog = inject(MatDialog);
  galeria:Galeria={};	

  galeriaResource = rxResource({
    loader: () => {
      this.loading.set(true);
      return this.galeriaService.getByPartido(this.partidoId).pipe(
        map((response: any) => {
          this.loading.set(false);
          return response.data.data;
        })
      );
    }
  });

  openDialog(data:any){
    this.galeria = data;
    const nuevoForm = this.dialog.open(FormGaleriaComponent,{
      data:this.galeria
    })
    nuevoForm.afterClosed().subscribe(resulta=>{
      if(resulta)
        //
        this.galeriaResource.reload();
    })
    this.galeriaResource.reload();
  }

  nuevo(){
    this.galeria={
      id:'',foto:'',descripcion:'',partidoId:this.partidoId
    }
    this.openDialog(this.galeria)
  }

  eliminar(id:string){
    this.galeriaService.delete(id).subscribe(res=>{
      this.galeriaResource.reload();
    })
  }
}
