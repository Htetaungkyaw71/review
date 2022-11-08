/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import checkbox from './complete.js';
import drag from './drag.js';

const list = document.querySelector('.list-item');

// eslint-disable-next-line import/no-mutable-exports
let tasks = [];

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTask = (id) => {
  const editTask = tasks.filter((task) => task.id === id)[0];
  return editTask;
};

const remove = (id) => {
  const newtasks = [];
  tasks = tasks.filter((task) => task.id !== id);
  tasks.forEach((task, index) => {
    newtasks.push({ ...task, index });
  });
  tasks = newtasks;
  updateLocalStorage();
};

const checkLocalStorage = () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } else {
    localStorage.setItem('tasks', JSON.stringify([]));
  }
};

const removeDom = () => {
  document.querySelectorAll('#delete').forEach((btn) => {
    btn.onclick = () => {
      const parentDiv = btn.parentElement.parentElement;
      remove(parentDiv.id);
      parentDiv.remove();
    };
  });
};

const render = (task) => {
  const div = document.createElement('div');
  const li = document.createElement('li');
  div.innerHTML = `
      <div class="item">
      <input type="checkbox" class="check">
      <h3>        
        ${task.description}
      </h3>  
      <form action="" id="editForm" class="trash">         
          <input type="text" value="${task.description}" name="task" required>
      </form>
      </div>   
          <div>
              <button id="edit">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <button id="delete" class="trash">
                  <i class="fa-solid fa-trash-can"></i>
              </button>     
          </div>
        `;
  div.classList.add('list');
  div.setAttribute('draggable', true);
  div.setAttribute('data-index', task.index);
  div.id = task.id;
  li.appendChild(div);
  li.className = `li${task.index}`;
  list.appendChild(li);
};

const edit = (id, item) => {
  const editTask = getTask(id);
  tasks.splice(editTask.index, 1, item);
  updateLocalStorage();
  removeDom();
  checkbox();
};

const ChangeEdit = () => {
  document.querySelectorAll('#edit').forEach((btn) => {
    btn.onclick = () => {
      // button
      const trash = btn.nextElementSibling;
      const parentDiv = btn.parentElement.parentElement;
      const form = btn.parentElement.previousElementSibling.lastElementChild;
      const text = btn.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
      form.classList.remove('trash');
      text.classList.add('trash');
      parentDiv.style.background = '#DCDBA9';
      trash.classList.remove('trash');
      btn.classList.add('trash');
      // button

      form.onsubmit = (e) => {
        e.preventDefault();
        const { value } = e.target.task;
        const { id } = e.target.parentElement.parentElement;
        const item = getTask(id);
        edit(id, { ...item, description: value });
        form.classList.add('trash');
        text.classList.remove('trash');
        text.innerHTML = value;
        parentDiv.style.background = 'white';
        trash.classList.add('trash');
        btn.classList.remove('trash');
      };
    };
  });
};

const clearAll = () => {
  document.querySelector('.complete').onclick = () => {
    const cleartasks = [];
    tasks.filter((task) => task.complete === false).forEach((task, index) => {
      cleartasks.push({ ...task, index });
    });
    tasks = cleartasks;
    updateLocalStorage();
    document.querySelectorAll('.check').forEach((check) => {
      const parent = check.parentElement.parentElement;
      if (check.checked) {
        parent.remove();
      }
    });
  };
};

const add = (task) => {
  tasks.push(task);
  updateLocalStorage();
  render(task);
  ChangeEdit();
  removeDom();
  checkbox();
  drag();
};

export {
  add, render,
  updateLocalStorage,
  checkLocalStorage,
  tasks,
  clearAll,
  ChangeEdit,
  removeDom,
  getTask,
};