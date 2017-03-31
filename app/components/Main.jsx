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
import CatFlick from './CatFlick'
import Time from './Time'
import List from './List'

import EnterName from './EnterName'
import NameBank from './NameBank'



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





const onEnterCards = () => {

}

const onEnterOneCat = (nextState) => {
  store.dispatch(getOneCat("-KcpgqxCFG2mogPCobYh"))
                           //nextState.params.name))
}



ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
      <Route path='/' component={Enter} >
        <IndexRedirect to="/cat" />
        <Route path="/cat" component={CatFlick} />
        {//<Route path='/cats' component={Cards} onEnter={onEnterCards} />
      }
        <Route path="/signup" component={SignUp} />
        <Route path="/add" component={Add} />

      </Route>

      <Route path='/visit' component={EnterVisitor} />
      <Route component={EnterVisitor}>
        <Route component={Scroll} />
        <Route path='/visitor' component={VisitorsContainer} />
        <Route path='/history' component={VisitorHistory} >
            <Route path='/list' component={List} />
            <Route path='/time' component={Time} />
        </Route>
      </Route>

      <Route path='/names' component={EnterName} />
      <Route component={EnterName}>
        <Route component={Scroll} />
        <Route path='/names' component={NameBank}/>
      </Route>

    </Router>
  </Provider>,
document.getElementById('app')
)

