import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKXlNuI_2vMUT4OR-q7foz-lqPqCaWfUQ",
    authDomain: "voyage-verse-1e3ad.firebaseapp.com",
    projectId: "voyage-verse-1e3ad",
    storageBucket: "voyage-verse-1e3ad.firebasestorage.app",
    messagingSenderId: "600633198644",
    appId: "1:600633198644:web:cbb776d3a6dea7d431e261"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

const register = document.getElementById('register');
register.addEventListener("click", async (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('uName').value;
    const country = document.getElementById('country').value;

    const auth=getAuth();
    const db=getFirestore();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user data in Firestore
        const userData = {
            email: email,
            username: username,
            country: country,
        };

        await setDoc(doc(db, "users", user.uid), userData);
        showMessage('Account created successfully', 'signUpMessage');
        window.location.href = '/subpage/signin.html';
        
        console.log("User account and data created successfully");
    } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);

        if (errorCode === 'auth/email-already-in-use') {
            showMessage('Email address already exists!!', 'signUpMessage');
        } else {
            showMessage('Unable to create user', 'signUpMessage');
        }
        console.log('Account not created');
    }

});