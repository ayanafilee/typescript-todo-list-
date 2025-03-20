// Define User interface
interface User {
  username: string;
  password: string;
}

// DOM Elements
const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const listContainer = document.getElementById(
  "listContainer"
) as HTMLDivElement;
const emptyState = document.getElementById("emptyState") as HTMLDivElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

// Auth Elements
const authContainer = document.getElementById(
  "authContainer"
) as HTMLDivElement;
const mainContainer = document.getElementById(
  "mainContainer"
) as HTMLDivElement;
const showSignIn = document.getElementById("showSignIn") as HTMLButtonElement;
const showSignUp = document.getElementById("showSignUp") as HTMLButtonElement;
const signInForm = document.getElementById("signInForm") as HTMLFormElement;
const signUpForm = document.getElementById("signUpForm") as HTMLFormElement;
const authError = document.getElementById("authError") as HTMLDivElement;

// User storage
let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
if (users.length === 0) {
  users.push({ username: "ayu", password: "1111" });
  localStorage.setItem("users", JSON.stringify(users));
}

// UI Functions
function updateUI(): void {
  const hasTasks = taskList.children.length > 0;
  listContainer.style.display = hasTasks ? "block" : "none";
  emptyState.style.display = hasTasks ? "none" : "block";
}

// Task Functions
function addTask(text: string): void {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskContent = document.createElement("span");
  taskContent.className = "task-content";
  taskContent.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    updateUI();
  });

  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}

// Event Listeners
taskForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTask(taskText);
    taskInput.value = "";
    taskInput.focus();
    updateUI();
  }
});

// Auth Functions
showSignIn.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  signInForm.style.display = "flex";
  signUpForm.style.display = "none";
  authError.style.display = "none";
});

showSignUp.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  signInForm.style.display = "none";
  signUpForm.style.display = "flex";
  authError.style.display = "none";
});

signInForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const username = (
    document.getElementById("signInUsername") as HTMLInputElement
  ).value;
  const password = (
    document.getElementById("signInPassword") as HTMLInputElement
  ).value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    authContainer.style.display = "none";
    mainContainer.style.display = "block";
  } else {
    authError.textContent = "Invalid username or password";
    authError.style.display = "block";
  }
});

signUpForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const username = (
    document.getElementById("signUpUsername") as HTMLInputElement
  ).value;
  const password = (
    document.getElementById("signUpPassword") as HTMLInputElement
  ).value;

  if (users.some((u) => u.username === username)) {
    authError.textContent = "Username already exists";
    authError.style.display = "block";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  authError.textContent = "Account created successfully! Please sign in.";
  authError.style.color = "#2ecc71";
  authError.style.display = "block";

  signInForm.reset();
  signUpForm.reset();
  showSignIn.click();
});

// Initial setup
updateUI();
