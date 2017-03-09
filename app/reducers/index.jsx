import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  feline: require('./feline').default,
  user: require('./user').default,
  visitors: require('./visitors').default,
  cost: require('./cost').default
});

export default rootReducer
