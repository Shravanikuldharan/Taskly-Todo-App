let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
});

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push(taskText);
  updateLocalStorage();
  renderTasks();

  input.value = "";
}

function deleteTask(button) {
  let li = button.closest("li");
  let taskText = li.querySelector(".task-text").innerText;

  let newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] !== taskText) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;
  updateLocalStorage();
  renderTasks();
}

function editTask(button) {
  let li = button.closest("li");
  let taskText = li.querySelector(".task-text").innerText;

  let newTask = prompt("Edit your task:", taskText);

  if (newTask !== null && newTask.trim() !== "") {
    let index = tasks.indexOf(taskText);
    if (index !== -1) {
      tasks[index] = newTask.trim();
      updateLocalStorage();
      renderTasks();
    }
  }
}

function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    taskList.innerHTML +=
      '<li class="fade-in">' +
      '<span class="task-text">' +
      tasks[i] +
      "</span>" +
      '<span class="icon-group">' +
      '<img src="img/edit.png" class="edit-icon" height="22" title="Edit Task" onclick="editTask(this)">' +
      '<img src="img/delete.png" class="delete-icon" height="22" title="Delete Task" onclick="deleteTask(this)">' +
      "</span>" +
      "</li>";
  }

  let noTasksImage = document.getElementById("noTasksImage");
  let noTasksText = document.getElementById("noTasksText");
  if (tasks.length === 0) {
    noTasksImage.style.display = "block";
    noTasksText.style.display = "block";
  } else {
    noTasksImage.style.display = "none";
    noTasksText.style.display = "none";
  }
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
