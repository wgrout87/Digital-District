// Function for handling an updated post submission
async function putFormHandler(event) {
  event.preventDefault();

  // Gets the user's updated title and/or content
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  // Retrieves the post ID from the data- variable stored in the "update" button
  const postId = event.target.dataset.id;
  // Defines the URL to use for fetching using the post ID
  const fetchUrl = "/api/posts/" + postId;

  // Checks that a post has both required elements
  if (title && content) {
    // Updates the post in the database
    const response = await fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Redirects the user to their dashboard if the post was successfully updated
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// Adds an event listener to the "update" button
document.querySelector("#update").addEventListener("click", putFormHandler);
