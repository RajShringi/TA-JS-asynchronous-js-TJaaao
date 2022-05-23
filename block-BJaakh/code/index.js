let url = "https://basic-todo-api.vercel.app/api/todo";
let todosUl = document.querySelector(".todos");
let input = document.querySelector("input");
let put = false;
function handleDelete(e) {
  let id = e.target.dataset.id;
  fetch(url + `/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(() => init());
}

function handleCheckbox(e, status) {
  let id = e.target.dataset.id;
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(url + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(() => init());
}

function updateTodo(e) {
  let inputElm = document.createElement("input");
  inputElm.value = e.target.innerText;
  let p = e.target;
  let parent = e.target.parentElement;
  let id = e.target.dataset.id;
  parent.replaceChild(inputElm, p);
  inputElm.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && e.target.value) {
      let data = {
        todo: {
          title: e.target.value,
        },
      };
      fetch(url + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(() => init());
    }
  });
}

function renderTodos(todos) {
  todosUl.innerHTML = "";
  todos.forEach((todo) => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.classList.add("flex");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.setAttribute("data-id", todo._id);
    checkbox.addEventListener("input", (e) =>
      handleCheckbox(e, todo.isCompleted)
    );
    let p = document.createElement("p");
    p.innerText = todo.title;
    p.setAttribute("data-id", todo._id);
    p.addEventListener("dblclick", updateTodo);
    div.append(checkbox, p);
    let span = document.createElement("span");
    span.innerText = "❌";
    span.setAttribute("data-id", todo._id);
    span.addEventListener("click", handleDelete);
    li.append(div, span);
    todosUl.append(li);
  });
}

function handleInput(e) {
  if (e.keyCode === 13) {
    let value = e.target.value;
    let data = {
      todo: {
        title: value,
        isCompleted: false,
      },
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => init());
    e.target.value = "";
  }
}

input.addEventListener("keyup", handleInput);

function init() {
  fetch(url)
    .then((res) => res.json())
    .then((value) => {
      console.log(value);
      renderTodos(value.todos);
    });
}

init();
