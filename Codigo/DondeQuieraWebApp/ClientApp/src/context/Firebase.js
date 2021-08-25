import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAraPSk6vjWya9XrdGzjApaWknOnGxDWbA",
    authDomain: "dondequiera-30828.firebaseapp.com",
    databaseURL: "https://dondequiera-30828.firebaseio.com",
    projectId: "dondequiera-30828",
    storageBucket: "dondequiera-30828.appspot.com",
    messagingSenderId: "191998578678",
    appId: "1:191998578678:web:b8cbd43ba22bb494e5c1d7"
};

const firebaseConf = firebase.initializeApp(firebaseConfig);
export default firebaseConf;