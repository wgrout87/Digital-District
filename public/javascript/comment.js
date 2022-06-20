async function commentFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector("#commentArea").value.trim();

  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text: comment,
        post_id: event.target.dataset.id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#comment")
  .addEventListener("click", commentFormHandler);
