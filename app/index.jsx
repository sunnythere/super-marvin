import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import store from './store'

import Enter from './components/Enter'

import SignUp from './components/SignUp'
import Add from './components/Add'
// import AddCat from './AddCat'
// import OneCat from './OneCat'
import EnterVisitor from './components/EnterVisitor'
import Scroll from './components/Scroll'
import Navbar from './components/Navbar'
import Navbar2 from './components/Navbar2'
import VisitorsContainer from './components/VisitorsContainer'
import VisitorHistory from './components/VisitorHistory'
import CatFlick from './components/CatFlick'
import Time from './components/Time'
import List from './components/List'

import EnterName from './components/EnterName'
import NameBank from './components/NameBank'



import { getAllCats, getOneCat } from './reducers/feline'
import { getAllNames, getAllTags } from './reducers/names'
import { getAllVisitorsToday, updateVisitorLog } from './reducers/visitors'
import { setCurrentUser } from './reducers/user'

import { auth } from './firebase'


auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(setCurrentUser({email: user.email}))
    console.log(`hey, ${user.email}!`)
  } else {
    console.log('no user signed in')
  }
});





const onEnterNames = () => {
  store.dispatch(getAllNames())
  store.dispatch(getAllTags())
}

const onLeaveNames = () => {
  store.dispatch(getAllNames()())
  store.dispatch(getAllTags()())
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
           { // <Route path='/time' component={Time} />
         }
        </Route>
      </Route>

      <Route path='/name-enter' component={EnterName} />
      <Route component={EnterName}>
        <Route component={Scroll} />
        <Route path='/names' component={NameBank} onEnter={onEnterNames} onLeave={onLeaveNames}/>
      </Route>

    </Router>
  </Provider>,
document.getElementById('app')
)

