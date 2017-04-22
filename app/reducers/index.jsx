import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  feline: require('./feline').default,
  user: require('./user').default,
  visitors: require('./visitors').default,
  cost: require('./cost').default,
  names: require('./names').default,
  weather: require('./weather').default,
  date: require('./date').default
});

export default rootReducer
