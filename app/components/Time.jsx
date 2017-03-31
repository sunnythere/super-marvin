// import React from 'react'
// import * as d3 from "d3";
// import { convertTimeStr } from '../util/timestamp'

// export default (props) => {

//   return (
//     <div>

// {
//   //data arrays : visitors per time of day

//   let dataTimes
//   for (let x = 10; x <= 22; x++) {
//     let time = x
//     if (time > 12) {
//       time -= 12
//     }
//     dataTimes.push(time)
//     if (x !== 22) { dataTimes.push(time+ .5) }
//   }
//   let dataPeople
//   props.visitors.map((visitor) => {
//     //each visitor has checkInTimeMS and checkOutTimeMS
//     let checkIn = convertTimeStr(visitor.checkInTime)
//     let checkOut = convertTimeStr(visitor.checkOutTime)

//   })

//   const height = 600
//   const width = 600

//   // after height/width, but before area
//   // numeric linear scale
//   let y = d3.scaleLinear()
//             .domain([0,30])
//             .range([height, 0]) //inverting y

//   const area = d3.area()


// }

//     </div>
//   )
// }
