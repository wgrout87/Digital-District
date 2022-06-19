function displayNewPost(event) {
  event.preventDefault();
  document.location.replace("/post");
}

document.querySelector("#addPost").addEventListener("click", displayNewPost);
