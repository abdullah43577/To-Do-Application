"use strict";

let listItems = [];
let newListItems = [];
let completedTodo = [];
const input = document.querySelector('input[type="text"]');
const listItem = document.querySelector("ul");
const form = document.querySelector("form");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("listItems"));
let leadsFromCompletedTodo = JSON.parse(localStorage.getItem("completedTodo"));
const itemsLeft = document.querySelector(".listElement > p");
// const completed = document.querySelector(".activeEl + p + p");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// counter to keep track of index (subject to change, would take a closer look at this code)
let index = 0;

const renderNewItems = function (key, array) {
  newListItems = listItems.filter(
    (deletedWord) => deletedWord != listItems[index]
  );
  console.log(newListItems);
  listItems = newListItems;
  localStorage.setItem(key, JSON.stringify(array));
};

// implementation of the cross delete button
const deleteEl = function () {
  const del = document.querySelectorAll("figure");
  const renderedElement = document.querySelectorAll(".renderedEl");

  del.forEach((delBTN, i) => {
    delBTN.addEventListener("click", () => {
      renderedElement[i].remove();
      index++;
      renderNewItems("listItems", listItems);

      // Update the items counter
      countItems();
    });
  });
};

// update items counter
const countItems = function () {
  itemsLeft.textContent = `${listItems.length} items left`;
};

const completedItems = function () {
  completed.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checker");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) console.log(checked);
    });
  });
};

const render = (arr) => {
  let listEl = "";

  arr.forEach((el, i) => {
    listEl += `<li>
                  <div
                    class="renderedEl render pt-[12px] pb-[12px] flex items-center justify-between cursor-pointer"
                  >
                    <div
                      class="todo flex items-center justify-between w-auto"
                    >
                      <input type="checkbox" class="checker"/>
                      <p class="text-white pl-[10px]">${el}</p>
                    </div>
                    <figure class="cursor-pointer">
                      <img src="/images/icon-cross.svg" alt="icon cross"/>
                    </figure>
                  </div>
                </li>`;
  });
  listItem.innerHTML = listEl;
  listEl = "";

  deleteEl();
  countItems();
};

input.addEventListener("keyup", (e) => {
  if (input.value && e.key === "Enter") {
    let inputEl = input.value;
    listItems.push(inputEl);

    localStorage.setItem("listItems", JSON.stringify(listItems));
    // empty input field
    input.value = "";

    render(listItems);
    deleteEl();
    // completedItems();
  }
});

// check if leads in localStorage
if (leadsFromLocalStorage) {
  listItems = leadsFromLocalStorage;
  render(listItems);
  countItems();
  deleteEl();
}

const renderCompletedTodo = function () {
  // check if leads in localStorage
  if (leadsFromCompletedTodo) {
    completedTodo = leadsFromCompletedTodo;
    render(completedTodo);
    countItems();
    deleteEl();
  }
};

const menubtns = document.querySelectorAll(".active");

menubtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    checkActiveEl();
    btn.classList.add("activeEl");
  });
});

const checkActiveEl = function () {
  menubtns.forEach((btn) => {
    if (btn.classList.contains("activeEl")) btn.classList.remove("activeEl");
  });
};

// Menu Btns
const firstbtn = document.querySelector(".elementStates :first-child");
const completed = document.querySelector(".activeEl + p + p");
const delState = document.querySelector(".delStates > p");

// All Menu
firstbtn.addEventListener("click", () => render(listItems));

// Completed Menu
completed.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checker");
  const text = document.querySelectorAll(".todo > p");
  const renderedElement = document.querySelectorAll(".renderedEl");

  // render any saved up completedTodo if there is
  renderCompletedTodo();

  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked) {
      completedTodo.push(text[i].textContent);
      render(completedTodo);
      deleteEl();

      renderedElement[i].remove();
      index++;
      renderNewItems("completedTodo", completedTodo);
    } else {
      listItem.innerHTML = `<div class="flex items-center justify-around bg-veryDarkDesaturatedBlue p-[10px] text-white">You've not completed any todo list item</div>`;
    }
  });
  if (completedTodo.length > 0) render(completedTodo);
});

// Clear Completed Menu
delState.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checker");
  const renderedElement = document.querySelectorAll(".renderedEl");
  const lastChild = document.querySelector(".elementStates > :last-child");

  checkboxes.forEach((box, i) => {
    if (box.checked && lastChild.classList.contains("activeEl")) {
      renderedElement[i].remove();

      index++;
      // completely removes the completed Item from the DOM and localStorage
      renderNewItems("listItems", listItems);

      // whether or not a user checks any of the checkboxes in the completed tab, on pressing the clearCompleted button, it deletes all elements on the page.
      if (completedTodo.length > 0) completedTodo = [];
      localStorage.setItem("completedTodo", JSON.stringify(completedTodo));
      renderCompletedTodo();
      location.reload();

      countItems();
    }
  });
});
