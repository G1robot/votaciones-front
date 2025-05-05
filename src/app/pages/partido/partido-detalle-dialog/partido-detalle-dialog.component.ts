import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CronogramaComponent } from '../../cronograma/cronograma.component';
import { PropuestaComponent } from '../../propuesta/propuesta.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-partido-detalle-dialog',
  imports: [MatTabsModule, CommonModule, CronogramaComponent, PropuestaComponent],
  templateUrl: './partido-detalle-dialog.component.html',
  styleUrl: './partido-detalle-dialog.component.css'
})
export class PartidoDetalleDialogComponent {
  tabIndex = 0;
  partidoIdSeleccionado: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.partidoIdSeleccionado = data.partidoId;
  }

}
