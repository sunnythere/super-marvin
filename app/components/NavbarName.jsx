import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { setCurrentUser } from '../reducers/user'
// import catface from '../img/catface-2.png'
// import catface2 from '../img/catface-2-white.png'

const mapState = (state) => ({
  currentUser: state.user.currentUser
})

const mapDispatch = {
  setCurrentUser
}


export default connect(mapState, mapDispatch)(class NavbarName extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginShow: false,
      menuShow: false,
      transForm: '',
      menuImgSrc: 'img/catface-2.png'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleLogin = this.toggleLogin.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }


  handleChange(type) {
    return (
      (event) => {
        const { value } = event.target
        this.setState({ [type]: value })
      }
    )
  }

  componentDidMount() {
    //console.log("PROPS!!!!!", this.props)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const email = this.state.email
    const pswd = this.state.pswd

    auth().signInWithEmailAndPassword(email, pswd).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`)
    })
    this.setState({ loginShow: false })

  }

  handleSubmitLogout(evt) {
    evt.preventDefault()
    auth().signOut().then(function() {
      console.log('Sign-out successful.')
    }, function(error) {
      console.log('An error happened.')
     });
    // this.props.setCurrentUser({})

  }

  toggleLogin (evt) {
    this.setState({ loginShow: !this.state.loginShow })
  }

  toggleMenu(evt) {
    console.log('menu toggle~')
    this.setState({ menuShow: !this.state.menuShow })
  }

  handleMouseOver(evt) {
    this.setState({ menuImgSrc: 'img/catface-2-white.png' })
  }
  handleMouseOut(evt) {
    this.setState({ menuImgSrc: 'img/catface-2-white.png' })
  }

render() {
  let opacity = this.props.opacity2
  let scrollStyle = {
    backgroundColor: `rgba(40,40,40,${opacity})`
  }

  let path = this.props.path


  return (

    <div id="navbar-name" style={scrollStyle}>


      <div>

        <h2>Name Bank</h2>

        <div id="catface"  onClick={this.toggleMenu}><img src={this.state.menuImgSrc} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/></div>

          { this.state.menuShow &&
            <div className="menu">
              {
                !this.props.currentUser.email ?
                <p onClick={this.toggleLogin}>Login</p>

               : <div>

                  <p onClick={this.handleSubmitLogout}>Logout</p>
                 </div>

              }



              { this.state.loginShow &&
                <div className="div-inner-container">
                  <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="email" value={this.state.email} onChange={this.handleChange('email')}/>
                    <input type="password" placeholder="password" value={this.state.pswd} onChange={this.handleChange('pswd')}/>
                    <input type="submit" value="submit" />
                  </form>
                </div>
              }
            </div>
          }
      </div>
    </div>
  )}
})
