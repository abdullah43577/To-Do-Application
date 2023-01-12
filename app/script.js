"use strict";

let myArray = [];
const input = document.querySelector('input[type="text"]');
const listItem = document.querySelector("ul");
const form = document.querySelector("form");
const itemsLeft = document.querySelector(".listElement > p");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myArray"));
console.log(leadsFromLocalStorage);

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
};

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let inputEl = input.value;
    myArray.push(inputEl);

    // saving the myArray array to localStorage (localStorages only accepts strings as input not objects or arrays, hence the need for the JSON.stringify)
    localStorage.setItem("myArray", JSON.stringify(myArray));

    render(myArray);

    // Update the items counter
    updateMe();

    // invoking the delete button function
    deleteEl();
  }
});

// check if leads in localStorage
if (leadsFromLocalStorage) {
  myArray = leadsFromLocalStorage;
  render(myArray);

  itemsLeft.textContent = `${myArray.length} items left`;
}
