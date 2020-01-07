import { Component, OnInit } from '@angular/core';
import { DataItem } from "../shared/model/rd-chart-model";
import { data } from "../shared/data/rd-data";
import { InterfaceConfigFile } from '../rd-reusable-component/InterfaceConfigFile';
import * as _ from 'lodash';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public title = "D3-Charts";
   clone(obj){ return Object.assign({}, obj)};
  public dataFromParents: DataItem[] = data;
  public groupedByRequirementFromParents:any[]= _.mapValues(
    _.groupBy(this.dataFromParents, "channelId"),
    clist => clist.map(item => _.omit(item, 'channelId'))
); 

  public uniqueKeys:any[]=Array.from(new Set((this.dataFromParents.map(d => d.channelId)))) ;
  renameKey(object, key, newKey){
   
    const clonedObj = this.clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
  }
  


  public configurationDetail: InterfaceConfigFile = {
      width: 1000, 
      height:990, 
      noOfLineGraphs:[1,1,1,1,2,1],
      numberOfCharts:5,
      marginLeft: 250,
      marginRight: 150, 
      marginTop: 100, 
      marginBottom: 50,
      textAnchorForYAxis: "end", 
      textAnchorForXAxis:"middle",
      labelFontSize: 20,
      labelTextXAxis: [""], 
      numberOfTicksforY2Axis: 0,
      tickSizeOuter: 0, 
      numberOfTicksforYAxis: 3,
      numberOfTicksforXAxis:d3.timeHour.every(6), 
      tickPadding: 10,
      strokeLineCap:"round",
      fill: "transparent",
      needRightSideYAxis:true,
      color:["#66b3be","#F0A118","#E96C97", "#DC6CE9", "#4AC119","#A9FF4C"], 
      labelTextYAxisLeft:["WOB (pound)", "RPM", "SPP(psi) metrics", "FlowRate (gpm)", "Torque (Nm) Engine Power",],
      labelTextYAxisRight:["","","","","abcd (xy)"],
      colorOfVerticalLine:"#66b3be",
      lineWidthforGraph:1.0,
      gapBetweenCharts:60,
      strokeWidthforVerticalLine:2.5,
      colorOfAxes:"grey",
      strokeWidthforAxes:1.5,
      format1:d3.timeFormat("%-d %b"),
      format2:d3.timeFormat("%H:00")
      
  };
  
  

 
  constructor(){
    
    
    this.dataFromParents.forEach((value:any) => {
      console.log(value.indexes[0]);
      // value.indexes[0] = new Date(value.indexes[0]);
      // console.log(value.indexes[0]);
      // let format = d3.timeFormat("%-d %b %H:%M");
      // value.indexes[0]=format(value.indexes[0]);
      // value.indexes[0] = new Date(0).setUTCSeconds(value.indexes[0]);
      // console.log(value.indexes[0]);
      // value.indexes[0]=new Date(value.indexes[0]);
      // console.log(value.indexes[0]);
      // // var parseUTCDate = d3.utcParse("%-d %b %H:%M");
      value.indexes[0]= new Date(value.indexes[0] *1000);
      console.log(value.indexes[0]);
      
    
      
    });
  }
  ngOnInit(){
    console.log(this.groupedByRequirementFromParents);
    for(let i = 0; i<5; i ++){
    this.groupedByRequirementFromParents=this.renameKey(this.groupedByRequirementFromParents, this.uniqueKeys[i], `chart${i}`  );}
    console.log(this.groupedByRequirementFromParents);
  
}}
