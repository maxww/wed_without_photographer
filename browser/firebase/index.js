import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyDiHN4mJtcm3qBECiiD6I6dyiFt7B1JSP4",
	authDomain: "christianandtaffy.firebaseapp.com",
	databaseURL: "https://christianandtaffy.firebaseio.com",
	storageBucket: "christianandtaffy.appspot.com",
	messagingSenderId: "68328926314"
};

const firebaseApp = firebase.initializeApp(config);
const storageRef = firebase.storage().ref();

export { firebaseApp, storageRef }
