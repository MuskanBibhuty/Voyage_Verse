import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKXlNuI_2vMUT4OR-q7foz-lqPqCaWfUQ",
    authDomain: "voyage-verse-1e3ad.firebaseapp.com",
    projectId: "voyage-verse-1e3ad",
    storageBucket: "voyage-verse-1e3ad.firebasestorage.app",
    messagingSenderId: "600633198644",
    appId: "1:600633198644:web:cbb776d3a6dea7d431e261"
};

// // Initialize Firebase
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

const login = document.getElementById('login');
login.addEventListener("click", async (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log(email, password);


    const auth = getAuth();
    const db=getFirestore();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User data:", userData);

            // Use the username and country as needed
            const username = userData.username;
            const country = userData.country;

            showMessage(`Welcome back, ${username} from ${country}!`, 'signInMessage');
            // Save user data in localStorage
            localStorage.setItem("userData", JSON.stringify(userData));

            window.location.href = '/subpage/dashboard.html';
        } else {
            console.error("No user data found in Firestore.");
            showMessage("Error: User data not found.", 'signInMessage');
        }
    } catch (error) {
        const errorCode = error.code;
        console.log(error);
        console.error('Error Code:', error.code, 'Message:', error.message);

        if (errorCode === 'auth/invalid-email') {
            showMessage('Invalid email format. Please check and try again.', 'signInMessage');
        } else if (errorCode === 'auth/invalid-credential') {
            showMessage('Invalid credentials. Please check and try again.', 'signInMessage');
        } else {
            showMessage(`Error signing in: ${error.message}`, 'signInMessage');
        }
    }

});