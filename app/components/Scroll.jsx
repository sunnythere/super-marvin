import React, { Component } from 'react'
import Navbar from './Navbar'
import Navbar2 from './Navbar2'
import NavbarName from './NavbarName'


export default class Scroll extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacity: 0,
      opacity2: .5
    }

    this.handleScroll = this.handleScroll.bind(this)
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  onWindowScroll(evt) {

  }

  handleScroll(evt) {
    evt.preventDefault()
    let y = evt.target.body.scrollTop || evt.target.documentElement.scrollTop
    //srcElement deprecated; target.documentElement for Firefox, target.body for Chrome

  //  console.log("and we're scrolling...", y)
      // between 0-10 - transparent
      // between 10-60   - transitioning
        // 10: 0, 60: .9
      // above 60 - opaque-y

    let opacity2
    if (y < 10) opacity2 = .25
    else if (y < 150) opacity2 = (y-10)/200 + .25
    else if (y >= 150) opacity2 = 140/200 + .25

//console.log(opacity2)
    this.setState({ opacity2 })
  }


  render() {
    return (
        <div>
        { this.props.path === '/names' ?
          <NavbarName
            opacity2={this.state.opacity2} />
        : <div>
            <Navbar
             opacity={this.state.opacity2}
             path={this.props.path}/>
            <Navbar2
             opacity2={this.state.opacity2}
             path={this.props.path}/>
          </div>
        }
        </div>
    )
  }

}

