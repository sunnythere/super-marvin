import { database } from '../firebase'


const initialState = {
  visitorsToday: {},
  oneVisitor: {}
}

const ALL_VISITORS = 'ALL_VISITORS'
const ONE_VISITOR = 'ONE_VISITOR'
const ADD_VISITOR = 'ADD_VISITOR'




const allVisitorsToday = (visitorsToday) => ({
  type: ALL_VISITORS,
  visitorsToday
})

const addVisitor = (visitorObj) => ({
  type: ADD_VISITOR,
  visitorObj
})

export const oneVisitor = (visitor) => ({
  type: ONE_VISITOR,
  visitor
})

const deleteVisitor = (visitorNum) => ({
  type: DELETE_VISITOR
})

/* -------------- reducer ----------------- */
const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
      case ALL_VISITORS:
        newState.visitorsToday = action.visitorsToday
        break
      case ADD_VISITOR:
        newState.visitorsToday = [... state.visitorsToday, action.visitorObj]
        break
      case ONE_VISITOR:
        newState.visitor = action.visitor
        break

      default:
        return state
    }
    return newState
}

export const getAllVisitorsToday = (date) =>
  (dispatch) => {
  const ref = database()
    .ref(`visitors/${date.toDateString()}`)

  const listener = ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        //put on state
        dispatch(allVisitorsToday(snapshot.val()))
      }
    })

  return () => ref.off('value', listener)
}


export const getVisitors = (dateString) =>
  (dispatch) => {
     return database()
      .ref(`visitors/${dateString}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
            console.log("snapshot in IF ", snapshot.val())
          return snapshot.val()
        } else {
          console.log("ATTN: date not found")
          return null
        }
      })
      .catch(err => console.log(err))
    }



// only same-day
export const addToVisitorLog = (count, TimeObj) =>
  (dispatch) => {
    const date = new Date()
    const newRef = database().ref(`visitors/${date.toDateString()}/${count}`).set(TimeObj)
  }


// export const getOneVisitor = (idx) => {
//   (dispatch) =>
//     database()
//       .ref('visitors')
//       .child(`${idx}`)
//       .once('value', (snapshot) => {
//         dispatch(oneVisitor(snapshot.val()))
//       })
// }


export const updateVisitorLog = (key, visitorInfo) =>
  (dispatch) => {
    const date = new Date()
    let ref = database()
      .ref(`visitors/${date.toDateString()}/${key}`)

    let newVisitorObj
    ref.once('value', (snapshot) => {
        newVisitorObj = Object.assign({}, snapshot.val(), visitorInfo)
    })

    ref.set(newVisitorObj)
}


export const deleteOneVisitor = (key) =>
  (dispatch) => {
    const date = new Date()
      database()
      .ref(`visitors/${date.toDateString()}/${key}`)
      //.once('value', function(snapshot) { console.log('snapshot' ,snapshot.val())})
      .remove()
      .catch(err => console.log(err))
  }




export default reducer

