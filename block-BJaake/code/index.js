let root = document.querySelector(".root");
let select = document.querySelector("select");

function getNewsSite(data) {
  let newsSites = [];
  data.forEach((blog) => {
    if (!newsSites.includes(blog.newsSite)) {
      newsSites.push(blog.newsSite);
    }
  });
  return newsSites;
}

function createUI(data) {
  let li = document.createElement("li");
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  let img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.title;
  imgContainer.append(img);
  let info = document.createElement("div");
  info.classList.add("info");
  let source = document.createElement("p");
  source.classList.add("source");
  source.innerText = data.newsSite;
  let heading = document.createElement("h2");
  heading.classList.add("heading");
  heading.innerText = data.title;
  let btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  let btn = document.createElement("a");
  btn.classList.add("btn");
  btn.innerText = "Read More";
  btn.href = data.url;
  btnContainer.append(btn);
  info.append(source, heading, btnContainer);
  li.append(imgContainer, info);
  return li;
}

function CreateAppUI(data) {
  root.innerHTML = "";
  data.forEach((element) => {
    root.append(createUI(element));
  });
}

fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=30")
  .then((res) => res.json())
  .then((value) => {
    CreateAppUI(value);

    let newsSites = getNewsSite(value);
    newsSites.forEach((site) => {
      select.innerHTML += `<option value="${site}">${site}</option>`;
    });

    select.addEventListener("input", (e) => {
      if (e.target.value === "Select A news Source") {
        CreateAppUI(value);
        return;
      }
      let site = e.target.value;
      let newValues = value.filter((blog) => blog.newsSite === site);
      CreateAppUI(newValues);
    });
  });
