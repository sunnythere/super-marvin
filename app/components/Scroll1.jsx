import React, { Component } from 'react'
import Build from './Build'

export default class Scroll extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacity: 0
    }

    this.handleScroll = this.handleScroll.bind(this)
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(evt) {
    evt.preventDefault()
    let y = evt.target.body.scrollTop || evt.target.documentElement.scrollTop
    //srcElement deprecated; target.documentElement for Firefox, target.body for Chrome

    let opacity
    if (y < 200) opacity = 0
    else if (y >= 200 && y < 700) opacity = y/500
    else if (y >= 700) opacity = 700/700

    //console.log(y)
    this.setState({ opacity })
  }


  render() {
    return (
        <div>

          <Build
            opacity={{opacity: this.state.opacity}} />

        </div>
    )
  }

}

  Scroll.propTypes = {
    handleScroll: React.PropTypes.func
  }
