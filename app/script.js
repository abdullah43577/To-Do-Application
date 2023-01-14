"use strict";

let listItems = [];
let newListItems = [];
let completedTodo = [];
const input = document.querySelector('input[type="text"]');
const listItem = document.querySelector("ul");
const form = document.querySelector("form");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("listItems"));
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

// completed.addEventListener("click", () => {
//   const checkboxes = document.querySelectorAll(".checker");
//   // console.log(checkboxes);

//   checkboxes.forEach((checkbox, i) => {
//     if (checkbox.checked) {
//       console.log(checkbox.checked);
//       let test = [];
//       test.filter((item) => listItems[i]);
//       completedItems = test;
//       console.log(completedItems);
//     }
//   });
// });
