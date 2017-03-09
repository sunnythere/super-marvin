import React, { Component } from 'react'
import Clock from './Clock'


export default (props) => {

  let opacity2 = props.opacity2
  let scrollStyle = {
    backgroundColor: `rgba(250,250,250,${opacity2})`
  }
  const path = props.path

  const newDate = new Date()
  const theDateArr = newDate.toDateString().split(' ')
  const theDate = `${theDateArr[0]}: ${theDateArr[1]} ${theDateArr[2]}, ${theDateArr[3]}`


  return (

    <div id="navbar2" style={scrollStyle}>

        <div>
          <h4>{theDate}</h4>
          <span id="clock-span">
            <h4><Clock /></h4>
          </span>
        </div>

      { path === '/visitor' ?
        <div id="visitor-headings">
          <span className="heading hspace-1">
          Visitor# &nbsp;
          </span>

          <span className="heading hspace-2a">
          &nbsp; Checked-in
          </span>

          <span className="heading hspace-4">
          &nbsp;Name
          </span>

          <span className="heading hspace-1a">
          &nbsp;
          </span>

          <span className="heading hspace-2a">
          &nbsp; Checked-out
          </span>

          <span className="heading hspace-4">
          &nbsp; &nbsp; Total Time
          </span>

          <span className="heading hspace-1">
          Cost
          </span>

        </div>
      : null
    }
    </div>
  )}

