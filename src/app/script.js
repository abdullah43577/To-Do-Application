// Todo1: Users must be able to create todo list items ✅
// Todo2: Users must be able to mark todo as completed ✅
// Todo3: users must be able to edit todo list items
// Todo4: users must be able to delete todo list items
// Todo5: users must be able to toggle between the (All, Active and Complete Tabs)
// Todo6: users must be able to reorder list items
// Todo7: users must be able to toggle background colors
// Todo8: Todo list items must persist in localStorage

// Todo: QuickTip, you can use filtering for the All, active and completed sections for this challenge.

class Todo {
  // representing the All array in this case.
  #todoLists = JSON.parse(localStorage.getItem("Todos")) || [];
  // #index = this.#todoLists.length;
  #index = parseInt(localStorage.getItem("TodosIndex")) || 0;
  #active = [];
  #completed = [];
  constructor() {
    this.form = document.querySelector("form");
    this.todoInput = document.querySelector(".todoInput");
    this.todoContainer = document.querySelector(".todo--section");

    this.form.addEventListener("submit", this._addTodoItem.bind(this));
    this.todoContainer.addEventListener("click", this._toggleBtns.bind(this));
    this.todoContainer.addEventListener(
      "click",
      this._markCompleted.bind(this)
    );
    this._renderTodoItem();
  }

  _markCompleted(e) {
    let input = e.target.closest('input[type="checkbox"]');
    if (!input) return;

    input.nextElementSibling.classList.toggle("checked");
    if (input.checked) {
      this.#todoLists[input.id - 1].isCompleted = true;
    } else {
      this.#todoLists[input.id - 1].isCompleted = false;
    }
    localStorage.setItem("Todos", JSON.stringify(this.#todoLists));
    console.log(localStorage);
  }

  _toggleBtns(e) {
    let elipsis = e.target.closest(".fa-ellipsis");
    if (!elipsis) return;

    // toggle the edit and delete button container
    elipsis.nextElementSibling.classList.toggle("hidden");
    elipsis.nextElementSibling.classList.toggle("flex");

    // accessing the edit container element
    let editContainer = elipsis.nextElementSibling.firstElementChild;
    // accessing the todo paragraph element
    let element =
      editContainer.parentElement.parentElement.firstElementChild
        .lastElementChild;

    let submitContainer = editContainer.nextElementSibling;

    editContainer.addEventListener("click", () => {
      console.log("edit!");

      this.todoInput.value = element.textContent.trim();

      editContainer.classList.add("hidden");
      submitContainer.classList.remove("hidden");
      submitContainer.classList.add("flex");
    });

    submitContainer.addEventListener("click", () => {
      console.log("clicked");
      element.textContent = this.todoInput.value;

      editContainer.classList.remove("hidden");
      submitContainer.classList.add("hidden");
      submitContainer.classList.remove("flex");

      this.todoInput.value = "";

      // hide container
    });
  }

  _renderTodoItem() {
    let html = "";
    if (this.#todoLists) {
      this.#todoLists.forEach((todo) => {
        html += `
        <div class="todo--container relative flex cursor-pointer items-center justify-between border-b border-veryDarkGrayishBlue bg-veryLightGray px-5 py-4 dark:border-veryLightGrayishBlue dark:bg-veryDarkDesaturatedBlue" draggable="true">
          <div class="todo-content flex items-center">
            <input type="checkbox" class="mr-3 cursor-pointer" id="${todo.id}"/>
            <p class="text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">${todo.todo}</p>
          </div>

          <i class="fa-solid fa-ellipsis fa-lg cursor-pointer text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>

            <div class="editdel-container absolute right-0 top-8 hidden h-[80px] w-[100px] flex-col justify-center gap-[0.5rem] rounded-lg bg-veryLightGray px-2 z-10 dark:bg-veryDarkGrayishBlue">
                <div class="edit-container flex cursor-pointer items-center justify-around">
                  <i class="fa-solid fa-pen-to-square text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>
                  <p class="text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">Edit</p>
                </div>
                
                <div class="submit-container cursor-pointer items-center justify-around hidden">
                  <i class="fa-solid fa-pen-to-square text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>
                  <p class="text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">Submit</p>
                </div>

                <div class="delete-container flex w-full cursor-pointer items-center justify-around border-t border-veryDarkGrayishBlue pt-2">
                  <i class="fa-solid fa-trash text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>
                  <p class="text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">Delete</p>
                </div>
              </div>
        </div>`;
      });
      this.todoContainer.innerHTML =
        html ||
        `<div class="relative flex cursor-pointer items-center justify-between bg-veryLightGray px-5 py-4 dark:bg-veryDarkDesaturatedBlue text-veryDarkGrayishBlue dark:text-lightGrayishBlue text-sm">There are no todos at this time!</div>`;
    }
  }

  _addTodoItem(e) {
    e.preventDefault();

    if (this.todoInput.value) {
      ++this.#index;
      localStorage.setItem("TodosIndex", this.#index);

      let storage = {
        id: this.#index,
        todo: this.todoInput.value.trim(),
        isActive: true,
        isCompleted: false,
      };

      this.#todoLists.push(storage);
      localStorage.setItem("Todos", JSON.stringify(this.#todoLists));

      this.todoInput.value = "";
      this._renderTodoItem();
    }
  }
}

const todo = new Todo();
