const functions = require('firebase-functions');
const bodyParser = require('body-parser').urlencoded({extended: true});
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


// exports.newMsg =
// functions.database.ref('/msg')
//   .onWrite(event => {
//     const words = event.data.val()
//     console.log('words', words)
//   })

