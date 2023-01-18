// @ts-nocheck
import { data } from "./data.js";

const createBtn = document.getElementById("createBtn");
const tasks = document.querySelectorAll(".card-body");
const divArchivedTasks = document.querySelector(".archived-tasks");
const modaleForm = document.querySelector("#modale");
const inputName = document.querySelector("#name");
const selectCategory = document.querySelector("#category");
const contentArea = document.querySelector("#content");
const btnCloseModal = document.querySelector("#btnClose");
const btnSubmitModal = document.querySelector("#btnSubmit");
const searchInput = document.querySelector("#search");

let myTasks = data;
let archivedTasks = [];

const newId = () => +String(performance.now()).replace(".", "") + Date.now();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();
const currentMonth = months[date.getMonth()];
let currentDate = `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`;

// ============== listeners ====================================
tasks.forEach((i) => {
  i.addEventListener("click", removeTask);
});
tasks[0].addEventListener("click", editTask);
tasks[0].addEventListener("click", archiveCurrentTask);
tasks[1].addEventListener("click", unzipTask);
searchInput.addEventListener("input", search);
createBtn.addEventListener("click", createTask);
modaleForm.addEventListener("submit", submitForm);
btnCloseModal.addEventListener("click", () => {
  modaleForm.classList.add("invisible");
  modaleForm.classList.remove("visible");
  inputName.value = "";
  selectCategory.value = "-1";
  contentArea.value = "";
});
// ============== end listeners ====================================

showTasks();
showArchivedTasks();

// ==================== show task =================================
function showTasks() {
  let html = "";

  myTasks.forEach((t) => {
    let img = ``;
    if (t.category === "Task") {
      img = `
          <div class="svg__img">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </div>  `;
    } else if (t.category === "Random Thought") {
      img = `
        <div class="svg__img">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
            <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
          </svg>
        </div>
      `;
    } else if (t.category === "Idea") {
      img = `
        <div class="svg__img">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
          </svg>        
        </div>
      `;
    }

    html += `
    <div id="${t.id}" class="task  bg-secondary p-3 mb-2 text-light">
          <div class=" d-flex justify-content-between align-items-center ">
          ${img}
            <span class="name  field">${t.name}</span>
            <span class="created  field">${t.created}</span>
            <span class="category  field">${t.category}</span>
            <span class="content field">${t.content}</span>
          </div>
          <div class="btns">
            <svg data-action='archive' style='cursor: pointer'
            xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#abe0c9" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path data-action='archive' d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <svg data-action='edit' 
              style='border: 2px solid #585757; border-radius: 7px; padding: 4px; cursor: pointer'
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#abe0c9" class="bi bi-pencil-fill " viewBox="0 0 16 16">
                <path data-action='edit'  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
            
            <svg data-action='remove'
              style='border: 2px solid #585757; border-radius: 7px; padding: 4px; cursor: pointer'
              xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#ad4040" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path data-action='remove' d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
          </div>
    </div>
    `;
  });
  if (myTasks.length !== 0) {
    tasks[0].innerHTML = html;
  } else {
    tasks[0].innerHTML = "No more tasks...";
  }
}

// ===================== removeTask ====================
function removeTask(event) {
  const target = event.target;
  if (target.dataset.action !== "remove") return;
  let currentTask = target.closest(".task");
  myTasks = myTasks.filter((t) => t.id !== +currentTask.id);
  showTasks();
  if (archivedTasks) {
    archivedTasks = archivedTasks.filter((t) => t.id !== +currentTask.id);
    showArchivedTasks();
  }
}

