"use strict";
const completed = document.querySelector(".activeEl + p + p");

completed.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checker");
  const text = document.querySelectorAll(".todo > p");
  const renderedElement = document.querySelectorAll(".renderedEl");

  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked) {
      completedTodo.push(text[i].textContent);
      render(completedTodo);
      deleteEl();

      renderedElement[i].remove();
      console.log(listItems);

      index = i;
      refactor();
    } else {
      listItem.innerHTML = `<div class="flex items-center justify-around bg-veryDarkDesaturatedBlue p-[10px] text-white">You've not completed any todo list item</div>`;
    }
  });
  console.log(completedTodo);
});
