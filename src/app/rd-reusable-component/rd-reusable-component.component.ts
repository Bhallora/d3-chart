import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3";
import {InterfaceConfigFile} from './InterfaceConfigFile';

@Component({
  selector: 'app-rd-reusable-component',
  templateUrl: './rd-reusable-component.component.html',
  styleUrls: ['./rd-reusable-component.component.css']
})
export class RdReusableComponentComponent implements OnInit {
  @Input() incomingData :any[];
  
  @Input() configFile : InterfaceConfigFile;
  @Input() groupedByRequirement : any[];
 public svg:any;
 private x:any;
 private y :any;
 private chartWidth; 
 private chartHeight; 
 private drawingArea;
//  private slider;
 private mouseFollower:any;
 private labelArea:any;
  constructor() { 
    
  }

  ngOnInit() {
    this.chartWidth = this.configFile.width - this.configFile.marginLeft - this.configFile.marginRight;
    this.chartHeight = this.configFile.height - this.configFile.marginTop - this.configFile.marginBottom;
    this.drawingArea = (this.chartHeight / this.configFile.numberOfCharts)-this.configFile.gapBetweenCharts;
    this.makeSvg();
    this.createCharts();
   
    this.createVerticalScrollLine();
    this.createCircleAtVerticalScroll();
    this.drawLine();
   
    
     this.createMovement();
 // this.createMouseFollower();
    
  }


  makeSvg(){
    this.svg= d3.select("#canvas")
    .append("svg")
    .attr("width", this.configFile.width )
    .attr("height", this.configFile.height)
    .style("background-color","#485465")
    .append("g")
    .attr("transform", 'translate('+this.configFile.marginLeft+', '+this.configFile.marginTop+')')
   
    
  
  }


  addXAxisAndYAxis(i){
    
      // for (let i = 0; i <this.configFile.chartNumber; i++) {
      
        this.x = d3.scaleTime()
        .domain(d3.extent(this.incomingData, d => d.indexes[0]))
        .range([0, this.chartWidth]);

        d3.select(`.chart${i}`)
        .append("g")
        .attr("transform", "translate(0, " +this.drawingArea + ")")
        .attr("class","x-axis")
        .style("color",this.configFile.colorOfAxes)
        .style("stroke-width",this.configFile.strokeWidthforAxes)
        .call(d3.axisBottom(this.x).tickPadding(this.configFile.tickPadding)
        .tickSizeOuter(this.configFile.tickSizeOuter)
        .ticks(this.configFile.numberOfTicksforXAxis)
      //   .tickFormat((d)=>{if () {
      //     return this.configFile.format2
      //   }
      // else {return this.configFile.format1}}
      //   ));
      .tickFormat(this.configFile.format2));

        this.y = d3.scaleLinear()
        .domain(d3.extent(this.incomingData, (d) => d.value.item.double))
        .range([this.drawingArea,0]);

        d3.select(`.chart${i}`)
        .append("g")
        .attr("class","y-axis1")
        .style("color", this.configFile.colorOfAxes)
        .style("stroke-width", this.configFile.strokeWidthforAxes)
        .call(d3.axisLeft(this.y)
        .tickPadding(this.configFile.tickPadding)
        .ticks(this.configFile.numberOfTicksforYAxis)
        .tickSizeOuter(this.configFile.tickSizeOuter))
        .selectAll(".y-axis-label")
        .call(this.wrap);

        if(this.configFile.needRightSideYAxis == true){

          if(i<this.configFile.numberOfCharts-1){
        this.y = d3.scaleLinear()
        .domain(d3.extent(this.incomingData, (d) => d.value.item.double))
        .range([ this.drawingArea,0]);
        d3.select(`.chart${i}`)
        .append("g")
        .attr("class", "y-axis2")
        .style("color",this.configFile.colorOfAxes)
        .style("stroke-width", this.configFile.strokeWidthforAxes)
        .attr("transform", "translate( " + this.chartWidth + ",0)")
        .call(d3.axisRight(this.y)
        .ticks(this.configFile.numberOfTicksforY2Axis)
        .tickSizeOuter(this.configFile.tickSizeOuter))
        .selectAll(".y-axis-label")
        .call(this.wrap);
;
       }
        else
        {
          this.y = d3.scaleLinear()
          .domain([d3.min(this.incomingData, (d) => d.value.item.double),d3.max(this.incomingData, (d) => d.value.item.double)] )
          .range([ this.drawingArea,0]);
          d3.select(`.chart${i}`)
          .append("g")
          .attr("class", "y-axis2")
          .style("color", this.configFile.colorOfAxes)
          .style("stroke-width",this.configFile.strokeWidthforAxes)
          .attr("transform", "translate( " + this.chartWidth + ",0)")
          .call(d3.axisRight(this.y)
          .ticks(this.configFile.numberOfTicksforYAxis)
          .tickSizeOuter(this.configFile.tickSizeOuter))
          // .tickPadding(125))
          .selectAll(".y-axis-label")
          .call(this.wrap);
  ;

       }
      
      
      
      }
    
  // }
}


