import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

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

export const onCategorySuggestion = functions.firestore.document(`category-suggestions/{suggestionId}`).onCreate(snap => {
  
});