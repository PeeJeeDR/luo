import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

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