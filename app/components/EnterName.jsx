import React, { Component } from 'react'
import Scroll from './Scroll'


export default (props) => {

  return (
    <div className="col-12">
      <Scroll path={props.location.pathname}/>

      <div>
            {props.children}
      </div>
    </div> )

}
