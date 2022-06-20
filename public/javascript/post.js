// Function for handling new post submission
async function postFormHandler(event) {
  event.preventDefault();

  // Gets the user's post title and content
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  // Checks that a post has both required elements
  if (title && content) {
    // Adds the post to the database
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Redirects the user to their dashboard if the post was successfully added to the database
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// Adds an event listener to the "publish" button
document.querySelector("#publish").addEventListener("click", postFormHandler);
