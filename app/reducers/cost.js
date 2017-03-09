

const initialState = {
  rate: 5,
  time: 30
}

const CHANGE_RATE = 'CHANGE_RATE'
const CHANGE_TIME = 'CHANGE_TIME'

export const changeRate = (newRate) => ({
  type: CHANGE_RATE,
  newRate
})

export const changeTime = (newTime) => ({
  type: CHANGE_TIME,
  newTime
})


const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch(action.type) {
      case CHANGE_RATE:
        newState.rate = action.newRate
        break
      case CHANGE_TIME:
        newState.time = action.newTime
        break
      default:
        return state
    }
    return newState
}

export default reducer
