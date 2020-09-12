import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyAuggkCZqSWYULZGBCHnr8tz11gdKinjrg",
    authDomain: "we-deliver-1e721.firebaseapp.com",
    databaseURL: "https://we-deliver-1e721.firebaseio.com/",
    projectId: "we-deliver-1e721",
    storageBucket: "we-deliver-1e721.appspot.com",
    messagingSenderId: "294088430774",
    appId: "1:294088430774:web:0bc94751fef540f94a0217"
};
firebase.initializeApp(config);

export default firebase;
