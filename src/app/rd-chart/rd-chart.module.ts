import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RdChartComponent } from './rd-chart.component';



@NgModule({
  declarations: [RdChartComponent],
  imports: [
    CommonModule
  ],
  exports:[RdChartComponent]
})
export class RdChartModule { }
