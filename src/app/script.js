import sunIcon from '../images/icon-sun.svg';
import moonIcon from '../images/icon-moon.svg';

class Todo {
  // representing the All array in this case.
  #todoLists = JSON.parse(localStorage.getItem('Todos')) || [];
  // unique id for each rendered todo
  #index = parseInt(localStorage.getItem('TodosIndex')) || 0;
  #currentState;
  constructor() {
    this.form = document.querySelector('form');
    this.todoInput = document.querySelector('.todoInput');
    this.todoContainer = document.querySelector('.todo--section');
    this.allBtn = document.querySelector('.all');
    this.activeBtn = document.querySelector('.active');
    this.completedBtn = document.querySelector('.completed');
    this.navBtns = document.querySelectorAll('.nav');
    this.bgToggle = document.querySelector('.bgToggle');
    this.itemsCounter = document.querySelector('.itemsCounter');
    this.clearCompleted = document.querySelector('.clearCompleted');

    this.form.addEventListener('submit', this._addTodoItem.bind(this));
    this.todoContainer.addEventListener('click', this._toggleMenuBtns.bind(this));
    this.todoContainer.addEventListener('click', this._markCompleted.bind(this));
    this.todoContainer.addEventListener('click', this._markCompletedCheck.bind(this));
    this.todoContainer.addEventListener('click', this._deleteTodo.bind(this));
    this.todoContainer.addEventListener('dragstart', this._dragndrop.bind(this));
    this.todoContainer.addEventListener('dragend', this._dragndrop2.bind(this));
    this.todoContainer.addEventListener('dragover', this._dragndrop3.bind(this));
    this.allBtn.addEventListener('click', this._showAllTodoItems.bind(this));
    this.activeBtn.addEventListener('click', this._showActiveTodoItems.bind(this));
    this.completedBtn.addEventListener('click', this._showCompletedTodoItems.bind(this));
    this.navBtns.forEach((nav) => nav.addEventListener('click', this._toggleActiveNav.bind(this)));
    this.bgToggle.addEventListener('click', this._toggleBackgroundColor.bind(this));
    this.clearCompleted.addEventListener('click', this._clearCompletedTodo.bind(this));

    this._renderTodoItem('all');
    this._countTodo();
  }

