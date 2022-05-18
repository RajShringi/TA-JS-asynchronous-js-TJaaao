let name = document.querySelector(".name");
let userName = document.querySelector(".userName");
let userImg = document.querySelector(".user-img");
let followerRoot = document.querySelector(".followers-list");
let followingRoot = document.querySelector(".following-list");
let input = document.querySelector("input");
let btn = document.querySelector(".btn");
let catImg = document.querySelector(".cat-img");

function handleInput(e) {
  if (e.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${e.target.value}`);

    let xhrfollowrs = new XMLHttpRequest();
    xhrfollowrs.open(
      "GET",
      `https://api.github.com/users/${e.target.value}/followers`
    );

    let xhrfollowing = new XMLHttpRequest();
    xhrfollowing.open(
      "GET",
      `https://api.github.com/users/${e.target.value}/following`
    );

    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      name.innerText = data.name;
      userName.innerText = `@${data.login}`;
      userImg.src = data.avatar_url;
    };

    xhrfollowrs.onload = function () {
      let followers = JSON.parse(xhrfollowrs.response);
      followerRoot.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        followerRoot.innerHTML += `
          <li><img src=${followers[i].avatar_url} alt=${followers[i].login} /></li>
          `;
      }
    };

    xhrfollowing.onload = function () {
      let following = JSON.parse(xhrfollowing.response);
      followingRoot.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        followingRoot.innerHTML += `
          <li><img src=${following[i].avatar_url} alt=${following[i].login} /></li>
          `;
      }
    };
    xhr.send();
    xhrfollowrs.send();
    xhrfollowing.send();
    e.target.value = "";
  }
}

input.addEventListener("keyup", handleInput);
function handleClick() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.thecatapi.com/v1/images/search?limit=1&size=full"
  );
  xhr.onload = function () {
    let data = JSON.parse(xhr.response);
    catImg.src = data[0].url;
  };
  xhr.send();
}
btn.addEventListener("click", handleClick);
