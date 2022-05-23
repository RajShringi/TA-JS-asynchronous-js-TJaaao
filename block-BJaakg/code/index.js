// https://www.anapioficeandfire.com/api/books
let booksList = document.querySelector(".books");
let characterList = document.querySelector(".characters");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close");

function hanldeSpinner(status = false, elm) {
  if (status) {
    elm.innerHTML = `<div class='spinner'><div class="donut"></div></div>`;
  } else {
    elm.innerHTML = "";
  }
}
function renderBooks(books) {
  booksList.innerHTML = "";
  books.forEach((book) => {
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    h3.innerText = book.name;
    let p = document.createElement("p");
    p.innerText = book.authors[0];
    let button = document.createElement("button");
    button.innerText = `Show Characters (${book.characters.length})`;
    button.addEventListener("click", () => handleClick(book.characters));
    li.append(h3, p, button);
    booksList.append(li);
  });
}

function renderCharacter(characters) {
  hanldeSpinner(true, characterList);
  fetchCharacters(characters).then((chars) => {
    hanldeSpinner(false, characterList);

    chars.forEach((char) => {
      let li = document.createElement("li");
      li.innerText = `${char.name} (${char.tvSeries.join(" ")})`;
      characterList.append(li);
    });
  });
  //   characters.forEach((character) => {
  //     fetch(character)
  //       .then((res) => res.json())
  //       .then((value) => {
  //         let li = document.createElement("li");
  //         li.innerText = `${value.name} (${value.tvSeries.join(" ")})`;
  //         characterList.append(li);
  //       });
  //   });
}
function fetchCharacters(characters) {
  return new Promise((res, rej) => {
    let final = [];
    characters.forEach((character, index) => {
      fetch(character)
        .then((res) => res.json())
        .then((value) => {
          final.push(value);
          if (characters.length === index + 1) {
            res(final);
          }
        });
    });
  });
}
function handleClick(characters) {
  characterList.innerHTML = "";
  renderCharacter(characters);
  modal.classList.toggle("hidden");
}
closeBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

function init() {
  hanldeSpinner(true, booksList);
  fetch("https://www.anapioficeandfire.com/api/books")
    .then((res) => res.json())
    .then((value) => {
      isLoading = false;
      hanldeSpinner(false, booksList);
      console.log(value);
      renderBooks(value);
    });
}
init();
