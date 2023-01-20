"use strict";
const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
const navBtnFilter = document.querySelectorAll(".activeMenu");
const ul = document.querySelector("ul");
const counter = document.querySelector(".listElement > p");
const clearCompleted = document.querySelector(".delStates > p");
// variable for keeping track of the rendered background state
let isDarkOrWhite = "dark";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// get items from localStorage if there is
let todoItems = JSON.parse(localStorage.getItem("todo-list"));

const todoCounter = function () {
  counter.textContent = `${todoItems.length} items left`;
};

navBtnFilter.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn);
    // Toggling the active filter class
    (() => {
      navBtnFilter.forEach((btn) => {
        if (btn.classList.contains("activeEl"))
          btn.classList.remove("activeEl");
      });
    })();

    btn.classList.add("activeEl");
    displayTodo(btn.id);
  });
});

const displayTodo = function (filterItems) {
  let li = "";
  if (todoItems) {
    todoItems.forEach((item, id) => {
      // if todo is completed, setting it's isCompleted value to checked
      let isCompleted = item.status === "completed" ? "checked" : "";
      if (filterItems === item.status || filterItems === "all") {
        li += `<li>
                    <div class="renderedEl render pt-[12px] pb-[12px] flex items-center justify-between cursor-pointer ${isDarkOrWhite}">
                      <label for="${id}" class="todo flex items-center w-full cursor-pointer">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} class="${isDarkOrWhite}"/>
                              <p class="text-white pl-[10px] ${isCompleted} ${isDarkOrWhite}">${item.name}</p>
                      </label>
                      <figure onclick="deleteTodo(${id})" class="cursor-pointer">
                          <img src="/images/icon-cross.svg" alt="icon cross" />
                      </figure>
                    </div>
              </li>`;
        // console.log(id, item.name);
      }
    });
  }
  ul.innerHTML =
    li ||
    `<div class="render pt-[12px] pb-[12px] flex items-center text-white ${isDarkOrWhite}"><p class="empty ${isDarkOrWhite}"> You don't have any task here</p></div>`;
  todoCounter();
};
// on browser load executes this
displayTodo("all");

const updateStatus = function (selectedTodo) {
  let taskName = selectedTodo.parentElement.lastElementChild;

  if (selectedTodo.checked) {
    taskName.classList.add("checked");
    //updating the status to completed when checked
    todoItems[selectedTodo.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    //updating the status to active when not checked
    todoItems[selectedTodo.id].status = "active";
  }
  //updating the respective status in localStorage
  localStorage.setItem("todo-list", JSON.stringify(todoItems));
};

input.addEventListener("keyup", (e) => {
  let todo = input.value.trim();
  if (input.value && e.key === "Enter") {
    // if there's no todoItems, set to an empty array
    if (!todoItems) {
      todoItems = [];
    }

    input.value = "";
    let taskInfo = { name: todo, status: "active" };
    todoItems.push(taskInfo);
    // storing items into localStorage
    localStorage.setItem("todo-list", JSON.stringify(todoItems));
    displayTodo("all");
    todoCounter();
  }
});

// cross delete btn
const deleteTodo = function (deleteId) {
  console.log(deleteId);
  todoItems.splice(deleteId, 1);
  console.log(todoItems);
  // updating localStorage
  localStorage.setItem("todo-list", JSON.stringify(todoItems));
  location.reload();
  displayTodo("all");
};

clearCompleted.addEventListener("click", () => {
  todoItems.splice(0, todoItems.length);
  // updating localStorage
  localStorage.setItem("todo-list", JSON.stringify(todoItems));
  location.reload();
  displayTodo("all");
});
