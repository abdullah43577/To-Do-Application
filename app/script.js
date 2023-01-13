"use strict";

let listItems = [];
let newListItems = [];
let completedItems = [];
const input = document.querySelector('input[type="text"]');
const listItem = document.querySelector("ul");
const form = document.querySelector("form");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("listItems"));
const itemsLeft = document.querySelector(".listElement > p");

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

  // empty input field
  input.value = "";

  if (countItems) countItems();
  else return;
};

input.addEventListener("keyup", (e) => {
  if (input.value && e.key === "Enter") {
    let inputEl = input.value;
    listItems.push(inputEl);

    localStorage.setItem("listItems", JSON.stringify(listItems));

    render(listItems);

    // Update the items counter
    countItems();

    // invoking the delete button function
    deleteEl();
  }
});

// check if leads in localStorage
if (leadsFromLocalStorage) {
  listItems = leadsFromLocalStorage;
  render(listItems);
  countItems();
  deleteEl();
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

      localStorage.setItem("listItems", JSON.stringify(newListItems));
      const newStorage = JSON.parse(localStorage.getItem("listItems"));
      newListItems = newStorage;
      render(newListItems);
      location.reload();

      // Update the items counter
      countItems();
    });
  });
}

// update items counter
function countItems() {
  itemsLeft.textContent = `${listItems.length} items left`;
}
