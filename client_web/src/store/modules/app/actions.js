import { db, firebase } from '@/firebase.js'

// const getServerTimeStamp = () => {
//   // Get a new write batch
//   var batch = db.batch()
//   // Set the value of 'NYC'
//   var nycRef = db.collection('servers').doc('timestamp')
//   batch.set(nycRef, { now: firebase.firestore.FieldValue.serverTimestamp() })

//   // Commit the batch
//   batch.commit().then(() => {
//     var docRef = db.collection('servers').doc('timestamp')
//     docRef
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           return doc.data().now
//         } else {
//           console.log('No such document!')
//         }
//       })
//       .catch((error) => {
//         console.log('Error getting document:', error)
//       })
//   })
//   return null
// }

function insertUnbet(matchId) {
  db.collection('profiles')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const betDocRef = db
          .collection('predictions')
          .doc(`${matchId}${doc.data().uid}`)
        betDocRef
          .get()
          .then(betDoc => {
            if (betDoc.exists) {
            } else {
              betDocRef.set({
                uid: doc.data().uid,
                matchId: matchId,
                bet: {
                  away: '-',
                  home: '-',
                  time: firebase.firestore.FieldValue.serverTimestamp()
                },
                score: {},
                point: 0,
                history: []
              })
            }
          })
          .catch(error => {
            console.log('Error getting document:', error)
          })
      })
    })
    .catch(error => {
      console.log('Error getting documents: ', error)
    })
}

