import React from 'react'
import { auth } from '../firebase'

export default class SignUp extends React.Component {

constructor(props) {
  super(props)
  this.state =  {
    email: '',
    pswd: ''
  }



  this.handleSubmit = this.handleSubmit.bind(this)

  this.handleChange = type => event => {
    const { value } = event.target
    this.setState({
      [type]: value,
    })
  }
}


handleSubmit(evt) {
  evt.preventDefault()
  const email = this.state.email
  const pswd = this.state.pswd

  auth().createUserWithEmailAndPassword(email, pswd).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(`${errorCode}: ${errorMessage}`)
});
}



render() {
  return(
    <div>
    <p>Sign Up for an Account</p>
      <form onSubmit={this.handleSubmit}>
        <input type="email" placeholder="email" value={this.state.email} onChange={this.handleChange('email')}/>
        <input type="password" placeholder="password" value={this.state.pswd} onChange={this.handleChange('pswd')}/>
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

}
