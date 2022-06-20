const deleteBtn = document.querySelector("#delete");
const editBtn = document.querySelector("#edit");

async function deletePost(event) {
  event.preventDefault();

  const fetchUrl = "/api/posts/" + event.target.dataset.id;

  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

async function editPost(event) {
  event.preventDefault();

  const postId = event.target.dataset.id;

  document.location.replace("/edit/" + postId);
}

deleteBtn.addEventListener("click", deletePost);
editBtn.addEventListener("click", editPost);
