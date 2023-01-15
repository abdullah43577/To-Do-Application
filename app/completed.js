"use strict";
const completed = document.querySelector(".activeEl + p + p");

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

      newListItems = listItems.filter(
        (deletedWord) => deletedWord != listItems[i]
      );

      listItems = newListItems;
      localStorage.setItem("completedTodo", JSON.stringify(completedTodo));
    } else {
      listItem.innerHTML = `<div class="flex items-center justify-around bg-veryDarkDesaturatedBlue p-[10px] text-white">You've not completed any todo list item</div>`;
    }
  });
  if (completedTodo.length > 0) render(completedTodo);
});
