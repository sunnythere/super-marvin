

const SET_DATE = 'SET_DATE'

const reducer = (state = null, action) => {
  switch (action.type) {
  case SET_DATE:
    return action.date
  }
  return state
}


const setDate = (date) => ({
  type: SET_DATE,
  date
})

export const setTodaysDate = (dateStr) =>
  (dispatch) => dispatch(setDate(dateStr))


export default reducer
