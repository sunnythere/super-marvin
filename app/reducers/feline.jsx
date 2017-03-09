import { database } from '../firebase'

const ALL_CATS = 'ALL_CATS'
const ONE_CAT = 'ONE_CAT'

const initialState = {
  cats: [],
  oneCat: {}
}

const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
      case ALL_CATS:
        newState.cats = action.cats
        break
      case ONE_CAT:
        newState.oneCat = action.cat
        break

      default:
        return state
    }
    return newState
}


const allCats = (cats) => ({
  type: ALL_CATS,
  cats
})

export const oneCat = (cat) => ({
  type: ONE_CAT,
  cat
})

export const getAllCats = () =>
  (dispatch) => {
    database()
    .ref('cats')
    .once('value', (snapshot) => {

      if (snapshot.val()) {
        //snapshot.val() is our cats obj, w/ indiv cat obs inside
        let catArr = []
        for (let key in snapshot.val()) {
          let catObj = Object.assign({}, snapshot.val()[key], {key: key})
          catArr.push(catObj)
        }

        dispatch(allCats(catArr))
      }
    })
  }


export const getOneCat = (catKey) =>
  (dispatch) => {
    database()
    .ref(`cats/${catKey}`)
    .once('value', (snapshot) => {

      if (!snapshot.val()) {
        return null
      } else {
        dispatch(oneCat(snapshot.val()))
      }
    })
  }


export const getOneCatByName = (catName) =>
  (dispatch) => {
    database()
    .ref('cats')
    .orderByChild('name')
    .equalTo(catName)
    .limitToFirst(1)
    .once('value', (snapshot) => {

      if (!snapshot.val()) {
        return null
      } else {
        return snapshot.val()
      }
    })
  }


export const addACat = (catObj) =>
  (dispatch) =>
    database().ref('cats').push(catObj)




export default reducer
