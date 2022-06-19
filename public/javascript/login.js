async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Incorrect username or password.");
    }
  }
}

function displaySubmit(event) {
  event.preventDefault();
  document.location.replace("/signup");
}

document.querySelector("#login").addEventListener("click", loginFormHandler);
document.querySelector("#signup").addEventListener("click", displaySubmit);
