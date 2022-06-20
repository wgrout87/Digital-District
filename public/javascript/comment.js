// Function for handling comment submission
async function commentFormHandler(event) {
  event.preventDefault();

  // Gets the user's comment text
  const comment = document.querySelector("#commentArea").value.trim();

  // Checks that a comment has actually been made
  if (comment) {
    // Posts the comment to the database
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text: comment,
        post_id: event.target.dataset.id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // If the comment was properly added to the database, the page reloads showing the newly added comment
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// Adds the event listener to the "Leave a Comment" button
document
  .querySelector("#comment")
  .addEventListener("click", commentFormHandler);
