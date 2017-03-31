import React, { Component }from 'react'
import { connect } from 'react-redux'
//import Navbar from './Navbar'
import Scroll from './Scroll'


export default
class Enter extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id="div-main-visitor" className="parallax">
        <Scroll path={this.props.location.pathname}/>

        <div id="div-view">

              {this.props.children}

        </div>
      </div>

    )
  }
}
