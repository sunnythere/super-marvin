//Main.jsx

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import store from '../store'
import Enter from './Enter'

import SignUp from './SignUp'
import Add from './Add'
// import AddCat from './AddCat'
// import OneCat from './OneCat'
import EnterVisitor from './EnterVisitor'
import Scroll from './Scroll'
import Navbar from './Navbar'
import Navbar2 from './Navbar2'
import VisitorsContainer from './VisitorsContainer'
import VisitorHistory from './VisitorHistory'

import { getAllCats, getOneCat } from '../reducers/feline'
import { getAllVisitorsToday, updateVisitorLog } from '../reducers/visitors'
import { setCurrentUser } from '../reducers/user'

import { auth } from '../firebase'


auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(setCurrentUser({email: user.email}))
    console.log(`hey, ${user.email}!`)
  } else {
    console.log('no user signed in')
  }
});


store.dispatch(getAllCats())

const onEnter = () => {

}

const onEnterCards = () => {

}

const onEnterOneCat = (nextState) => {
  store.dispatch(getOneCat("-KcpgqxCFG2mogPCobYh"))
                           //nextState.params.name))
}



ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
      <Route path='/' component={Enter} onEnter={onEnter}>

        {//<Route path='/cats' component={Cards} onEnter={onEnterCards} />
      }
        <Route path="/signup" component={SignUp} />
        <Route path="/add" component={Add} />

      </Route>
      <Route path='/visit' component={EnterVisitor} />
      <Route component={EnterVisitor}>
        <Route component={Scroll} />
        <Route path='/visitor' component={VisitorsContainer} />
        <Route path='/history' component={VisitorHistory} />
      </Route>

    </Router>
  </Provider>,
document.getElementById('app')
)
