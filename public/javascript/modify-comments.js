// Function for deleting a comment
async function deleteComment(event) {
  event.preventDefault();

  // Checks that the event target was a delete button
  if (!event.target.classList.contains("deleteComment")) {
    return;
  }

  // Defines the URL to use for fetching using the data- variable containing the comment ID
  const fetchUrl = "/api/comments/" + event.target.dataset.id;

  // Sends a fetch request to delete the comment
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  // Reloads the page if the comment was successfully deleted - the comment will no longer display
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

// Function for editing a comment
async function editComment(event) {
  event.preventDefault();

  // Checks that the event target was an edit button
  if (!event.target.classList.contains("editComment")) {
    return;
  }

  // Retrieves the comment ID saved in the data- variable
  const commentId = event.target.dataset.id;
  // Identifies the div element that is parent to the comment p element
  const targetParent = document.querySelector("#parent" + commentId);
  // Identifies the edit button that is paired to the desired comment
  const editBtn = document.querySelector("#edit" + commentId);

  // Checks if the edit button's text content is "EDIT COMMENT" - it will be "SAVE CHANGES" if it has been clicked once
  if (event.target.textContent === "EDIT COMMENT") {
    // Identifies the comment p element
    const commentP = document.querySelector("#comment" + commentId);
    // Extracts the comment text
    const commentText = commentP.textContent;
    // Deletes the p element
    commentP.remove();
    // Creates a new textarea element
    const newTextarea = document.createElement("textarea");
    // Adds the saved comment text to the textarea
    newTextarea.textContent = commentText;
    // Give it a class of "form-control"
    newTextarea.classList.add("form-control");
    // Gives the textarea a specific id
    newTextarea.setAttribute("id", "textarea" + commentId);
    // Appends the textarea in the place of the previously existing p element
    targetParent.append(newTextarea);

    // Changes the edit button's text since it now serves a different purpose
    editBtn.textContent = "SAVE CHANGES";
  } else {
    // Identifies the comment textarea
    const commentTextarea = document.querySelector("#textarea" + commentId);
    // Retrieves the text from the textarea
    const updatedText = commentTextarea.value.trim();

    // Defines the URL to use for fetching using the comment's ID
    const fetchUrl = "/api/comments/" + commentId;

    // Sends a put fetch request to update the comment text
    const response = await fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify({
        comment_text: updatedText,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Reloads the page if the request worked properly to show the newly updated comment
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// Adds event listeners to the comment section to handle deleting and editing comments
document
  .querySelector("#commentSection")
  .addEventListener("click", deleteComment);
document
  .querySelector("#commentSection")
  .addEventListener("click", editComment);
