// Clase 1 (21): Añadir tareas desde un formulario

const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

loadTasksFromLocalStorage();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");

  const task = taskInput.value;
  console.log(task);

  if (task) {
    taskList.append(createTaskElement(task));
    storeTaskInLocalStorage(task);
    taskInput.value = "";
  }
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task;
  li.append(createButton("❌", "delete-btn"), createButton("✏️", "edit-btn"));
  return li;
}

function createButton(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn;
}

// Clase 2 (22): Eliminar y editar tareas del DOM

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteTask(event.target.parentElement);
  }

  else if (event.target.classList.contains("edit-btn")) {
    editTask(event.target.parentElement);
  }
});

function deleteTask(taskItem) {
  if(confirm("Estás seguro de que quieres eliminar esta tarea?")) {
    taskItem.remove();
    updateLocalStorage();
  }
}

function editTask(taskItem) {
  const newTask = prompt("Edita la tarea:", taskItem.firstChild.textContent);
  if (newTask !== null) {
    taskItem.firstChild.textContent = newTask;
    updateLocalStorage();
  }
}

// Clase 3 (23): Almacenamiento y carga de datos en localStorage

function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

// Clase 4 (24): Eliminar y editar tareas del localStorage

function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map( (li) => li.firstChild.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Array.from arma un arreglo a partir de la lista de nodos
}

// Clase 5 (26): Habilitar dark mode
const themeToggleButton = document.getElementById("toggle-theme-btn");

const currentTheme = localStorage.getItem("theme") || "light";
console.log("Current theme:", currentTheme);

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

if(currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}