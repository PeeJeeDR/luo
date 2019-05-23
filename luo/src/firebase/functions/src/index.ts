import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const onQuizPost = functions.firestore.document(`users/{userId}`).onUpdate(change => {
  const before = change.before.data();
  const after = change.after.data();

  if (before !== undefined && after !== undefined) {
    if (before.quizzesMade.length === after.quizzesMade.length) {
      return null;
    }

    return change.after.ref.update({ numberOfQuizzesMade: after.quizzesMade.length });
  }

  return null;
});