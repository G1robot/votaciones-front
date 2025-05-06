import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { PersonaService } from './persona.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FormPersonaComponent } from './form-persona/form-persona.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SocketCliente } from './socketCliente';

export interface Persona{
  id?: string,
  nombreCompleto?: string,
  ci?: string,
  fechaNacimiento?: Date,
  rol?: string,
  voto?: boolean
}

@Component({
  selector: 'app-persona',
  imports: [MatDialogModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements OnInit {
  personaService = inject(PersonaService);
  loading = signal(false);
  isLoading = computed(()=>this.loading());
  dialog = inject(MatDialog);
  persona:Persona={};	

  socket = inject(SocketCliente);
  ngOnInit(): void {
    this.socket.OnActualizarProducto().subscribe(dato=>{
      console.log("actualizar producto",dato);
      this.personaResource.reload();

    })
  }


  personaResource = rxResource({
    loader: () => {
      this.loading.set(true);
      return this.personaService.getAll().pipe(
        map((response: any) => {
          this.loading.set(false);
          return response.data.data;
        })
      );
    }
  });

  openDialog(data:any){
    this.persona = data;
    const nuevoForm = this.dialog.open(FormPersonaComponent,{
      data:this.persona
    })
    nuevoForm.afterClosed().subscribe(resulta=>{
      if(resulta)
        //
        this.personaResource.reload();
    })
    this.personaResource.reload();
  }

  nuevo(){
    this.persona={
      id:'',nombreCompleto:'',ci:'',fechaNacimiento:new Date(),rol:'',voto:false
    }
    this.openDialog(this.persona);
  }

  editar(item: any) {
    this.openDialog(item);
  }

  eliminar(persona: Persona) {
    if(!persona.id) return;

    const confirmacion = confirm(`¿Está seguro de eliminar a ${persona.nombreCompleto}?`);
    if (confirmacion) {
      this.personaService.delete(persona.id).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.personaResource.reload();
          } else {
            alert('No se pudo elimnar:' + res.message);
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }


}
