import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataItem } from "../shared/model/rd-chart-model";
import { data } from "../shared/data/rd-data";
import * as _ from 'lodash';
import { interpolateBlues, curveBasis } from 'd3';
// import { groupBy } from 'lodash';



@Component({
  selector: 'app-rd-chart',
  templateUrl: './rd-chart.component.html',
  styleUrls: ['./rd-chart.component.css']
})
export class RdChartComponent implements OnInit {

  data: DataItem[];
  private margin = { top: 30, right: 50, left: 100, bottom: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: any;
  private drawingArea: number;
  private set: any;
  private i: number;
  private filteredData:any[]=[];
  private uniqueChannelId:any[];
  private groupedByChannelId:any[];
  public  color = d3.scaleOrdinal(d3.schemeCategory10);


  constructor() {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 1000 - this.margin.top - this.margin.bottom;
    this.data = data;
    this.line = d3.line()
      .x((d: any) => this.x(d.indexes[0]))
      .y((d: any) => this.y(d.value.item.double));
    this.drawingArea = (this.height / 5)-40;
    this.data.forEach((value) => {
      value.indexes[0] = new Date(0).setUTCMilliseconds(value.indexes[0]);
    });



  }

  ngOnInit() {
    this.filterData();
    // this.distinctChannelId();
    this.makeSvg();
    this.createChart();
    this.addXAxisAndYAxis();
    this.setUp();
    this.drawLine();
  
  }
 

//  filterData(){ 
//    let arr = [];
//    this.filteredData = this.data.map((value, key)=> {
//      const newObj = {
//       [value['channelId']]: value
//      }
//      arr.find()
//    })
//   }

   distinctChannelId(){
     this.uniqueChannelId= Array.from(new Set(this.data.map(d=>d.channelId)));
     console.log(this.uniqueChannelId);
     
   }
  

  filterData(){
    this.groupedByChannelId = _.mapValues(
        _.groupBy(this.data, "channelId"),
        clist => clist.map(item => _.omit(item, 'channelId'))
    );
    console.log(this.groupedByChannelId);
    this.filteredData.push(this.groupedByChannelId);
    console.log(this.filteredData);
    
  }

  createChart() {
    for (let i = 0; i < 5; i++) {
      this.svg.append('g').attr('class', `chart${i}`)
        .attr("width", this.width / 5)
        .attr("height", this.height / 5)
        .attr('transform', `translate(0, ${i * this.height/5})`).append("text").attr("class","x-axis-label").attr("y", (this.height/5)).attr("x", this.width/2).attr("text-anchor","middle").attr("font-size", 20).text("x-label").attr("padding", 20);
    }
  }

  private makeSvg() {
    this.svg = d3.select("#canvas").append("svg").attr("width", this.width + this.margin.left + this.margin.right).attr("height", this.height + this.margin.top + this.margin.bottom).append("g").attr("transform", 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

  }

  private addXAxisAndYAxis() {
    for (let i = 0, k = 30; i <5; i++) {
      this.x = d3.scaleTime().domain(d3.extent(this.data, d => d.indexes[0])).range([0, this.width]);
      d3.select(`.chart${i}`).append("g").attr("transform", "translate(0, " + this.drawingArea + ")").call(d3.axisBottom(this.x).tickPadding(5).tickSizeOuter(0).ticks(5));
      this.y = d3.scaleLinear().domain(d3.extent(this.data, (d) => d.value.item.double)).range([0, this.drawingArea]);
      d3.select(`.chart${i}`).append("g").call(d3.axisLeft(this.y).tickPadding(20).ticks(2));
      this.y = d3.scaleLinear().domain(d3.extent(this.data, (d) => d.value.item.double)).range([0, this.drawingArea]);
      d3.select(`.chart${i}`).append("g").attr("transform", "translate( " + this.width + ",0)").call(d3.axisRight(this.y).ticks(0).tickSizeOuter(0));
    }
  }
  setUp() {
   

    for (let i = 0; i < 5; i++) {
      d3.select(`.chart${i}`)
        .append("path")
        .attr("class", `line${i}`)
        .attr("stroke",function(){
          // if (`line${i}`== `line0`){
          //   return "red";
          // }
          // else if(`line${i}`== `line1`)
          // {return "blue";}
          // else if (`line${i}`== `line2`) 
          // {return "purple";}
          // else if (`line${i}`== `line3`) 
          // {return "black";}
          // else if (`line${i}`== `line4`)
          // {return "amber"}
          switch(`line${i}`){
            case "line0": return "blue";
            break;
            case "line2": return "pink";
            break;
            case "line3": return "purple";
            break;
            case "line4":return "green";
            break;
            case "line1": return "orange";
          }
        })
        .attr("stroke-linecap", "round")
        .attr("fill", "transparent");
    }
  }

  drawLine() {
    
    for (let i = 0; i <= 5; i++) {
      d3.select(`.line${i}`)
        .attr("d", this.line(
        this.groupedByChannelId[Object.keys(this.groupedByChannelId)[i]]));
    }
  }
}
