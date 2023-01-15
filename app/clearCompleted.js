"use strict";
const delState = document.querySelector(".delStates > p");

delState.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checker");
  const renderedElement = document.querySelectorAll(".renderedEl");
  const lastChild = document.querySelector(".elementStates > :last-child");

  checkboxes.forEach((box, i) => {
    if (box.checked && lastChild.classList.contains("activeEl")) {
      renderedElement[i].remove();

      // completely removes the completed Item from the DOM and localStorage
      newListItems = listItems.filter(
        (deletedWord) => deletedWord != listItems[i]
      );
      listItems = newListItems;
      localStorage.setItem("listItems", JSON.stringify(listItems));

      // whether or not a user checks any of the checkboxes in the completed tab, on pressing the clearCompleted button, it deletes all elements on the page.
      if (completedTodo.length > 0) completedTodo = [];
      localStorage.setItem("completedTodo", JSON.stringify(completedTodo));
      renderCompletedTodo();
      location.reload();

      countItems();
    }
  });
});
