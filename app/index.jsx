import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import store from './store'

import Enter from './components/Enter'
import SignUp from './components/SignUp'
import EnterVisitor from './components/EnterVisitor'
import Scroll from './components/Scroll'
import Scroll1 from './components/Scroll1'
import VisitorsContainer from './components/VisitorsContainer'
import VisitorHistory from './components/VisitorHistory'
import List from './components/List'
import EnterName from './components/EnterName'
import NameBank from './components/NameBank'


import { getAllCats, getOneCat } from './reducers/feline'
import { getAllNames, getAllTags } from './reducers/names'
import { getAllVisitorsToday, updateVisitorLog } from './reducers/visitors'
import { setCurrentUser } from './reducers/user'
import { setTodaysDate } from './reducers/date'
import { getAstroInfo } from './reducers/weather'

import { auth } from './firebase'


auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(setCurrentUser({email: user.email}))
    console.log(`hey, ${user.email}!`)
  } else {
    console.log('no user signed in')
  }
});


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-96579350-1', 'auto');
ga('send', 'pageview');



const onBuildEnter = () => {
  let today = moment().format("YYYY-MM-DD")
  store.dispatch(setTodaysDate(today))
  store.dispatch(getAstroInfo(today))
}

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
        <IndexRedirect to="/build" />
        <Route path="/build" component={Scroll1} onEnter={onBuildEnter} />

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
        <Route path="/signup" component={SignUp} />

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

