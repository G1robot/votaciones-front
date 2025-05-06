import { Component, computed, inject, signal, OnInit  } from '@angular/core';
import { ResultadoService } from './resultado.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SocketCliente } from '../persona/socketCliente';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend
} from 'ng-apexcharts';

export interface Resultado{
  id?: string,
  partidoId?: string,
  votos?: number
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-resultado',
  imports: [MatDialogModule,CommonModule,MatProgressSpinnerModule,NgApexchartsModule],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css'
})
export class ResultadoComponent implements OnInit {
  resultadoService = inject(ResultadoService);
  loading = signal(false);
  isLoading = computed(()=>this.loading());
  resultado:Resultado={};
  
  socket = inject(SocketCliente);
  ngOnInit(): void {
    this.socket.OnActualizarProducto().subscribe(dato=>{
      console.log("actualizar producto",dato);
      this.resultadoResource.reload();

    })
  }

  resultadoResource = rxResource({
    loader: () => {
      this.loading.set(true);
      return this.resultadoService.getAll().pipe(
        map((response: any) => {
          this.loading.set(false);
          const data = response.data.data;
          this.chartOptions.series = data.map((r: any) => r.votos);
          this.chartOptions.labels = data.map((r: any) => r.partidoId);
          return data;
        })
      );
    }
  });


  chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'pie',
      width: 800
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    legend: {
      position: 'right'
    }
  };

}
