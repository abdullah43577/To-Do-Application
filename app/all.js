"use strict";
const firstbtn = document.querySelector(".elementStates :first-child");
console.log(firstbtn);

firstbtn.addEventListener("click", () => {
  render(listItems);
});
