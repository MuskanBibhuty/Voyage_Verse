document.addEventListener("DOMContentLoaded", () => {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const username = userData.username;
        const email = userData.email;
        const country = userData.country;

        // Display the data in the appropriate elements
        const usernameElm = document.getElementsByClassName("username");
        for (let element of usernameElm) {
            element.textContent = username;
        }
        const emailElm = document.getElementsByClassName("email");
        for (let element of emailElm) {
            element.textContent = email;
        }

        document.getElementById("country").textContent = country;
    } else {
        console.error("User data not found in localStorage.");
    }
});
