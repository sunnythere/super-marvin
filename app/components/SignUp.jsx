import React from 'react'
import { auth } from '../firebase'

export default class SignUp extends React.Component {

constructor(props) {
  super(props)
  this.state =  {
    email: '',
    pswd0: '',
    dirty0: false,
    pswd1: '',
    dirty1: false,
    msg: 'your passwords do not match',
    pMismatch: false
  }



  this.handleSubmit = this.handleSubmit.bind(this)
  this.handlePWMatch = this.handlePWMatch.bind(this)

  this.handleChange = type => event => {
    const { value } = event.target
    this.setState({
      [type]: value,
    })

    if (type.match(/[0-9]/)) {
      let num = type.match(/[0-9]/)[0]
      let key = `dirty${num}`
      this.setState({ [key]: true })
    }
  }
}

handlePWMatch(evt) {
  console.log('match evt ', evt.target)
      console.log('0' , this.state.pswd0,'1', this.state.pswd1 )
    if (this.state.pswd0 === this.state.pswd1) {
      this.setState({ pMismatch: false })
    }
    if (this.state.dirty0 && this.state.dirty1 && (this.state.pswd0 !== this.state.pswd1)) {
      this.setState({ pMismatch: true })
    }
}

handleSubmit(evt) {
  evt.preventDefault()
  if (this.state.pMismatch) {
    this.setState({ msg: 'Please enter matching passwords.'})
  } else {
    const email = this.state.email
    const pswd = this.state.pswd0

    auth().createUserWithEmailAndPassword(email, pswd).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`)
    });
  }
}



render() {
  return(
    <div>
    <p>Sign Up for an Account</p>
      <form onSubmit={this.handleSubmit}>
        <input type="email" placeholder="email" value={this.state.email} onChange={this.handleChange('email')}/>
        <br/>
        <input type="password" placeholder="password" value={this.state.pswd0} onChange={this.handleChange('pswd0')} onBlur={this.handlePWMatch}/>
        <br/>
        <input type="password" placeholder="password again" value={this.state.pswd1} onChange={this.handleChange('pswd1')} onBlur={this.handlePWMatch}/>
        <br/>
        { this.state.pMismatch &&
          <div>{this.state.msg}</div>
        }
        <br/>
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

}
