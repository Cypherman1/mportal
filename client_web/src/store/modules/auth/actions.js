import { auth, googleProvider, storageRef, db } from '@/firebase.js'
import router from '@/router'
// import firebase from 'firebase'
// require('firebase/auth')

export default {
  getLegalName({ commit }, payload) {
    var docRef = db.collection('profiles').doc(payload.uid)

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          commit(
            'GET_LEGAL_NAME',
            doc.data().legalName
            // isPaid: doc.data().isPaid
          )
        } else {
        }
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })
  },
  setDisplayName({ commit }, payload) {
    commit('SET_DISPLAY_NAME', payload)
  },
  setLegalName({ commit }, payload) {
    commit('SET_LEGAL_NAME', payload)
  },
  getAvatarUrl({ commit }, payload) {
    storageRef
      .child('images/' + payload.uid + '/profile_80x80.png')
      .getDownloadURL()
      .then(url => {
        if (payload) {
          payload
            .updateProfile({
              photoURL: url
            })
            .then(() => {
              db.collection('profiles')
                .doc(payload.uid)
                .update({
                  avatar: url
                })
                .then(() => {
                  commit('SET_AVATAR', url)
                })
            })
        } else {
        }
      })
      .catch(er => console.log(er))
  },
  updateInfo({ commit }, payload) {
    const user = auth.currentUser
    commit('SET_LOADING', true)
    if (user) {
      user
        .updateProfile({
          displayName: payload.displayName
        })
        .then(() => {
          db.collection('profiles')
            .doc(payload.uid)
            .set(
              {
                legalName: payload.legalName
              },
              { merge: true }
            )
            .then(() => {
              commit('SET_LOADING', false)
              commit('SET_PROFILE_DIALOG', false)
            })

          commit('SET_LOADING', false)
          commit('SET_PROFILE_DIALOG', false)
        })
    } else {
      console.log('no image')
      commit('SET_LOADING', false)
      commit('SET_PROFILE_DIALOG', false)
    }
  },
  uploadAvatar({ commit }, payload) {
    var metadata = {
      contentType: 'image/jpeg'
    }
    const ext = payload.avatar.name.split('.')[
      payload.avatar.name.split('.').length - 1
    ]
    commit('SET_LOADING', true)
    storageRef
      .child('images/' + payload.uid + '/profile.' + ext)
      .put(payload.avatar, metadata)
      .then(() => {
        commit('SET_AVATAR', URL.createObjectURL(payload.avatar))
        commit('SET_LOADING', false)
      })
      .catch(err => {
        commit('SET_LOADING', false)
        commit('app/SET_SNACK', {
          visible: true,
          color: 'error',
          message: err.message
        })
      })
  },

  sendEmail({ commit }, payload) {
    commit('SET_LOADING', true)
    auth
      .sendPasswordResetEmail(payload)
      .then(() => {
        commit('SET_LOADING', false)
        commit('SET_SENT_EMAIL', 'OK')
        // Password reset email sent!
        // ..
      })
      .catch(error => {
        commit('SET_LOADING', false)
        console.log(error.message)
        // ..
      })
  },
  setSentEmail({ commit }, payload) {
    commit('SET_SENT_EMAIL', payload)
  },

  signUserUp({ commit }, payload) {
    commit('SET_LOADING', true)
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        user.user
          .updateProfile({
            displayName: payload.name
          })
          .then(() => {
            commit('SET_USER', {
              uid: user.user.uid,
              displayName: user.user.displayName,
              email: user.user.email
            })
            db.collection('profiles')
              .doc(user.user.uid)
              .set(
                {
                  uid: user.user.uid,
                  displayName: user.user.displayName,
                  email: user.user.email
                },
                { merge: true }
              )
              .then(() => {
                commit('SET_LOADING', false)
              })
              .catch(error => {
                console.error('Error writing document: ', error)
              })
            commit('SET_LOADING', false)
          })
      })
      .catch(err => {
        commit('SET_LOADING', false)
        commit('SET_AUTH_ERR_MESSAGE', {
          errorMessage: err.message,
          alert: true
        })
      })
  },
  signUserIn({ commit }, payload) {
    commit('SET_LOADING', true)
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit(
          'SET_USER',
          {
            uid: user.user.uid,
            displayName: user.user.displayName,
            email: user.user.email
          },
          { merge: true }
        )
        db.collection('profiles')
          .doc(user.user.uid)
          .set(
            {
              uid: user.user.uid,
              displayName: user.user.displayName,
              email: user.user.email
            },
            { merge: true }
          )
          .then(() => {
            commit('SET_LOADING', false)
          })
          .catch(error => {
            console.error('Error writing document: ', error)
          })

        commit('SET_LOADING', false)
      })
      .catch(err => {
        // console.log(err.message)
        commit('SET_LOADING', false)
        commit('SET_AUTH_ERR_MESSAGE', {
          errorMessage: err.message,
          alert: true
        })
      })
  },
  autoSignIn({ commit }, payload) {
    console.log('auto signin')
    commit('SET_USER', {
      uid: payload.uid,
      displayName: payload.displayName,
      email: payload.email
    })
    db.collection('profiles')
      .doc(payload.uid)
      .set(
        {
          uid: payload.uid,
          displayName: payload.displayName,
          email: payload.email
        },
        { merge: true }
      )
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
  },
  signOut({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit('SET_USER', { uid: '' })
      })
      .catch(ex => {})
  },
  googleSignIn({ commit }) {
    auth
      .signInWithPopup(googleProvider)
      .then(result => {
        router.push({ path: '/' })
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential

        // // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken
        // The signed-in user info.
        var user = result.user
        commit('SET_USER', {
          uid: user.uid,
          displayName: user.displayName,
          avatar: user.photoURL,
          email: user.email
        })
        db.collection('profiles')
          .doc(user.uid)
          .set(
            {
              uid: user.uid,
              displayName: user.displayName,
              avatar: user.photoURL,
              email: user.email
            },
            { merge: true }
          )
          .then(() => {
            commit('SET_LOADING', false)
          })
          .catch(error => {
            console.error('Error writing document: ', error)
          })
        commit('SET_LOADING', false)
        // ...
      })
      .catch(error => {
        console.log(error)
      })
  },
  getRedirectResult({ commit }) {
    auth
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          // var credential = result.credential
          // // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = credential.accessToken
          // ...
        }
        // The signed-in user info.
        // var user = result.user
        console.log(router.from)
        router.push({ path: '/' })
        console.log('redirected!')
      })
      .catch(error => {
        console.log(error)
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // // The email of the user's account used.
        // var email = error.email
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential
        // ...
      })
  },
  setProfileDialog({ commit }, payload) {
    commit('SET_PROFILE_DIALOG', payload)
  },
  setChangePasswdDialog({ commit }, payload) {
    commit('SET_CHANGEPASSWD_DIALOG', payload)
  },
  closeErrorMessage({ commit }) {
    commit('CLOSE_AUTH_ERR_MESSAGE')
  }
}
