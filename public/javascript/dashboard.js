// Function for displaying the post page for adding a new post
function displayNewPost(event) {
  event.preventDefault();
  // Redirects the user to the post page
  document.location.replace("/post");
}

// Adds an event listener to the "Add a New Post" button
document.querySelector("#addPost").addEventListener("click", displayNewPost);
