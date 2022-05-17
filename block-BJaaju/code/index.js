let input = document.querySelector("input");
let root = document.querySelector(".root");
function displayImage(data) {
  root.innerHTML = "";
  data.map((d) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = d.urls.small;
    img.alt = d.description;
    li.append(img);
    root.append(li);
  });
}
function handleInput(e) {
  if (e.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.unsplash.com/search/photos/?page=1&per_page=15&query=${e.target.value}&client_id=pY9lcHLMUo2rFmDm4CsgviWqnBz4GSgVgXxiojZGWko`
    );
    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      console.log(data.results);
      displayImage(data.results);
    };
    xhr.send();
  }
}
input.addEventListener("keyup", handleInput);
