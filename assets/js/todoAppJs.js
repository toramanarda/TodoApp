let todoForm = document.querySelector('.todoForm');
let todos = document.querySelector('.todos');
let clear = document.querySelector('.clear');
let todoCount = document.querySelector('.todoCount');
let modal = document.querySelector('#modal');

let todosList = [];
let todoCounter = 0;

if (localStorage.todosList) {
  todosList = JSON.parse(localStorage.todosList);
  todoCounter = todosList.length;
  todoCount.innerText = `${todoCounter}`;
  renderList();
}

function handleFormSubmit(e) {
  e.preventDefault();
  let formData = new FormData(todoForm);
  let formObj = Object.fromEntries(formData);
  todosList.push(formObj);
  todoForm.reset();
  todoCounter++;
  todoCount.innerText = `${todoCounter}`;
  renderList();
  save();
}

todoForm.addEventListener('submit', handleFormSubmit);

function renderList() {
  todos.innerHTML = '';
  for (let i = 0; i < todosList.length; i++) {
    let todo = todosList[i].todo;
    todos.innerHTML +=
      `<div class="todos-list">
          <ul><li><p>${todo} 
          <button class="edit" onclick="openEditDialog(${i})">🖋️</button>
           <button class="delete" onclick="deleteTodo(${i})">🚮</button>
           </ul></p></li>
       </div>`;
  }
}

function save() {
  localStorage.todosList = JSON.stringify(todosList);
}

function clearList() {
  if(!confirm('Tüm görevleri silmek üzeresin işleme devam etmek için tamama tıklayınız..')) {
    return;
  }

  localStorage.clear();
  todosList = [];
  todoCounter = 0;
  todoCount.innerText = `${todoCounter}`;
  renderList();
}

clear.addEventListener('click', clearList);

function openEditDialog(index) {
  modal.querySelector('.modelEdit').innerText = "Todo Düzenle";

  let todoInput = modal.querySelector('input[name="todos"]');
  todoInput.value = todosList[index].todo;

  modal.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    todosList[index].todo = todoInput.value;
    renderList();
    save();
    modal.close();
  });

  modal.showModal();
}

function deleteTodo(index) {
  if(!confirm('Seçilen görevi silmek istediğinden emin misin?')) {
    return;
  }
  todosList.splice(index, 1);
  todoCounter--;
  todoCount.innerText = `${todoCounter}`;
  renderList();
  save();
}
