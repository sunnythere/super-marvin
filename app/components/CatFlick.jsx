import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMsg } from '../reducers/msgs'

const mapDispatch = (dispatch) => {
  return {
    sendMsg(msg) {dispatch(sendMsg(msg))}
  }

}
const mapState = (state) => {
  return ({})
}

export default connect(mapState, mapDispatch)(class CatFlick extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clickTrue: false,
      msg: '',
      sendClick: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(evt) {
    evt.preventDefault()
    this.setState({ clickTrue: !this.state.clickTrue })
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({ msg: evt.target.value })
  }

  handleSubmit() {
    this.setState({ sendClick: true })
    let thingsSaid = this.state.msg
    this.props.sendMsg(thingsSaid)
  }


  render() {
    return (
      <div id="col-12">
        <div id="catflick-div" onClick={this.handleClick}>

        </div>

        <br/>
        { this.state.clickTrue &&
        <div id="msg-div">
          Hi.  You've reached Alice. <br/>
          This space is still under construction.  <br/>
          Please leave a message. <br />


          { !this.state.sendClick ?
              <form>
              <textarea name="msg" value={this.state.msg} id="msg" onChange={this.handleChange}/>
              <br/>

              <img id="mail-img" src="img/envelope.png" alt="send!" onClick={this.handleSubmit} />
              </form>
            : <div><br/>Message sent.  Thank you!</div>
          }
        </div>
        }

      </div>
    )
  }
})
