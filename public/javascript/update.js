async function putFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  const postId = event.target.dataset.id;
  const fetchUrl = "/api/posts/" + postId;

  if (title && content) {
    const response = await fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#update").addEventListener("click", putFormHandler);
