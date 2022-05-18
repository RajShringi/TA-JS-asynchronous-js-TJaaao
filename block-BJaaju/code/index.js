let input = document.querySelector("input");
let root = document.querySelector(".root");
function displayImage(data) {
  root.innerHTML = "";
  data.forEach((d) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = d.urls.small;
    img.alt = d.description;
    li.append(img);
    root.append(li);
  });
}
function handleInput(e) {
  if (e.keyCode === 13 && e.target.value !== "") {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.unsplash.com/search/photos/?page=1&per_page=15&query=${e.target.value}&client_id=pY9lcHLMUo2rFmDm4CsgviWqnBz4GSgVgXxiojZGWko`
    );
    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      displayImage(data.results);
    };
    xhr.send();
    e.target.value = "";
  }
}
input.addEventListener("keyup", handleInput);

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.send();
}

fetch(
  "https://api.unsplash.com/photos/?client_id=pY9lcHLMUo2rFmDm4CsgviWqnBz4GSgVgXxiojZGWko",
  displayImage
);
