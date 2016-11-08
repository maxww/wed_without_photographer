import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyA28_BENuZ7kOwWgeRXOUEL253Kt04q11g",
	authDomain: "webwithoutphotographer.firebaseapp.com",
	databaseURL: "https://webwithoutphotographer.firebaseio.com",
	storageBucket: "webwithoutphotographer.appspot.com",
};

const firebaseApp = firebase.initializeApp(config);
const storageRef = firebase.storage().ref();
console.log(storageRef)
export { firebaseApp, storageRef }
