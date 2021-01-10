const themeToggle = document.getElementById("theme-toggle");
const theme = document.querySelector("#theme-link");
const inputField = document.getElementById("input-field");
const todoContainer = document.getElementById("todo-container");
const itemsLeftContainer = document.getElementById("items-left-container");
const todosLeft = document.getElementById("todos-left");
const clearAllCompletedTodos = document.getElementById("clear-completed-todos");
const todoStatusContainer = document.getElementById("todo-status-container");
const showAllTodos = document.getElementById("show-all-todos");
const showActiveTodos = document.getElementById("show-active-todos");
const showCompletedTodos = document.getElementById("show-completed-todos");

countTodosLeft();
showAllTodos.classList.add("clicked");


function createTodoItem(input) {
  
  let todo = document.createElement("div");
  todo.className = "todo active";

  
  todo.innerHTML = `
          <div class="checkbox">
            <i class="fas fa-check checkmark"></i>
          </div>
          <p class="todo-name">${input}</p>
          <i class="fal fa-times btn-delete-todo"></i>`;

  
  todoContainer.appendChild(todo);


  todoContainer.insertBefore(todo, itemsLeftContainer);

  if (showCompletedTodos.classList.contains("clicked")) {
    showCompletedTodoItems();
  }

 
  inputField.value = "";

  countTodosLeft();
}


function countTodosLeft() {
  let itemsLeft = [...document.querySelectorAll(".active")].length;

  if (!itemsLeft) {
    todosLeft.innerText = "0 items left";
  } else if (itemsLeft === 1) {
    todosLeft.innerText = `1 item left`;
  } else {
    todosLeft.innerText = `${itemsLeft} items left`;
  }
}


function deleteTodoItem(element) {
  element.remove();
}


function clearCompletedTodos() {
  let completedTodos = [...document.querySelectorAll(".completed")];

  completedTodos.forEach((completedTodo) => completedTodo.remove());
}


function showActiveTodoItems() {
 
  showAllTodoItems();

 
  [...document.querySelectorAll(".completed")].forEach(
    (todoItem) => (todoItem.style.display = "none")
  );
}


function showCompletedTodoItems() {
 
  showAllTodoItems();

 
  [...document.querySelectorAll(".active")].forEach(
    (todoItem) => (todoItem.style.display = "none")
  );
}


function showAllTodoItems() {
  [...document.querySelectorAll(".todo")].forEach(
    (todoItem) => (todoItem.style.display = "flex")
  );
}

inputField.addEventListener("keyup", (e) => {
  if (e.code === "Enter" || e.keyCode === 13 && inputField.value.length > 0) {
    createTodoItem(inputField.value);
  }
});

todoContainer.addEventListener("click", (e) => {
  let targetEl = e.target;

  if (targetEl.tagName === "DIV" || targetEl.tagName === "I") {
    if (targetEl.tagName === "DIV" && targetEl.classList.contains("checkbox")) {
      switch (true) {
        case !targetEl.classList.contains("checked"):
          
          targetEl.classList.add("checked");

          
          targetEl.parentElement.classList.remove("active");
          targetEl.parentElement.classList.add("completed");

          
          if (showActiveTodos.classList.contains("clicked")) {
            showActiveTodoItems();
          }

        
          countTodosLeft();
          break;
        default:
          
          targetEl.classList.remove("checked");

          
          targetEl.parentElement.classList.add("active");
          targetEl.parentElement.classList.remove("completed");

         
          if (showCompletedTodos.classList.contains("clicked")) {
            showCompletedTodoItems();
          }

          
          countTodosLeft();
      }
    }

    if (
      targetEl.tagName === "I" &&
      targetEl.classList.contains("btn-delete-todo")
    ) {
      deleteTodoItem(targetEl.parentElement);
    }
  }
});

clearAllCompletedTodos.addEventListener("click", clearCompletedTodos);


todoStatusContainer.addEventListener("click", (e) => {
  let targetEl = e.target;
  let controls = [...document.getElementById("todo-status-container").children];

  if (targetEl.tagName === "P") {
    
    controls.forEach((control) => control.classList.remove("clicked"));
  
    targetEl.classList.add("clicked");

    
    if (targetEl === showActiveTodos) {
      showActiveTodoItems();
    }

   
    if (targetEl === showCompletedTodos) {
      showCompletedTodoItems();
    }

    
    if (targetEl === showAllTodos) {
      showAllTodoItems();
    }
  }
});