  _clearCompletedTodo() {
    this.#todoLists = this.#todoLists.filter((allTodo) => !allTodo.isCompleted);
    localStorage.setItem('Todos', JSON.stringify(this.#todoLists));
    this._renderTodoItem('all');
    this._countTodo();
  }

  _countTodo() {
    this.itemsCounter.textContent = this.#todoLists.length ? `${this.#todoLists.length} items remaining` : "You haven't added any todo";
  }

  _dragndrop3(e) {
    e.preventDefault();
    const draggingItem = this.todoContainer.querySelector('.dragging');
    const siblings = [...this.todoContainer.querySelectorAll('.todo--container:not(.dragging)')];
    let nextSibling = siblings.find((sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2);

    this.todoContainer.insertBefore(draggingItem, nextSibling);
  }

  _dragndrop2(e) {
    let container = e.target.closest('.todo--container');
    if (!container) return;

    container.classList.remove('dragging');
  }

  _dragndrop(e) {
    let container = e.target.closest('.todo--container');
    if (!container) return;

    setTimeout(() => container.classList.add('dragging'), 0);
  }

  _toggleBackgroundColor() {
    // accessing the root element of the document
    document.documentElement.classList.toggle('dark');

    if (this.document.documentElement.classList.contains('dark')) {
      this.bgToggle.src = sunIcon;
      this.bgToggle.alt = 'icon sun';
    } else {
      this.bgToggle.src = moonIcon;
      this.bgToggle.alt = 'icon moon';
    }
  }

  _removePreviousActiveNav() {
    document.querySelectorAll('.nav').forEach((navBtn) => {
      if (navBtn.classList.contains('nav-active')) {
        navBtn.classList.remove('nav-active');
      }
    });
  }

  _toggleActiveNav(e) {
    this._removePreviousActiveNav();
    e.target.classList.add('nav-active');
  }

  _showAllTodoItems() {
    this._renderTodoItem('all');
  }

  _showActiveTodoItems() {
    this._renderTodoItem('active');
  }

  _showCompletedTodoItems() {
    this._renderTodoItem('completed');
  }

  _deleteTodo(e) {
    let delBtn = e.target.closest('.delete-container');
    if (!delBtn) return;

    let todoIndex = this.#todoLists.findIndex((todo) => todo.id === parseInt(delBtn.id));

    this.#todoLists.splice(todoIndex, 1);
    localStorage.setItem('Todos', JSON.stringify(this.#todoLists));
    this._renderTodoItem('all');
    this._countTodo();
  }

  _markCompletedCheck(e) {
    let input = e.target.closest('input[type="checkbox"]');
    if (!input) return;

    input.nextElementSibling.classList.toggle('checked');
    let todoIndex = this.#todoLists.findIndex((todo) => todo.id === parseInt(input.id));
    if (input.checked) {
      this.#todoLists[todoIndex].isCompleted = true;
      this.#todoLists[todoIndex].isActive = false;
    } else {
      this.#todoLists[todoIndex].isCompleted = false;
      this.#todoLists[todoIndex].isActive = true;
    }
    localStorage.setItem('Todos', JSON.stringify(this.#todoLists));
  }

  _markCompleted(e) {
    let container = e.target.closest('.todo--container');
    if (!container) return;

    let input = container.querySelector('input[type="checkbox"]');

    if (e.target.closest('.exclude-me') || e.target.closest('.editdel-container')) return;

    input.checked ? (input.checked = false) : (input.checked = true);

    container.firstElementChild.lastElementChild.classList.toggle('checked');
    let todoIndex = this.#todoLists.findIndex((todo) => todo.id === parseInt(input.id));
    if (input.checked) {
      this.#todoLists[todoIndex].isCompleted = true;
      this.#todoLists[todoIndex].isActive = false;
    } else {
      this.#todoLists[todoIndex].isCompleted = false;
      this.#todoLists[todoIndex].isActive = true;
    }
    localStorage.setItem('Todos', JSON.stringify(this.#todoLists));
  }

  _toggleMenuBtns(e) {
    let elipsis = e.target.closest('.fa-ellipsis');
    if (!elipsis) return;

    // toggle the edit and delete button container
    elipsis.nextElementSibling.classList.toggle('hidden');
    elipsis.nextElementSibling.classList.toggle('flex');

    setTimeout(() => {
      elipsis.nextElementSibling.style.opacity = elipsis.nextElementSibling.classList.contains('hidden') ? 0 : 1;
    }, 10);

    // accessing the edit container element
    let editContainer = elipsis.nextElementSibling.firstElementChild;
    // accessing the todo paragraph element
    let element = editContainer.parentElement.parentElement.firstElementChild.lastElementChild;

    editContainer.addEventListener('click', () => {
      this.todoInput.value = element.textContent.trim();
      this.todoInput.focus();

      elipsis.nextElementSibling.classList.add('hidden');
      elipsis.nextElementSibling.classList.remove('flex');

      this.#todoLists.forEach((todo) => {
        if (todo.isEditing) todo.isEditing = false;
      });

      let todoIndex = this.#todoLists.findIndex((todo) => todo.id === parseInt(editContainer.id));
      this.#todoLists[todoIndex].isEditing = true;
      localStorage.setItem('Todos', JSON.stringify(this.#todoLists));
    });
  }

  _renderTodoItem(filter) {
    let filteredTodos = [];
    let html = '';

    if (this.#todoLists) {
      switch (filter) {
        case 'all':
          filteredTodos = this.#todoLists;
          break;
        case 'active':
          filteredTodos = this.#todoLists.filter((todo) => todo.isActive);
          break;
        case 'completed':
          filteredTodos = this.#todoLists.filter((todo) => todo.isCompleted);
          break;
        default:
          filteredTodos = this.#todoLists;
      }
    }

    filteredTodos.forEach((todo) => {
      html += `
        <div class="todo--container relative flex cursor-pointer items-center justify-between border-b border-veryDarkGrayishBlue bg-veryLightGray px-5 py-4 dark:border-veryLightGrayishBlue dark:bg-veryDarkDesaturatedBlue" draggable="true">
          <div class="todo-content flex items-center">
            <input type="checkbox" class="mr-3 exclude-me cursor-pointer" id="${todo.id}"/>
            <p class="text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">${todo.todo}</p>
          </div>

          <i class="fa-solid exclude-me fa-ellipsis fa-lg cursor-pointer text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>

            <div class="editdel-container absolute right-0 top-8 hidden h-[80px] w-[100px] flex-col justify-center gap-[0.5rem] rounded-lg bg-veryLightGray px-2 z-10 dark:bg-veryDarkGrayishBlue opacity-0">
                <div class="exclude-me edit-container flex cursor-pointer items-center justify-around" id="${todo.id}">
                  <i class="exclude-me fa-solid fa-pen-to-square text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>
                  <p class="exclude-me text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">Edit</p>
                </div>

                <div class="exclude-me delete-container flex w-full cursor-pointer items-center justify-around border-t border-veryDarkGrayishBlue pt-2" id="${todo.id}">
                  <i class="exclude-me fa-solid fa-trash text-veryDarkGrayishBlue dark:text-lightGrayishBlue"></i>
                  <p class="exclude-me text-sm text-veryDarkGrayishBlue dark:text-lightGrayishBlue">Delete</p>
                </div>
              </div>
        </div>`;
    });
    this.todoContainer.innerHTML =
      html || `<div class="relative flex cursor-pointer items-center justify-between bg-veryLightGray px-5 py-4 dark:bg-veryDarkDesaturatedBlue text-veryDarkGrayishBlue dark:text-lightGrayishBlue text-sm">There are no todos at this time!</div>`;

    // loop through todos and add "checked" class if isCompleted is true
    this.#todoLists.forEach((todo) => {
      if (todo.isCompleted) {
        const todoItem = document.getElementById(todo.id);
        if (todoItem) {
          todoItem.nextElementSibling.classList.add('checked');
          todoItem.checked = true;
        }
      }
    });
  }

  _addTodoItem(e) {
    e.preventDefault();

    // checks if all the isEditing property is false (returns true and false otherwise)
    this.#currentState = this.#todoLists.every((todoItem) => !todoItem.isEditing);

    if (this.todoInput.value) {
      if (this.#currentState) {
        ++this.#index;
        localStorage.setItem('TodosIndex', this.#index);

        let storage = {
          id: this.#index,
          todo: this.todoInput.value.trim(),
          isActive: true,
          isCompleted: false,
          isEditing: false,
        };

        this.#todoLists.push(storage);
      } else {
        let editedIndex = this.#todoLists.findIndex((todoItem) => todoItem.isEditing);
        this.#todoLists[editedIndex].todo = this.todoInput.value;
        this.#todoLists[editedIndex].isEditing = false;
      }
    }

    localStorage.setItem('Todos', JSON.stringify(this.#todoLists));
    this.todoInput.value = '';
    this._renderTodoItem('all');
    this._countTodo();
  }
}

const todo = new Todo();
