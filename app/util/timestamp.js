import firebase from 'firebase'

//milliseconds since Unix Epoch
export const timeStamp = () => {
  //return firebase.database.ServerValue.TIMESTAMP
  return new Date().toString()
}


export const convertTimeStr = (timeStr) => {
  let timeSplit = timeStr.split(' ')
  let timeSplit0 = timeSplit[0].split(':')

  let hour = Number(timeSplit0[0])
  if (timeSplit[1] === 'PM') {
    hour += 12
  }

  return [hour, Number(timeSplit0[1])]
        //[hour(24), min] - array of numbers

}
