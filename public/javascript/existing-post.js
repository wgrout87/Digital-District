function displaySinglePost(event) {
  event.preventDefault();
  const postId = event.target.parentElement.dataset.id;
  document.location.replace("/post/" + postId);
}

document.querySelector("ul").addEventListener("click", displaySinglePost);
