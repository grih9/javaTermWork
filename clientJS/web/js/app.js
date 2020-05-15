function addTodoItem(event) {
    event.preventDefault(); // останавливаем запрос
    
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input')
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

todoForm.addEventListener('submit', addTodoItem);

