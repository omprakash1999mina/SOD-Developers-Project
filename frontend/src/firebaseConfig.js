import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA0XDq13YQ3-E9UI2_xwXtqW3OSfI6r5qI",
    authDomain: "sod-developers-project.firebaseapp.com",
    projectId: "sod-developers-project",
    storageBucket: "sod-developers-project.appspot.com",
    messagingSenderId: "657161112291",
    appId: "1:657161112291:web:34295d8af505273524d3d6",
    measurementId: "G-JR17R410GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
//   const analytics = getAnalytics(app);