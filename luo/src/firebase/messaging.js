import { fire, db, messaging } from '@/firebase/firebase';

console.log('AUTH USER', fire.auth().currentUser);

const getMessagingToken = () => {
  messaging.getToken()
  .then(async (token) => {
    if (token) {
      const currentMessageToken = localStorage.getItem('messagingToken');

      console.log('token will be updated', currentMessageToken != token);

      if (currentMessageToken != token) {
        await saveToken(token)
      }
    } 

    if (!token) {
      console.log('No Instance ID token available. Request permission to generate one.');
      notificationsPermisionRequest();
    }
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

const notificationsPermisionRequest = () => {
  messaging.requestPermission()
  .then(() => {
    getMessagingToken();
  })
  .catch((err) => {
    console.log('Unable to get permission to notify.', err);
  }); 
}

const listenTokenRefresh = () => {
  const currentMessageToken = localStorage.getItem('messagingToken');

  console.log('currentMessageToken', currentMessageToken);

  if (!!currentMessageToken) {
    messaging.onTokenRefresh(() => {
      messaging.getToken()
      .then(token => {
        console.log('TOKEN REFRESH');
        saveToken(token);
      })
      .catch(err => {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });
  }
}

const saveToken = (token) => {
  console.log('SAVE TOKEN IN DB!', token);
  localStorage.setItem('messagingToken', token);

  //  console.log('AUTH', fire.auth().currentUser);

  if (fire.auth().currentUser.uid) {
    db.collection('users').doc(fire.auth().currentUser.uid).set({
      messagingToken: token
    }, { merge: true })
    .then(() => {
      console.log('TOKEN STORED IN DB');
    })
    .catch(err => {
      console.log('ERR', err);
    })
  }
}

fire.auth().onAuthStateChanged(auth => {
  console.log('AUTH CHANGE', auth.uid);
  if (auth.uid) {
    getMessagingToken();
    listenTokenRefresh();
  }
})