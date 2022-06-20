// Function for handling new user signing up
async function loginFormHandler(event) {
  event.preventDefault();

  // Gets the user's desired login credentials
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  // Checks that both login credentials have been entered
  if (username && password) {
    // Posts the login credentials to create a new user and establish a session
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Returns the user to the homepage if they have been successfully created
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

// Function for redirecting the user to the login page
function displayLogin(event) {
  event.preventDefault();
  document.location.replace("/login");
}

// Adds event listeners to the login and signup buttons
document.querySelector("#signup").addEventListener("click", loginFormHandler);
document.querySelector("#login").addEventListener("click", displayLogin);
