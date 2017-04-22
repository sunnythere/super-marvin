import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { randomInt } from '../util/random'
import { setTodaysDate } from '../reducers/date'
import { getAstroInfo } from '../reducers/weather'


const mapState = (state) => {
  return ({
    date: state.date,
    astro: state.weather.astro
  })
}

const mapDispatch = { getAstroInfo, setTodaysDate }

export default connect(mapState, mapDispatch)(
class Build extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showMsg0: false,
      showMsg1: false,
      showInfo: false,
      catSays: null,
      showContextMenu: false,
      build2position: '-2000px',
      theTime: '',
      timeOffSet: 0,
      bground: 'buildBG yellowBlue',
      touches: [],
      touchLength: 0
    }

    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
    this.checkViewport = this.checkViewport.bind(this)
    this.setBackground = this.setBackground.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)

    this.toggleMsg = (msg) => (evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      this.setState({ [msg]: !this.state[msg] })
    }
  }

  componentDidMount() {
    document.body.addEventListener('scroll', this.checkViewport, false);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.astro !== this.props.astro) {
      this.setBackground(nextProps.astro)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('scroll', this.checkViewport)
  }

  checkViewport() {
    let position = (-(window.innerHeight * 0.5)  - (window.pageYOffset * 0.5)) + "" + "px"
    this.setState({ build2position: position })
  }

  handleContextMenu(evt) {
    evt.preventDefault()

    let meow;
    switch (randomInt(9)) {
      case 1:
        meow = "meow"
        break;
      case 2:
        meow = "oh, hey.  funny seeing you here."
        break;
      case 3:
        meow = "purrrrr"
        break;
      case 4:
        meow = "hey hey"
        break;
      case 5:
        meow = "I'm a css keyframe animation using a tiny sprite, with onContextMenu/onTouchStart/onTouchEnd functions."
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

    document.body.addEventListener('click', this.contextMenuClose, false)
    document.body.addEventListener('touchend', this.contextMenuClose, false)
  }

  contextMenuClose(evt) {
    evt.preventDefault()
    this.setState({
      showContextMenu: false
    })
    document.body.removeEventListener('click', this.contextMenuClose, false)
    document.body.removeEventListener('touchend', this.contextMenuClose, false)
  }

  setBackground(astroVar) {
      // console.log('SET BACKGROUND', astroVar)
      let bground
      switch (astroVar) {
        case 'astronomical_twilight_begin':
          bground = 'buildBG yellowBlue'
          break;
        case 'nautical_twilight_begin':
          bground = 'buildBG yellowBlue'
          break;
        case 'civil_twilight_begin':
          bground = 'buildBG yellowPink'
          break;
        case 'sunrise':
          bground = 'buildBG blueYellow'
          break;
        case 'sunset':
          bground = 'buildBG pinkYellow'
          break;
        case 'civil_twilight_end':
          bground = 'buildBG darkBlue'
          break;
        case 'nautical_twilight_end':
          bground = 'buildBG darkBlue'
          break;
        case 'astronomical_twilight_end':
          bground = 'buildBG darkBlueRev'
          break;
        default:
          bground = 'buildBG blueYellow'
          break;
      }
      this.setState({ bground: bground })
  }

  handleTouchStart(evt) {
    evt.preventDefault()
    let startTime = new Date()
    this.setState({ touchLength: startTime})
  }

  handleTouchEnd(evt) {
    let endTime = new Date()
    console.log('endTime:' , endTime)
    let diff = Number(endTime) - Number(this.state.touchLength)
    if (diff >= 900) {
      this.handleContextMenu(evt)
    }
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
      //,
      // build2: {
      //   bottom: this.state.build2position
      // }
    }

    return (
      <div className={this.state.bground}>

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

            <div id="calico-divsm" onContextMenu={this.handleContextMenu} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}/>

            { this.state.showContextMenu &&
              <div style={style.cat}>{this.state.catSays}</div>
            }

            <div id="build0img" />

            { this.state.showMsg1 &&
              <div className="links">
                <span>
                some places you can find me:<br />
                  <i className="fa fa-github" aria-hidden="true" /> <a href="http://www.github.com/sunnythere">github</a><br />
                  <i className="fa fa-linkedin-square" aria-hidden="true" /> <a href="http://www.linkedin.com/in/yawenalice">linkedin</a><br/>
                  <i className="fa fa-instagram" aria-hidden="true" /> <a href="http://www.instagram.com/hyphenlowercase">instagram</a>
                </span>
              </div>
            }

          </div>


          <div id="build2img" style={style.build2}/>
          <div id="build2aimg" />


          <div id="infostar"><a onClick={this.toggleMsg('showInfo')} className="nostylelink">*</a>

              { this.state.showInfo &&
                <div id="infobubble">
                * The cityscape cutouts were created from pages of a 2010 edition (the Work issue) of one of my favorite periodicals, <a href="https://www.good.is/" className="darkgrey">Good Magazine</a>. I had it laying around. Because apparently I am sometimes a hoarder.
                <br />
                * The background gradient uses <a href="https://sunrise-sunset.org/api" className="darkgrey">the sunrise and sunset API</a>.
                <br />
                * Things are still changing and moving...
                <br />
                <span className="bottom">--> hyphenlowercase at gmail</span>
                </div>
              }
            </div>

      </div>

    )
  }
})
