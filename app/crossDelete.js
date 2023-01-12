"use strict";
let temporaryArray = [];

const deleteEl = function () {
  const del = document.querySelectorAll("figure");
  const renderedElement = document.querySelectorAll(".renderedEl");

  del.forEach((delBTN, i) => {
    delBTN.addEventListener("click", () => {
      renderedElement[i].remove();

      myArray.splice(i, 1);

      // Update the items counter
      updateMe();
    });
  });
};
