import React, { Component }from 'react'
import { connect } from 'react-redux'


export default
class Enter extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id="main">


              {this.props.children}


      </div>

    )
  }
}
