import React, { Component }from 'react'
import { connect } from 'react-redux'


export default
class Enter extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id="div-main" className="parallax1">

        <div id="div-view">

              {this.props.children}

        </div>
      </div>

    )
  }
}
