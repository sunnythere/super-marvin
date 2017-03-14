import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMsg } from '../reducers/msgs'
import { randomInt } from '../util/random'

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
      sendClick: false,
      popUpX: '',
      popUpY: '',
      showContextMenu: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
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

  handleContextMenu(evt) {
    evt.preventDefault()

    this.setState({
      popUpX: evt.clientX,
      popUpY: evt.clientY,
      showContextMenu: true
    })
    window.addEventListener('click', this.contextMenuClose, false)
  }

  contextMenuClose(evt) {
    evt.preventDefault()

    this.setState({
      showContextMenu: false,
      popUpX: '',
      popUpY: ''
    })
    window.removeEventListener('click', this.contextMenuClose, false)
  }


  render() {

  const style = {
    position: 'fixed',
    top: `${this.state.popUpY}px`,
    left: `${this.state.popUpX}px`,
    backgroundColor: 'white',
    border: '1px solid rgba(180,180,180,.8)',
    borderRadius: '5px',
    padding: '.3rem'
  }

  let catSays;
  switch (randomInt(6)) {
    case 1:
      catSays = "meow"
      break;
    case 2:
      catSays = "hey."
      break;
    case 3:
      catSays = "purrrrr"
      break;
    case 4:
      catSays = "stealing is bad."
      break;
    case 5:
      catSays = "I'm a css keyframe animation using a sprite."
      break;
    case 6:
      catSays = "hello"
      break;
    case 7:
      catSays = "hey there."
      break;
    case 8:
      catSays = "how YOU doin?"
      break;
    case 9:
      catSays = "meow"
      break;
    default:
      catSays = "mrrrreow"
      break;
  }


    return (
      <div id="col-12">
        <div id="catflick-div" onClick={this.handleClick} onContextMenu={this.handleContextMenu}>

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

        { this.state.showContextMenu &&
        <div style={style}>{catSays}</div>
        }

      </div>
    )
  }
})
