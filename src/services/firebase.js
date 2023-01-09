// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBlw_5SOAOJblRLlJJ-jVKtvkYzBKhftIM',
  authDomain: 'drivent-7ff03.firebaseapp.com',
  projectId: 'drivent-7ff03',
  storageBucket: 'drivent-7ff03.appspot.com',
  messagingSenderId: '753998782816',
  appId: '1:753998782816:web:1047c2a5fd7e190c8f3e05',
  measurementId: 'G-VEG8YZ3QRE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GithubAuthProvider();
export const auth = getAuth(app);
