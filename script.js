let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
document.addEventListener("DOMContentLoaded", renderTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

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
  const li = button.parentElement;
  const taskText = li.firstChild.textContent.trim();
  tasks = tasks.filter(task => task !== taskText);
  updateLocalStorage();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("fade-in");

    const textNode = document.createTextNode(task);
    const img = document.createElement("img");

    img.src = "img/delete.png";
    img.height = 25;
    img.title = "Delete Task";
    img.classList.add("delete-icon");
    img.onclick = function () {
      deleteTask(this);
    };

    li.appendChild(textNode);
    li.appendChild(img);
    taskList.appendChild(li);
  });
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
