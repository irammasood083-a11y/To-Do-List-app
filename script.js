let addBtn = document.getElementById("add-task");
let taskInput = document.getElementById("taskInput");
let taskList = document.querySelector(".task-list");

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let existingTasks = document.querySelectorAll(".task");
let filterButtons = document.querySelectorAll(".top-buttons button");
let taskCount = document.getElementById("taskCount");
let clearBtn = document.querySelector(".task-completed button");

function showTasks() {
  tasks.forEach(function (task) {
    let newTask = document.createElement("div");
    newTask.classList.add("task");
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", function () {

      task.completed = checkBox.checked;

      saveTasks();
      updateCount();

    });
    let taskText = document.createElement("span");
    taskText.innerText = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function () {
      let input = document.createElement("input");
      input.value = taskText.innerText;
      taskText.replaceWith(input);
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          taskText.innerText = input.value;
          task.text = input.value;
          input.replaceWith(taskText);
          saveTasks();
        }
      });
    });
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function () {
      newTask.remove();
      tasks = tasks.filter(function (item) {
        return item.text !== task.text;
      });
      saveTasks();
      updateCount();
    });
    newTask.appendChild(checkBox);
    newTask.appendChild(taskText);
    newTask.appendChild(editBtn);  
    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
  });
}

showTasks();
function updateCount() {
  let tasks = document.querySelectorAll(".task");
  let completed = 0;
  tasks.forEach(function (task) {
    let checkBox = task.querySelector('input[type="checkbox"]');
    if (checkBox.checked) {
      completed++;
    }
  });
  let total = tasks.length;
  taskCount.innerText = completed + " of" + total + " task completed";
}
updateCount();

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.innerText === "All") {
      let tasks = document.querySelectorAll(".task");
      tasks.forEach(function (task) {
        task.style.display = "flex";
      });
    }
    if (button.innerText === "Active") {
      let tasks = document.querySelectorAll(".task");
      tasks.forEach(function (task) {
        let checkBox = task.querySelector('input[type="checkbox"]');
        if (checkBox.checked) {
          task.style.display = "none";
        } else {
          task.style.display = "flex";
        }
      });
    }
    if (button.innerText === "Complete") {
      let tasks = document.querySelectorAll(".task");
      tasks.forEach(function (task) {
        let checkBox = task.querySelector('input[type="checkbox"]');
        if (checkBox.checked) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    }
  });
});

addBtn.addEventListener("click", function () {
  let taskIext = taskInput.value;
  tasks.push({
    text: taskIext,
    completed: false
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));

  let newTask = document.createElement("div");
  newTask.classList.add("task");

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  let task = document.createElement("span");
  task.innerText = taskIext;

  checkBox.addEventListener("change", function () {
    if (checkBox.checked) {
      task.classList.add("completed");
    } else {
      task.classList.remove("completed");
    }
    updateCount();
  });

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", function () {
    let task = newTask.querySelector("span");
    let input = document.createElement("input");
    input.value = task.innerText;
    task.replaceWith(input);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        task.innerText = input.value;
        input.replaceWith(task);
      }
    });
  });
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function () {
    newTask.remove();
    updateCount();
  });

  newTask.appendChild(checkBox);
  newTask.appendChild(task);
  newTask.appendChild(editBtn);
  newTask.appendChild(deleteBtn);

  taskList.appendChild(newTask);
  taskInput.value = "";
  updateCount();
});

existingTasks.forEach(function (taskItem) {
  let checkbox = taskItem.querySelector('input[type="checkbox"]');
  let taskIext = taskItem.querySelector("span");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskIext.classList.add("completed");
    } else {
      taskIext.classList.remove("completed");
    }
    updateCount();
  });

  let editBtn = taskItem.querySelector("button");
  editBtn.addEventListener("click", function () {
    let input = document.createElement("input");
    input.value = taskIext.innerText;
    taskIext.replaceWith(input);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        taskIext.innerText = input.value;
        input.replaceWith(taskIext);
      }
    });
  });

  let deleteBtn = taskItem.querySelector("button:last-of-type");
  deleteBtn.addEventListener("click", function () {
    taskItem.remove();
    updateCount();
  });
});

clearBtn.addEventListener("click", function () {
  let tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    let checkBox = task.querySelector('input[type="checkbox"]');
    if (checkBox.checked) {
      task.remove();
    }
  });
  updateCount();
});
