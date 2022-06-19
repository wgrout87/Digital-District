const req = require("express/lib/request");

async function postFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  if (title && content) {
    const response = await fetch("/aip/posts", {
      method: "post",
      body: JSON.stringify({
        title,
        content,
        user_id: req.session.user_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("success");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#publish").addEventListener("click", postFormHandler);
