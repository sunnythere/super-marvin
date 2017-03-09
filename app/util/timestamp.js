import firebase from 'firebase'

//milliseconds since Unix Epoch
export const timeStamp = () => {
  //return firebase.database.ServerValue.TIMESTAMP
  return new Date().toString()
}