  createCharts(){
   
    for (let i = 0; i < this.configFile.numberOfCharts; i++) {
      this.svg.append('g').attr('class', `chart${i}`)
        .attr("width", this.chartWidth)
        .attr("height", this.chartHeight / this.configFile.numberOfCharts)
        .attr('transform', `translate(0, ${i * this.chartHeight/this.configFile.numberOfCharts})`)
       
       ;
        
        this.addXAxisAndYAxis(i);
        this.addXAxisLabel(i);
        this.addYAxisLabelRight(i);
        this.addyAxisLabelLeft(i);
    
      }}


  addyAxisLabelLeft(i){ 
      //  for(let i=0; i<this.configFile.chartNumber; i++){
          d3.select(`.chart${i}`) 
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "y-axis-label")
        .attr("y", 0-((this.configFile.marginLeft)/2))
        .attr("x", 0-((this.chartHeight/this.configFile.numberOfCharts)/2))
        .style("text-anchor", this.configFile.textAnchorForYAxis)
        .text(this.configFile.labelTextYAxisLeft[i])
        .call(this.wrap, this.drawingArea)
        .style('fill', this.configFile.color[i]);
      // }
    } 
    
    addYAxisLabelRight(i){ 
      //  for(let i=0; i<this.configFile.chartNumber; i++){
          d3.select(`.chart${i}`) 
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "y-axis-label")
        .attr("y", ( this.chartWidth+(this.configFile.marginRight/2)))
        .attr("x", 0-((this.chartHeight/this.configFile.numberOfCharts)/2))
        .style("text-anchor", this.configFile.textAnchorForYAxis)
        .text(this.configFile.labelTextYAxisRight[i])
        .call(this.wrap, this.drawingArea)
        .style('fill', this.configFile.color[i]);
      // }
    } 


  

      
addXAxisLabel(i){ 
      // for(let i=0; i<this.configFile.chartNumber; i++){
         d3.select(`.chart${i}`)
        .append("text").attr("class","x-axis-label")
        .attr("y", (this.chartHeight/this.configFile.numberOfCharts)-10)
        .attr("x", this.chartWidth/2)
        .attr("text-anchor",this.configFile.textAnchorForXAxis)
        .attr("font-size", this.configFile.labelFontSize)
        .text(this.configFile.labelTextXAxis[i])
        .style('fill', this.configFile.color[i]);
       
      // }
    }

  drawLine() {
     for (let i = 0, k=0; i < this.configFile.numberOfCharts; i++) {
        
       for(let j=0; j<this.configFile.noOfLineGraphs[i];j++,k++){
      d3.select(`.chart${i}`)
        .append("path")
        .attr("stroke", this.configFile.color[k])
        .attr("stroke-width", this.configFile.lineWidthforGraph)
        .attr("stroke-linecap", this.configFile.strokeLineCap)
        .attr("fill", this.configFile.fill)
        .attr("d",(d3.line()
        .x((d: any) => this.x(d.indexes[0]))
        .y((d: any) => this.y(d.value.item.double)))
        (this.groupedByRequirement[Object.keys(this.groupedByRequirement)[k]]));}

      }}

      createVerticalScrollLine(){
        
        const slider = this.svg.append("g")
          .attr("width",this.chartWidth)
          .attr("height",(this.configFile.numberOfCharts*this.drawingArea)+ ((this.configFile.numberOfCharts-1)*this.configFile.gapBetweenCharts )+20)
          .attr("class", "scroller")
          

        // const drag = d3.drag();
        //   drag.on('drag', () => {
        //     d3.select('.scroller')
        //       .attr('transform', `translate(${d3.event.x},0)`);  
        //   });
        
        //   slider.call(drag);

      slider.append("line")
          .attr("x1",0)
          .attr("y1",0)
          .attr("x2",0)
          .attr("y2",(this.configFile.numberOfCharts*this.drawingArea)+ ((this.configFile.numberOfCharts-1)*this.configFile.gapBetweenCharts ))
          .attr("stroke", this.configFile.colorOfVerticalLine)
          .attr("stroke-width", this.configFile.strokeWidthforVerticalLine)
      
      }

     
      createCircleAtVerticalScroll(){
        d3.select(".scroller")
        .append("circle")
        .attr("cx", 0)
        .attr("cy",(this.configFile.numberOfCharts*this.drawingArea)+ ((this.configFile.numberOfCharts-1)*this.configFile.gapBetweenCharts ))
        .attr("r", this.configFile.strokeWidthforVerticalLine * 2.5)
        .attr("fill",this.configFile.colorOfVerticalLine)

      } 


      // 
    

     
    
    

     wrap(text:any, width:number) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", 0.5 + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + 0.5 + "em").text(word);
          }
        }
      });}
    
    
    
    
      createMovement(){
          
        const drag = d3.drag();
        drag.on('drag', () => { if (`${d3.event.x}`> this.chartWidth || `${d3.event.x}`< `0` ) {
          return null
        } else{
         

          d3.select('.scroller')
            .attr('transform', `translate(${d3.event.x} ,0)`);  
        }});
      
      d3.select(".scroller").call(drag);

        
    
      
      
      }
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    



   