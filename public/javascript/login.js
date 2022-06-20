// Function for handling login submission
async function loginFormHandler(event) {
  event.preventDefault();

  // Gets the user's login credentials
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  // Checks that both login credentials have been entered
  if (username && password) {
    // Posts the login credentials to establish a session
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Returns the user to the homepage if they have been successfully logged in
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Incorrect username or password.");
    }
  }
}

// Function for redirecting the user to the signup page
function displaySubmit(event) {
  event.preventDefault();
  document.location.replace("/signup");
}

// Adds event listeners to the login and signup buttons
document.querySelector("#login").addEventListener("click", loginFormHandler);
document.querySelector("#signup").addEventListener("click", displaySubmit);
