// Identifies the edit and delete buttons - these will only be displayed for a post belonging to the user
const deleteBtn = document.querySelector("#delete");
const editBtn = document.querySelector("#edit");

// Function for deleting a post
async function deletePost(event) {
  event.preventDefault();

  // Defines the URL to use for fetching using the post ID from the data- variable stored in the "delete post" button
  const fetchUrl = "/api/posts/" + event.target.dataset.id;

  // Deletes the post from the database
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  // Redirects the user to their dashboard if the post was successfully deleted
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// Function for editing a post
async function editPost(event) {
  event.preventDefault();

  // Retrieves the post ID saved in the data- variable
  const postId = event.target.dataset.id;

  // Redirects the user to the edit/:id page where they can edit their post
  document.location.replace("/edit/" + postId);
}

// Adds event listeners to the delete and edit buttons
deleteBtn.addEventListener("click", deletePost);
editBtn.addEventListener("click", editPost);