export default {
  getUserBets({ commit }, payload) {
    const result = []
    commit('SET_LOADING', true)
    db.collection('predictions')
      .where('uid', '==', payload.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          const item = doc.data()
          var matchDocRef = db.collection('matches').doc(doc.data().matchId)
          matchDocRef
            .get()
            .then(matchDoc => {
              if (matchDoc.exists) {
                result.push({ ...item, ...matchDoc.data() })
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!')
              }
            })
            .catch(error => {
              console.log('Error getting document:', error)
            })
        })
        commit('SET_USER_BETS', result)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
        commit('SET_LOADING', false)
      })
  },

  deleteUser({ commit }, uid) {
    db.collection('predictions')
      .where('uid', '==', '6yGGXWJsKNdqldxNncAz4oYtXZj2')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
          db.collection('predictions')
            .doc(doc.id)
            .delete()
            .then(() =>
              console.log(console.log('Document successfully deleted!'))
            )
        })
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
  },

  getCurrentTime({ commit }, payload) {
    var timeDocRef = db.collection('servers').doc('timestamp')
    timeDocRef
      .update({ time: firebase.firestore.FieldValue.serverTimestamp() })
      .then(
        timeDocRef
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log('Document data:', doc.data())
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!')
            }
          })
          .catch(error => {
            console.log('Error getting document:', error)
          })
      )
  },

  getCurrentDate({ commit }, payload) {
    const startdate = new Date('2024-06-14')
    const currentDate = firebase.firestore.Timestamp.now().toDate()

    const diffTime = Math.abs(currentDate - startdate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    commit('SET_TAB', diffDays - 1)
    console.log(startdate)
  },
  setTab({ commit }, payload) {
    commit('SET_TAB', payload)
  },
  setDialog({ commit }, payload) {
    commit('SET_DIALOG', payload)
  },
  setSnack({ commit }, payload) {
    commit('SET_SNACK', payload)
  },
  addBet({ commit }, payload) {
    const ts = firebase.firestore.FieldValue.serverTimestamp()
    // const currentTimestamp = firebase.firestore.Timestamp.now()
    // const serverTime = getServerTimeStamp()
    const matchDocRef = db.collection('matches').doc(payload.matchId)

    var timeDocRef = db.collection('servers').doc('timestamp')
    timeDocRef
      .update({ time: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() =>
        timeDocRef
          .get()
          .then(timeDoc => {
            if (timeDoc.exists && timeDoc.data().time) {
              matchDocRef.get().then(matchDoc => {
                if (matchDoc.exists) {
                  const time = matchDoc.data().date
                  if (time.seconds > timeDoc.data().time.seconds) {
                    const docRef = db
                      .collection('predictions')
                      .doc(`${payload.matchId}${payload.uid}`)

                    docRef
                      .get()
                      .then(doc => {
                        if (doc.exists) {
                          const his = doc.data().history
                          his.push(doc.data().bet)
                          docRef.set({
                            uid: payload.uid,
                            matchId: payload.matchId,
                            bet: {
                              away: payload.away,
                              home: payload.home,
                              time: ts,
                              name: payload.name
                            },
                            score: {},
                            point: 0,
                            history: his
                          })
                        } else {
                          docRef.set({
                            uid: payload.uid,
                            matchId: payload.matchId,
                            bet: {
                              away: payload.away,
                              home: payload.home,
                              time: ts,
                              name: payload.name
                            },
                            score: {},
                            point: 0,
                            history: []
                          })
                          // doc.data() will be undefined in this case
                          console.log('No such document!')
                        }
                        commit('SET_SNACK', {
                          visible: true,
                          message: 'Success!',
                          color: 'success'
                        })
                      })
                      .catch(error => {
                        commit('SET_SNACK', {
                          visible: true,
                          color: 'error',
                          message: error.message
                        })
                        console.log('Error getting document:', error)
                      })
                  } else {
                    commit('SET_SNACK', {
                      visible: true,
                      message: 'Timed to place bets :v',
                      color: 'error'
                    })
                  }
                }
              })
            } else {
              // doc.data() will be undefined in this case
              commit('SET_SNACK', {
                visible: true,
                message: 'Oops. Can not get server time. Please try again',
                color: 'error'
              })
              console.log('No such document!')
            }
          })
          .catch(error => {
            console.log('Error getting document:', error)
          })
      )
  },
  getUsers({ commit }, payload) {
    commit('SET_LOADING', true)
    db.collection('profiles')
      .get()
      .then(snapshot => {
        commit('SET_USERS', {
          users: snapshot.docs.map(doc => doc.data())
        })
        commit('SET_LOADING', false)
      })
      .catch(err => {
        commit('SET_LOADING', false)
        console.log(err)
      })
  },
  getMatches({ commit }, payload) {
    commit('SET_LOADING', true)
    db.collection('matches')
      .get()
      .then(snapshot => {
        commit('SET_MATCHES', {
          matches: snapshot.docs.map(doc => doc.data())
        })
        commit('SET_LOADING', false)
      })
      .catch(err => {
        commit('SET_LOADING', false)
        console.log(err)
      })
  },
  setDayMatches({ commit }, payload) {
    // payload.matches.filter((match) => match.date_offset === e)
    commit('SET_DAY_MATCHES', payload)
  },
  snapshotMatches({ commit }, payload) {
    db.collection('matches').onSnapshot(res => {
      const changes = res.docChanges()
      changes.forEach(change => {
        if (change.type === 'added') {
          commit('ADD_MATCH', { data: change.doc.data(), id: change.doc.id })
          commit('UPDATE_SCORE_POINT', {
            data: change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type === 'modified') {
          commit('UPDATE_MATCH', {
            data: change.doc.data(),
            id: change.doc.id
          })
          commit('UPDATE_SCORE_POINT', {
            data: change.doc.data(),
            id: change.doc.id
          })
          insertUnbet(change.doc.id)
        }
        if (change.type === 'removed') {
          commit('DELETE_MATCH', { id: change.doc.id })
        }
      })
    })
  },
  snapshotBets({ commit }, payload) {
    db.collection('predictions').onSnapshot(res => {
      const changes = res.docChanges()
      changes.forEach(change => {
        if (change.type === 'added') {
          commit('ADD_BET', { data: change.doc.data(), id: change.doc.id })
          commit('ADD_RANKING', {
            data: { ...change.doc.data() },
            id: change.doc.id
          })
        }
        if (change.type === 'modified') {
          commit('UPDATE_BET', {
            data: change.doc.data(),
            id: change.doc.id
          })
          commit('UPDATE_RANKING', {
            data: change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type === 'removed') {
          commit('DELETE_BET', { id: change.doc.id })
          commit('DELETE_RANKING', { id: change.doc.id })
        }
      })
    })
  }
}
