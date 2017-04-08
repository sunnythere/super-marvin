import firebase from 'firebase'
import { database } from '../firebase'

const ALL_NAMES = 'ALL_NAMES'
const ALL_TAGS = 'ALL_TAGS'
const ADD_ONE_NAME = 'ADD_ONE_NAME'

const initialState = {
  names: [],
  tags: [],
  oneName: {}
}

const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
      case ALL_NAMES:
        newState.names = action.names
        break
      case ALL_TAGS:
        newState.tags = action.tags
       break

      default:
        return state
    }
    return newState
}


const allNames = (names) => ({
  type: ALL_NAMES,
  names
})

const allTags = (tags) => ({
  type: ALL_TAGS,
  tags
})

const addAName = (name) => ({
  type: ADD_ONE_NAME,
  name
})


export const addOneName = (nameObj) =>
  (dispatch) => {
    nameObj.time = firebase.database.ServerValue.TIMESTAMP
    database().ref('names').push(nameObj)
  }

export const addOneTag = (newTag) =>
  (dispatch) => {
    database().ref('nametags').push(newTag)
}


export const getAllNames = () =>
  (dispatch) => {

  const ref = database()
    .ref('names')

  const listener = ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        //convert to array, put on state
        let nameArr = []
        for (let key in snapshot.val()) {
          let nameObj = Object.assign({}, snapshot.val()[key], {key: key})
          nameArr.push(nameObj)
        }
        dispatch(allNames(nameArr))
      }
    })

  //call to turn off listener
  return () => ref.off('value', listener)
  }


export const getAllTags = () =>
  (dispatch) => {

  const ref = database()
    .ref('nametags')

  const listener = ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        //convert to array, put on state
        let tagArr = []
        for (let key in snapshot.val()) {
          let tagObj = Object.assign({}, snapshot.val()[key], {key: key})
          tagArr.push(tagObj)
        }
        dispatch(allTags(tagArr))
      }
    })

  //call to turn off listener
  return () => ref.off('value', listener)
  }


export const getOneName = (nameKey) =>
  (dispatch) => {
    database()
    .ref(`names/${nameKey}`)
    .once('value', (snapshot) => {
      if (!snapshot.val()) {
        return null
      } else {
        return snapshot.val()
      }
    })
  }



export const removeNameFromList = (nameKey) =>
  (dispatch) => {
    let nameRef = database()
    .ref(`names/${nameKey}`)

    nameRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        database().ref(`oldNames/${nameKey}/`).set(snapshot.val())
        nameRef.remove()
        .catch(err => console.log(err))
      }
    })
  }




export default reducer
