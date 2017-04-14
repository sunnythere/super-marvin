import React, { Component } from 'react'
import { connect } from 'react-redux'


export default
class Build extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showMsg0: false,
      showMsg1: false,
      showInfo: false
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

            <div id="build0img-l"></div>

            { this.state.showMsg0 &&
              <div className="hello">

                <span>hi.<br/>
                my name is Alice.
                </span>

              </div>
            }

          </div>

          <div className="build0 z2">
            <div id="build0img"></div>

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

            <div id="infostar"><a onClick={this.toggleMsg('showInfo')} className="nostylelink">*</a>

              { this.state.showInfo &&
                <div id="infobubble">The cityscape cutouts are made from pages of a 2010 edition of one of my favoriate periodicals,<a href="https://www.good.is/">Good Magazine</a>. The edition is about finding work… published back when Good still published paper things regularly.  I had it laying around, because apparently I am sometimes a hoarder?</div>
              }

            </div>
          </div>


          { //this.state.showInfo &&
            //<div id="infobubble"></div>
          }




      </div>

    )
  }
}
