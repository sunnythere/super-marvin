import axios from 'axios'
import moment from 'moment-timezone'


const RECEIVE_ASTRO = 'RECEIVE_ASTRO'

const initialState = {
  astro: ''
}

const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
      case RECEIVE_ASTRO:
        newState.astro = action.astro
        break

      default:
        return state
    }
    return newState
}


const receiveAstro = (astro) => ({
  type: RECEIVE_ASTRO,
  astro
})

export const getAstroInfo = (today) =>
  (dispatch) => {
    axios.get(`https://api.sunrise-sunset.org/json?lat=40.785091&lng=-73.968285&date=${today}&formatted=0`)
    .then(res => {
      if (res.data.status === "OK") {
        //console.log(res.data.results)
        /* results:
          {
            astronomical_twilight_begin: "2017-04-19T08:29:12+00:00",
            nautical_twilight_begin: "2017-04-19T09:06:00+00:00",
            civil_twilight_begin: "2017-04-19T09:40:42+00:00",
            sunrise: "2017-04-19T10:09:24+00:00",

            day_length: 48648,

            solar_noon: "2017-04-19T16:54:48+00:00",

            sunset: "2017-04-19T23:40:12+00:00"
            civil_twilight_end: "2017-04-20T00:08:54+00:00",
            nautical_twilight_end: "2017-04-20T00:43:36+00:00",
            astronomical_twilight_end: "2017-04-20T01:20:24+00:00",
          },
          response: "OK"
        }
        */
        let timeZ = moment.tz.guess()
        let currentTime = moment().tz(timeZ)
        let possiblePhase = ['astronomical_twilight_end', null]
        for (let timePhase in res.data.results) {
          if (res.data.results.hasOwnProperty(timePhase) && timePhase !== 'day_length' && timePhase !== 'solar_noon') {
            let astroTime = (moment.tz(res.data.results[timePhase], 'UTC')).tz(timeZ)
            let diff = currentTime.diff(astroTime)

            if (diff >= 0) {
              if (diff < possiblePhase[1] || possiblePhase[1] === null) {
                possiblePhase = [timePhase, diff]
              }
            }
          }
        }
        //if all diff values are negative, then it's night-- set to astronomical_twilight_end
        dispatch(receiveAstro(possiblePhase[0]))
      }
   })
  }


export default reducer
