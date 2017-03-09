

// age

export const getAge = (dob, filter) => {

  const now = new Date()
  const dobString = new Date(dob)
  console.log('dobString ', dobString)

  let years = now.getUTCFullYear() - dobString.getUTCFullYear()
  let months = (filter !== 'y') ? now.getUTCMonth() - dobString.getUTCMonth() : null
  let days = (filter === 'd') ? now.getUTCDate() - dobString.getUTCDate() : null

console.log('diff ', years, months, days)

  function daysInPriorMonth() {
    const thisYear = now.getUTCFullYear()
    const thisMonth = now.getUTCMonth()
    let priorMonth, theYear
    if (thisMonth - 1 < 0) {
      priorMonth = thisMonth + 11
      theYear = thisYear - 1
    } else {
      priorMonth = thisMonth - 1
      theYear = thisYear
    }
    return new Date(theYear, priorMonth, 0).getDate()
  }
console.log('daysinprior month ', daysInPriorMonth())


  if (days < 0) {
    months--
    days += daysInPriorMonth()
  }

  if (months < 0) {
    years--
    months += 12
  }

  console.log(years, months, days)

 let age = (years? `${years} years` : '') +
      (years && months || years && days ? ', ' : '') +
      ((months && filter !== 'y') ? `${months} months` : '') +
      (months && days ? ', ' : '') +
      ((days && filter === 'd') ? `${days} days` : '')

  return age
}


export const calcAge = (dob) => {
    let age
    if (dob.length === 10) { //if exact date
        console.log('dob ', dob, dob.length)
      age = getAge(dob, 'd')
    } else if (dob.length === 7) { //if year and month
      age = getAge(dob, 'm')
    } else if (dob.length === 4) {
      age = getAge(dob, 'y')
    }
    return age
  }
