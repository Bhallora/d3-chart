import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RdReusableComponentComponent } from './rd-reusable-component.component';
import {InterfaceConfigFile} from './InterfaceConfigFile';



@NgModule({
  declarations: [RdReusableComponentComponent],
  imports: [
    CommonModule
  ],
  exports:[
    RdReusableComponentComponent
  ]
})
export class RdReusableComponentModule { }
