
const All_USERS = 'All_USERS'
const ONE_USER = 'ONE_USER'

const initialState = {
  users: [],
  currentUser: {}
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case All_USERS:
      newState.users = action.users
      break
    case ONE_USER:
      newState.currentUser = action.user
      break
    default:
      return state
  }
  return newState
}

const getAllUsers = (users) => ({
  type: All_USERS,
  users
})

export const setCurrentUser = (user) => ({
  type: ONE_USER,
  user
})





export default reducer
