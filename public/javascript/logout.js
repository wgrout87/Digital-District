// Function for logging out the user
async function logout() {
  // Posts to the logout route to destroy the session
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // Redirects the user to the homepage once they've logged out
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

// Adds an event listener to the logout button
document.querySelector("#logout").addEventListener("click", logout);
