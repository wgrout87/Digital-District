// Function for displaying the post/:id page for each individual post
function displaySinglePost(event) {
  event.preventDefault();
  // Gets the post ID stored in the data- variable of each displayed post
  const postId = event.target.parentElement.dataset.id;
  // Redirects the user to the post/:id page of the post they clicked on
  document.location.replace("/post/" + postId);
}

// Adds an event listener to the ul containing all of the posts
document.querySelector("ul").addEventListener("click", displaySinglePost);