// ===================== editTask ====================
function editTask(e) {
  const target = e.target;
  const currentTask = target.closest(".task");

  let name = currentTask.children[0].childNodes[3];
  let date = currentTask.children[0].childNodes[5];
  let category = currentTask.children[0].childNodes[7];
  let content = currentTask.children[0].childNodes[9];

  if (target.dataset.action === "edit") {
    myTasks.map((t) => {
      if (t.id === Number(currentTask.id)) {
        document.getElementById(currentTask.id).innerHTML = `
         <div class='d-flex flex-column w-25'>
            <input class="name__input  m-2" style='border-radius: 7px; border: none;' value='${name.innerHTML}'></input>
            <select class="form-select m-2" id="category">
                <option selected  value="${category.innerHTML}">${category.innerHTML}</option>
                <option value="Task">Task</option>
                <option value="Idea">Idea</option>
                <option value="Random Thought">Random Thought</option>
            </select>            
            <input class="content__input m-2" style='border-radius: 7px; border: none;' 
              value='${content.innerHTML}'></input>
          </div>
          <div class="btns">
          <button data-action='save' class="btn btn-primary "
            >Save</button>
             
            <svg data-action='remove'
              style='border: 2px solid #585757; border-radius: 7px; padding: 4px; cursor: pointer'
              xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#ad4040" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path data-action='remove' d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
          </div>
      `;
      }
    });
  }
  if (target.dataset.action === "save") {
    let name = document.querySelector(".name__input").value;
    let category = document.querySelector(".form-select").value;
    let content = document.querySelector(".content__input").value;

    myTasks = myTasks.filter((t) => t.id !== +currentTask.id);

    const updatedTask = {
      id: +currentTask.id,
      name: name,
      created: currentDate,
      category: category,
      content: content,
    };

    myTasks = [updatedTask, ...myTasks];

    showTasks();
    // showArchivedTasks();
  }
}

// ===================== show archived tasks =====================

function showArchivedTasks() {
  let html = "";

  archivedTasks.forEach((t) => {
    let img = ``;
    if (t.category === "Task") {
      img = `
          <div class="svg__img">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </div>  `;
    } else if (t.category === "Random Thought") {
      img = `
        <div class="svg__img">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
            <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
          </svg>
        </div>
      `;
    } else if (t.category === "Idea") {
      img = `
        <div class="svg__img">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
          </svg>        
        </div>
      `;
    }

    html += `
    <div id="${t.id}" class="task d-flex justify-content-between align-items-center bg-secondary p-3 mb-2 text-light">
      <div class=" d-flex justify-content-between align-items-center ">
            ${img}
              <span class="name  field">${t.name}</span>
              <span class="created field">${t.created}</span>
              <span class="category field">${t.category}</span>
              <span class="content field">${t.content}</span>
            </div>
            <div class="btns">
            <svg data-action='unzip' xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;" width="40" height="40" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
              <path data-action='unzip' d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
            </svg>
              
              <svg data-action='remove'
              style='border: 2px solid #585757; border-radius: 7px; padding: 4px; cursor: pointer'
              xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#ad4040" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path data-action='remove' d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
              </svg>

            </div>
      </div>
    
    `;
  });
  if (archivedTasks.length !== 0) {
    divArchivedTasks.childNodes[1].innerHTML = html;
  } else {
    divArchivedTasks.childNodes[1].innerHTML = "No more archived tasks...";
  }
}

// ================= archive ==========================
function archiveCurrentTask(e) {
  const currentTask = e.target.closest(".task");

  if (e.target.dataset.action !== "archive") return;

  myTasks = myTasks.filter((item) => {
    if (item.id !== +currentTask.id) return item;
    archivedTasks = [item, ...archivedTasks];
  });

  showTasks();
  showArchivedTasks();
}

// =================== unzipTask ========================
function unzipTask(e) {
  const currentArchiveTask = e.target.closest(".task");

  if (e.target.dataset.action !== "unzip") return;

  archivedTasks = archivedTasks.filter((task) => {
    if (task.id !== +currentArchiveTask.id) return task;
    myTasks = [task, ...myTasks];
  });

  showTasks();
  showArchivedTasks();
}

// ===================== createTask ====================
function createTask() {
  modaleForm.classList.remove("invisible");
  modaleForm.classList.add("visible");
}

// ===================== submitForm ====================
function submitForm(e) {
  e.preventDefault();

  const newTask = {
    id: newId(),
    name: inputName.value,
    created: currentDate,
    category: selectCategory.value,
    content: contentArea.value,
  };

  // myTasks.push(newTask);
  myTasks = [newTask, ...myTasks];

  modaleForm.classList.add("invisible");
  modaleForm.classList.remove("visible");
  inputName.value = "";
  selectCategory.value = "-1";
  contentArea.value = "";

  showTasks();
}

// ================== search ========================
function search(e) {
  let names = document.querySelectorAll(".name");

  names.forEach((n) => {
    if (e.target.value) {
      if (
        n.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim())
      ) {
        n.parentNode.parentElement.style.display = "";
      } else {
        n.parentNode.parentElement.style.display = "none ";
      }
    } else {
      n.parentNode.parentElement.style.display = "";
    }
  });
}
