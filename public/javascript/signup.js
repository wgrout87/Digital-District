async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
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
      alert(response.message);
    }
  }
}

function displayLogin(event) {
  event.preventDefault();
  document.location.replace("/login");
}

document.querySelector("#signup").addEventListener("submit", loginFormHandler);
document.querySelector("#login").addEventListener("click", displayLogin);
