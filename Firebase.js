import * as firebase from 'firebase';
import { Platform, InteractionManager } from 'react-native';


const settings = {timestampsInSnapshots: true};
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;

if (Platform.OS === 'android') {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }
    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };
  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };
  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
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
