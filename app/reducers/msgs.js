import { database } from '../firebase'


export const sendMsg = (msg) =>
  (dispatch) => {
    let date = new Date()
    database().ref('msg').push({ date: date.toString(), msg: msg })
  }
