"use strict";
const completed = document.querySelector(".activeEl + p + p");

completed.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checker");
  const renderedEl = document.querySelectorAll(".renderedEl");

  let result = "";
  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked) {
      console.log(checkbox.checked);
      console.log(renderedEl[i]);
      //   console.log(`<li> ${renderedEl[i]} </li>`);

      completedTodo.push(renderedEl[i]);

      result += `<li> ${completedTodo[i]} </li>`;
      listItem.innerHTML = result;
    }
  });
  console.log(completedTodo);
});
