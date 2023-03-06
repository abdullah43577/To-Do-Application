// Todo:
// Todo1: Users must be able to create todo list items
// Todo2: users must be able to edit todo list items
// Todo3: users must be able to delete todo list items
// Todo4: users must be able to toggle between the (All, Active and Complete Tabs)
// Todo5: users must be able to reorder list items
// Todo6: users must be able to toggle background colors
// Todo7: Todo list items must persist in localStorage

class Todo {
  // representing the All array in this case.
  #todoLists = JSON.parse(localStorage.getItem("Todos")) || [];
  #index = this.#todoLists.length;
  #active = [];
  #completed = [];
  constructor() {
    this.form = document.querySelector("form");
    this.todoInput = document.querySelector(".todoInput");
    this.todoContainer = document.querySelector(".todo--section");

    this.form.addEventListener("submit", this._addTodoItem.bind(this));
    this.todoContainer.addEventListener("click", this._toggleBtns.bind(this));
    this._renderTodoItem();
  }

  _toggleBtns(e) {
    let elipsis = e.target.closest(".fa-ellipsis");
    if (!elipsis) return;
    console.log(elipsis);

    elipsis.nextElementSibling.classlist.toggle("hidden");
  }

  _renderTodoItem() {
    let html = "";
    if (this.#todoLists) {
      this.#todoLists.forEach((todo) => {
        html += `
        <div class="todo--container relative flex cursor-pointer items-center justify-between border-b border-veryDarkGrayishBlue bg-veryLightGray px-5 py-4 dark:border-veryLightGrayishBlue dark:bg-veryDarkDesaturatedBlue">
          <div class="todo-content flex items-center">
            <input type="checkbox" class="mr-3 cursor-pointer" />
            <p class="text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">${todo.todo}</p>
          </div>

          <i class="fa-solid fa-ellipsis fa-lg cursor-pointer text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>

          <div class="editdel-container absolute right-0 top-8 hidden h-[80px] w-[100px] flex-col justify-center gap-[0.5rem] rounded-lg bg-veryLightGray px-2">
            <div class="edit-container flex cursor-pointer items-center justify-around">
              <i class="fa-solid fa-pen-to-square text-veryDarkGrayishBlue"></i>
              <p class="text-sm text-veryDarkGrayishBlue">Edit</p>
            </div>

            <div class="delete-container flex w-full cursor-pointer items-center justify-around border-t border-veryDarkGrayishBlue pt-2">
              <i class="fa-solid fa-trash text-veryDarkGrayishBlue"></i>
              <p class="text-sm text-veryDarkGrayishBlue">Delete</p>
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
      let storage = {
        id: ++this.#index,
        todo: this.todoInput.value.trim(),
        isActive: true,
        isCompleted: false,
      };

      this.#todoLists.push(storage);
      localStorage.setItem("Todos", JSON.stringify(this.#todoLists));

      console.log("todolist", this.#todoLists);
      this.todoInput.value = "";
      this._renderTodoItem();
    }

    // need to recheck this later.
    this.#todoLists.forEach((todo) => {
      // ? if true
      if (todo.isActive) {
        this.#active.push(todo);
      }
    });
    console.log("active", this.#active);
  }
}

const todo = new Todo();
