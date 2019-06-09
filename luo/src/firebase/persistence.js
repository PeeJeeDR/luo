export const enablePersistence = firebase => {
  firebase.firestore().enablePersistence()
  .then(() => console.log('PERSISTENCE ENABLED'))
  .catch(err  => {
    if (err.code == 'failed-precondition') {
      console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    }
    
    if (err.code == 'unimplemented') {
      console.error('The current browser does not support all of the features required to enable persistence');
    }
  })
};