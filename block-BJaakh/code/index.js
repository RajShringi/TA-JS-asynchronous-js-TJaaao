let url = "https://basic-todo-api.vercel.app/api/todo";
let todosUl = document.querySelector(".todos");
let input = document.querySelector("input");

function handleDelete(e) {
  let id = e.target.dataset.id;
  fetch(url + `/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

function handleCheckbox(e) {
  let id = e.target.dataset.id;
  let data = {
    todo: {
      isCompleted: true,
    },
  };
  fetch(url + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
    checkbox.addEventListener("input", handleCheckbox);
    let p = document.createElement("p");
    p.innerText = todo.title;
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
    });
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
