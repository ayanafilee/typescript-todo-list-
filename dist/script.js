"use strict";
// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const listContainer = document.getElementById("listContainer");
const emptyState = document.getElementById("emptyState");
const logoutBtn = document.getElementById("logoutBtn");
// Auth Elements
const authContainer = document.getElementById("authContainer");
const mainContainer = document.getElementById("mainContainer");
const showSignIn = document.getElementById("showSignIn");
const showSignUp = document.getElementById("showSignUp");
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const authError = document.getElementById("authError");
// User storage
let users = JSON.parse(localStorage.getItem("users") || "[]");
if (users.length === 0) {
    users.push({ username: "ayu", password: "1111" });
    localStorage.setItem("users", JSON.stringify(users));
}
// UI Functions
function updateUI() {
    const hasTasks = taskList.children.length > 0;
    listContainer.style.display = hasTasks ? "block" : "none";
    emptyState.style.display = hasTasks ? "none" : "block";
}
// Task Functions
function addTask(text) {
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
taskForm.addEventListener("submit", (e) => {
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
showSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    signInForm.style.display = "flex";
    signUpForm.style.display = "none";
    authError.style.display = "none";
});
showSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    signInForm.style.display = "none";
    signUpForm.style.display = "flex";
    authError.style.display = "none";
});
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signInUsername").value;
    const password = document.getElementById("signInPassword").value;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        authContainer.style.display = "none";
        mainContainer.style.display = "block";
    }
    else {
        authError.textContent = "Invalid username or password";
        authError.style.display = "block";
    }
});
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signUpUsername").value;
    const password = document.getElementById("signUpPassword").value;
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
