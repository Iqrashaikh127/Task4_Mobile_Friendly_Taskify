const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter");
const sortBtn = document.getElementById("sortByDate");
const searchInput = document.getElementById("searchInput");

let tasks = [];

function renderTasks(taskArray = tasks) {
  taskList.innerHTML = "";

  const searchQuery = searchInput.value.toLowerCase();

  taskArray.forEach((task, index) => {
    if (!task.text.toLowerCase().includes(searchQuery)) return;

    const li = document.createElement("li");

    // Check for overdue task
    const isOverdue = !task.completed && new Date(task.date) < new Date();
    if (isOverdue) li.classList.add("overdue");

    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `
      <strong>${task.text}</strong>
      <span>Due: ${task.date}</span>
    `;

    const btns = document.createElement("div");
    btns.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = 0.6;
    }

    btns.append(completeBtn, deleteBtn);
    li.append(info, btns);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = dueDate.value;
  if (text === "" || date === "") {
  alert("Please enter task description and due date.");
  return;
}
tasks.push({ text, date, completed: false });

  renderTasks();
  taskInput.value = "";
  dueDate.value = "";
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    if (type === "all") {
      renderTasks();
    } else if (type === "pending") {
      renderTasks(tasks.filter(task => !task.completed));
    } else if (type === "completed") {
      renderTasks(tasks.filter(task => task.completed));
    }
  });
});

sortBtn.addEventListener("click", () => {
  const sorted = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));
  renderTasks(sorted);
});

// 🔍 Search feature
searchInput.addEventListener("input", () => renderTasks());
