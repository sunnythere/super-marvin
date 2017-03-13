const functions = require('firebase-functions');
const bodyParser = require('body-parser').urlencoded({extended: true});
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })


//exports.newMsg =
//functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
//       const message = req.body.msg
//       let day = new Date()
//         day.toString()
//       admin.database().ref('/msgs').push({ time: day, msg: message })
//       console.log('message sent');
//       res.sendStatus(200);
//   })

// })
