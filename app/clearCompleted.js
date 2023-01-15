"use strict";
const delState = document.querySelector(".delStates > p");

delState.addEventListener("click", () => {
  console.log("I'm being clicked");
  const checkboxes = document.querySelectorAll(".checker");
  const renderedElement = document.querySelectorAll(".renderedEl");

  checkboxes.forEach((box, i) => {
    if (box.checked) {
      console.log("checked");
      renderedElement[i].remove();

      index = i;
      refactor();

      countItems();
    }
  });
});
