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
function renderCompletedTodo() {
  // check if leads in localStorage
  if (leadsFromCompletedTodo) {
    completedTodo = leadsFromCompletedTodo;
    render(completedTodo);
    countItems();
    deleteEl();
  }
}

// implementation of the cross delete button
function deleteEl() {
  const del = document.querySelectorAll("figure");
  const renderedElement = document.querySelectorAll(".renderedEl");

  del.forEach((delBTN, i) => {
    delBTN.addEventListener("click", () => {
      renderedElement[i].remove();

      newListItems = listItems.filter(
        (deletedWord) => deletedWord != listItems[i]
      );
      listItems = newListItems;
      localStorage.setItem("listItems", JSON.stringify(listItems));

      // Update the items counter
      countItems();
    });
  });
}

// function refactor() {
//   newListItems = listItems.filter(
//     (deletedWord) => deletedWord != listItems[index]
//   );
//   console.log(newListItems);
//   listItems = newListItems;
//   localStorage.setItem("listItems", JSON.stringify(listItems));
// }

// update items counter
function countItems() {
  itemsLeft.textContent = `${listItems.length} items left`;
}

function completedItems() {
  completed.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checker");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) console.log(checked);
    });
  });
}

const menubtns = document.querySelectorAll(".active");

menubtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    checkActiveEl();
    btn.classList.add("activeEl");
  });
});

function checkActiveEl() {
  menubtns.forEach((btn) => {
    if (btn.classList.contains("activeEl")) btn.classList.remove("activeEl");
  });
}
