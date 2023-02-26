const form = document.getElementById("form-input");
const todoContent = document.getElementById("todo-content");
const todoInput = document.getElementById("todoInput");
const alertStatus = document.getElementsByClassName("alert")[0];
const divNull = document.createElement("div");
let btnSubmit = document.getElementsByClassName("btn")[0];
let dataStorage = JSON.parse(localStorage.getItem("data"));
let divWrap = document.createElement("div");

let todoList = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function sendTodo() {
  if (todoInput.value < 1) {
    const p = document.createElement("p");
    p.innerHTML = "Harap masukkan nilai!";
    alertStatus.append(p);
    btnSubmit.disabled = true;
    setTimeout(() => {
      alertStatus.removeChild(p);
      btnSubmit.disabled = false;
    }, 2000);
  } else {
    todoList.push(todoInput.value);
    todoInput.value = "";
    createTodo();
  }
}

function createTodo() {
  if (todoList) {
    divNull.remove();
  }

  const divWrap = document.createElement("div");
  divWrap.classList.add("content-wrap");
  const h2 = document.createElement("h2");
  h2.classList.add("title");
  const divIcon = document.createElement("div");
  divIcon.classList.add("action");
  const span = document.createElement("span");
  const doneIcon = document.createElement("i");
  const editIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");

  doneIcon.classList = "fa-solid fa-check";
  editIcon.classList = "fa-solid fa-pen";
  deleteIcon.classList = "fa-solid fa-trash";

  doneIcon.addEventListener("click", doneData);

  editIcon.addEventListener("click", editData);

  deleteIcon.addEventListener("click", deleteData);

  todoList.forEach((data, i) => {
    h2.innerHTML = `${data}`;
  });

  span.append(doneIcon, editIcon, deleteIcon);
  divWrap.append(h2, divIcon, span);
  divIcon.appendChild(span);
  todoContent.appendChild(divWrap);

  saveToStorage();
}

function saveToStorage() {
  return window.localStorage.setItem("data", JSON.stringify(todoList));
}

function clearStorage() {
  window.localStorage.clear();
  return window.location.reload();
}

function checkData() {
  if (dataStorage != null) {
    readData();
  } else {
    divNull.classList.add("data-null");
    const h1 = document.createElement("h1");
    h1.innerHTML = "Data Kosong";

    divNull.appendChild(h1);
    todoContent.appendChild(divNull);
  }
}

function readData() {
  dataStorage.forEach((data) => {
    divWrap.classList.add("content-wrap");
    const h2 = document.createElement("h2");
    h2.classList.add("title");
    const divIcon = document.createElement("div");
    divIcon.classList.add("action");
    const span = document.createElement("span");
    const doneIcon = document.createElement("i");
    const editIcon = document.createElement("i");
    const deleteIcon = document.createElement("i");

    doneIcon.classList = "fa-solid fa-check";
    editIcon.classList = "fa-solid fa-pen";
    deleteIcon.classList = "fa-solid fa-trash";

    span.append(doneIcon, editIcon, deleteIcon);
    divWrap.append(h2, divIcon, span);
    divIcon.appendChild(span);
    todoContent.appendChild(divWrap);

    h2.innerHTML = `${data}`;
  });
}

function doneData() {
  alert("done");
}

function editData() {
  alert("edit");
}

function deleteData() {
  alert("delete");
}

window.addEventListener("load", checkData);
