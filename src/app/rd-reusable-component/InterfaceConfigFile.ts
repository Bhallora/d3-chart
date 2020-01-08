export interface InterfaceConfigFile{ 
    width:number,
    height:number, 
    numberOfCharts:number,
    marginLeft:number, 
    marginRight:number, 
    marginTop:number, 
    marginBottom:number
    textAnchorForXAxis:string, 
    textAnchorForYAxis:string, 
    labelFontSize:number, 
    labelTextXAxis:string[], 
    numberOfTicksforY2Axis:number, 
    tickSizeOuter:number, 
    numberOfTicksforXAxis:any , 
    tickPadding:number, 
    strokeLineCap:string,
    fill:string, 
    needRightSideYAxis:boolean ,
    color:any[], 
    labelTextYAxisLeft:string[], 
    labelTextYAxisRight:string[], 
    numberOfTicksforYAxis:number[], 
    noOfLineGraphs:number[],
    gapBetweenCharts:number, 
    colorOfVerticalLine:string,
    lineWidthforGraph:number,
    strokeWidthforVerticalLine:number,
    colorOfAxes:string,
    strokeWidthforAxes:number
    format1:any,
    format2:any

  };