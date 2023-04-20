import './App.css';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3"
import Dataset from './dataset'

function App() {


    const width = 500;
    const height = 150;
    const padding = 20;
    const maxValue =100; // Maximum data value
  
    const [chartdata,setChartdata] = useState(Dataset)
 
    const svgRef= useRef()

  //  2] Setup random data generator and SVG canvas -//
    const newData = () => chartdata.map(
      function (d) {
        d.value = d.topic;
        //write here to for further modification in function

        return d
      } 
    )

      useEffect(
        ()=>{ 
          
        //  3] Setup functions for Scales ------------------//
          
            //xscales
            const xScale = d3.scalePoint()
                            .domain(chartdata.map( (d) => d.value ))
                            .range([(0+padding),(width - padding)])
            console.log('Start - End',xScale('Car'),xScale('Cinema'))                

            //Yscales
            const yScale = d3.scaleLinear()
                             .domain([0, d3.max( chartdata, (d) => d.intensity)])
                             .range([(height - padding), (0 + padding)])
                             
            console.log('Start - End',yScale(0),yScale(10)) 
         

        //  4] Setup functions to draw Lines ---------------//

            const line = d3.line()
                           .x((d)=> xScale(d.topic))
                           .y( (d)=>yScale(d.intensity))
                           .curve(d3.curveMonotoneX)
            
            console.log('chart draw commands', line(chartdata) )               

        //  5] Draw line        ---------------------------//
           d3.select(svgRef.current)
              .select('path')
              .attr('d', (value) => line(chartdata))
              .attr('fill','none')
              .attr('stroke', 'green')
              .style("stroke-width", 2)
              .style("stroke-linecap", "round")
              .style("stroke-linejoin", "round")
              .style("stroke-dasharray", ("10,3"))

        //  6] Setup functions to draw X and Y Axes --------//
           const xAxis = d3.axisBottom(xScale)
           const yAxis = d3.axisLeft(yScale)

        //  7] Draw x and y Axes   -------------------------//
           d3.select('#xaxis').remove()
           d3.select(svgRef.current)
              .append('g')
              .attr('transform',`translate(0,${height - padding})`)
              .attr('id','xaxis')
              .call(xAxis)
            
          d3.select('#yaxis').remove()
          d3.select(svgRef.current)
              .append('g')
              .attr('transform',`translate(${padding},0)`)
              .attr('id','yaxis')
              .call(yAxis)   

        },[chartdata]
      )



  return (
    <div className="App">
      <header className="App-header">

      <h2>
        graph based on given data using react and d3.js
      </h2>

        <svg id="chart" ref={svgRef} viewBox="0 0 500 150">

            <path d="" fill="none" stroke="white" strokeWidth="5" />
            
        </svg>
        <p>
          <button type='button' onClick={()=> setChartdata(newData())}>
                This button does nothing
          </button>
        </p>

      </header>
    </div>
  );
}

export default App;
