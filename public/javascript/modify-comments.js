async function deleteComment(event) {
  event.preventDefault();
  if (!event.target.classList.contains("deleteComment")) {
    return;
  }

  const fetchUrl = "/api/comments/" + event.target.dataset.id;

  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

async function editComment(event) {
  event.preventDefault();
  if (!event.target.classList.contains("editComment")) {
    return;
  }

  const commentId = event.target.dataset.id;
  const targetParent = document.querySelector("#parent" + commentId);
  const editBtn = document.querySelector("#edit" + commentId);

  if (event.target.textContent === "EDIT COMMENT") {
    const commentP = document.querySelector("#comment" + commentId);
    const commentText = commentP.textContent;
    commentP.remove();
    const newTextarea = document.createElement("textarea");
    newTextarea.textContent = commentText;
    newTextarea.classList.add("form-control");
    newTextarea.setAttribute("id", "textarea" + commentId);
    targetParent.append(newTextarea);

    editBtn.textContent = "SAVE CHANGES";
  } else {
    const commentTextarea = document.querySelector("#textarea" + commentId);
    const updatedText = commentTextarea.value.trim();

    const fetchUrl = "/api/comments/" + commentId;

    const response = await fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify({
        comment_text: updatedText,
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
  .querySelector("#commentSection")
  .addEventListener("click", deleteComment);
document
  .querySelector("#commentSection")
  .addEventListener("click", editComment);
