import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';
import axios from 'axios';
import * as config from './config';

// Firestore database setup.
admin.initializeApp();
const db = admin.firestore();

// Sendgrid setup.
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

// When a quiz had been played.
export const onQuizPlay = functions.firestore.document(`quizzes/{quizId}`).onUpdate(change => {
  const before = change.before.data();
  const after = change.after.data();

  if (before !== undefined && after !== undefined) {
    if (before.playedBy.length === after.playedBy.length) {
      return null;
    }

    return change.after.ref.update({ plays: after.playedBy.length });
  }

  return null;
});

// When a quiz has been liked.
export const onQuizLike = functions.firestore.document(`quizzes/{quizId}`).onUpdate(change => {
  const before = change.before.data();
  const after = change.after.data();

  if (before !== undefined && after !== undefined) {
    if (before.likedBy.length === after.likedBy.length) {
      return null;
    }

    return change.after.ref.update({ likes: after.likedBy.length });
  }

  return null;
});

// When a quiz has been reported.
export const onNewReport = functions.firestore.document(`reports/{reportId}`).onCreate(snap => {
  const data = snap.data();

  if (data !== undefined) {
    const quizId = data.quizId;

    db.collection('reports').where('quizId', '==', quizId).get()
    .then(snapshot => {
      return snapshot.size;
    })
    .then(reports => {
      db.collection('quizzes').doc(quizId).update({ reports })
      .then(res => res)
      .catch(err => err);
    })
    .catch(err => {
      return err;
    })
  }
});

// When a category has been suggested.
export const onCategorySuggestion = functions.firestore.document(`category-suggestions/{suggestionId}`).onCreate(snap => {
  const msg = {
    to: '<TO EMAIL>',
    from: '<FROM EMAIL>',
    templateId: 'd-2e8e9123d5584da8b46b881c09f0f8df'
  }

  return sgMail.send(msg).then(() => {
    console.log('Mail sent');
  }).catch(err => {
    console.log('ERROR', err);
  });
});

export const onUserFollow = functions.firestore.document(`users/{userId}`).onUpdate(change => {
  const before = change.before.data();
  const after = change.after.data();

  if (before !== undefined && after !== undefined) {
    if (before.followers.length < after.followers.length) {
      db.collection('users').doc(after.followers[after.followers.length - 1]).get()
      .then(user => {
        console.log('USER', user.data());
        console.log('OUTPUT', `${ user.data()!.username } started following you!`);

        const text = user.data()!.username + ' started following you!';

        return axios({
          url: 'https://fcm.googleapis.com/fcm/send',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${ config.AUTH_KEY }`
          },
          data: {
            'notification': {
              'title': 'New follower',
              'body': text,
              'sound': 'default'
            },
            'to': after.messagingToken,
            'priority': 'high'
          }
        })
        .then(res => {
          console.log('Norification sended successfully.', res)
        })
        .catch(err => {
          console.log('Norification sended successfully.', err)
        })
      })
      .catch(err => {
        console.log('Error when getting user:', err);
      })
    }
  }

  return null;
})

// When a user gets deleted.
export const deleteUser = functions.firestore.document('users/{userID}').onDelete(snap => {
  return admin.auth().deleteUser(snap.id)
    .then(() => console.log('Deleted user with ID:' + snap.id))
    .catch((error) => console.error('There was an error while deleting user:', error));
});