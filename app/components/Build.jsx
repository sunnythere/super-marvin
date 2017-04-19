import React, { Component } from 'react'
import { connect } from 'react-redux'
import { randomInt } from '../util/random'



export default
class Build extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showMsg0: false,
      showMsg1: false,
      showInfo: false,
      catSays: null,
      showContextMenu: false,
      build2position: 0
    }

    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
    this.checkViewport = this.checkViewport.bind(this)

    this.toggleMsg = (msg) => (evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      this.setState({ [msg]: !this.state[msg] })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkViewport, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkViewport)
  }

  checkViewport() {

  //   console.log(window.pageYOffset)
  //   let position = 100% -(window.pageYOffset * 0.25) + "" + "px"
  //   console.log('position ', position)
  //   this.setState({ build2position: position })
  }

  handleContextMenu(evt) {
    evt.preventDefault()

    let meow;
    switch (randomInt(9)) {
      case 1:
        meow = "meow"
        break;
      case 2:
        meow = "hey."
        break;
      case 3:
        meow = "purrrrr"
        break;
      case 4:
        meow = "hey hey"
        break;
      case 5:
        meow = "I'm a css keyframe animation using a tiny sprite, with an onContextMenu function."
        break;
      case 6:
        meow = "hello"
        break;
      case 7:
        meow = "hey there."
        break;
      case 8:
        meow = "how YOU doin?"
        break;
      case 9:
        meow = "mew"
        break;
      default:
        meow = "mrrrreow"
        break;
    }

    this.setState({
      showContextMenu: true,
      catSays: meow
    })

    window.addEventListener('click', this.contextMenuClose, false)
  }

  contextMenuClose(evt) {
    evt.preventDefault()

    this.setState({
      showContextMenu: false
    })
    window.removeEventListener('click', this.contextMenuClose, false)
  }


  render() {

    const style = {
      cat:  {
        position: 'fixed',
        bottom: '185px',
        left: '40px',
        backgroundColor: 'white',
        border: '1px solid rgba(180,180,180,.8)',
        borderRadius: '5px',
        padding: '.1rem',
        zIndex: '4'
      }
      // ,
      // build2: {
      //   bottom: this.state.build2position
      // }
    }

    return (
      <div className="build-blue" >

          <div id="click0" onClick={this.toggleMsg('showMsg0')}/>
          <div id="click1" onClick={this.toggleMsg('showMsg1')}/>


          <div className="build0" style={this.props.opacity}>

            <div id="build0img-l" />

            { this.state.showMsg0 &&
              <div className="hello">

                <span>hi.<br/>
                my name is Alice.
                </span>

              </div>
            }

          </div>

          <div className="build0 z2">

            <div id="calico-divsm" onContextMenu={this.handleContextMenu}/>

            { this.state.showContextMenu &&
              <div style={style.cat}>{this.state.catSays}</div>
            }

            <div id="build0img" />

            { this.state.showMsg1 &&
              <div className="links">
                <span>
                some places you can find me:<br />
                  <i className="fa fa-github" aria-hidden="true" /> <a href="http://www.github.com/sunnythere">github</a><br />
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i> <a href="http://www.linkedin.com/in/yawenalice">linkedin</a><br/>
                  <i className="fa fa-instagram" aria-hidden="true"></i> <a href="http://www.instagram.com/hyphenlowercase">instagram</a>
                </span>
              </div>
            }

            <div id="infostar"><a onClick={this.toggleMsg('showInfo')} className="nostylelink">*</a>

              { this.state.showInfo &&
                <div id="infobubble">The cityscape cutouts were created from pages of a 2010 edition of one of my favoriate periodicals, <a href="https://www.good.is/" className="darkgrey">Good Magazine</a>. The edition is about finding work… published back when Good still published paper things regularly.  I had it laying around. Because apparently I am sometimes a hoarder.
                </div>
              }
            </div>

          </div>


          <div className="overflow">
            <div id="build2img"/>
            <div id="build2aimg" />
          </div>

      </div>

    )
  }
}
