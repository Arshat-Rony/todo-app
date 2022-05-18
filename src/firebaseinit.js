import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBU7S7tJpC7w1dukHjuwnV1UlKheSsihQk",
    authDomain: "todo-app-9a63e.firebaseapp.com",
    projectId: "todo-app-9a63e",
    storageBucket: "todo-app-9a63e.appspot.com",
    messagingSenderId: "550038875277",
    appId: "1:550038875277:web:4ab8400e5409fc3e6906c4"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;