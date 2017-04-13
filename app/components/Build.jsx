import React, { Component } from 'react'
import { connect } from 'react-redux'


export default
class Build extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showMsg0: false,
      showMsg1: false
    }

    this.toggleMsg = (msg) => (evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      this.setState({ [msg]: !this.state[msg] })
    }
  }



  render() {

    return (
      <div className="build-blue" >

        <div id="click0" onClick={this.toggleMsg('showMsg0')}/>
        <div id="click1" onClick={this.toggleMsg('showMsg1')}/>


        <div className="build0" style={this.props.opacity}>

          <img className="build0img" src="img/build0-light0sm.png" />

          { this.state.showMsg0 &&
            <div className="hello">

              <span>hi.<br/>
              my name is Alice.
              </span>

            </div>
          }

        </div>

        <div className="build0 z2">
          <img className="build0img" src="img/build0sm.png" />
          { this.state.showMsg1 &&
            <div className="links">
              <span>
              some places you can find me:<br/>
                <a href="http://www.github.com/sunnythere">github</a><br/>
                <a href="http://www.linkedin.com/in/yawenalice">linkedin</a><br/>
                <a href="http://www.instagram.com/hyphenlowercase">instagram</a>
              </span>
            </div>
          }
        </div>



      </div>

    )
  }
}
