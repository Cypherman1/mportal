const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

console.log('Authenticated to firestore!')
const observer = db.collection('matches').onSnapshot((querySnapshot) => {
  querySnapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      console.log('New city: ', change.doc.data())
    }
    if (change.type === 'modified') {
      console.log('Modified city: ', change.doc.data())
      admin
        .auth()
        .listUsers()
        .then((getUsersResult) => {
          console.log('Successfully fetched user data:')
          getUsersResult.users.forEach((userRecord) => {
            console.log(userRecord)
          })
        })
        .catch((error) => {
          console.log('Error fetching user data:', error)
        })
    }
    if (change.type === 'removed') {
      console.log('Removed city: ', change.doc.data())
    }
  })
})
