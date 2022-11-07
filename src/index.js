/* eslint-disable import/extensions */
import './style.css';
import {
  render, add, checkLocalStorage, tasks, ChangeEdit, removeDom, clearAll,
} from './script.js';
import drag from './drag.js';
import checkbox from './complete.js';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

document.getElementById('addForm').onsubmit = (e) => {
  e.preventDefault();
  const { value } = e.target.task;
  add({
    id: Date.now().toString(),
    description: value,
    complete: false,
    index: tasks.length,
  });
  e.target.task.value = '';
};

const refresh = () => {
  document.querySelector('.rotate').onclick = () => {
    document.querySelectorAll('.list').forEach((item) => {
      const edit = item.lastElementChild.firstElementChild;
      const del = item.lastElementChild.lastElementChild;
      const form = item.lastElementChild.previousElementSibling.lastElementChild;
      const h3 = item.lastElementChild.previousElementSibling.firstElementChild.nextElementSibling;
      if (!form.classList.contains('trash')) {
        form.classList.add('trash');
        h3.classList.remove('trash');
      }
      edit.classList.remove('trash');
      del.classList.add('trash');
      item.style.background = 'white';
    });
  };
};

document.addEventListener('DOMContentLoaded', () => {
  checkLocalStorage();
  tasks.sort((a, b) => a.index - b.index)
    .map((item) => render(item));
  ChangeEdit();
  removeDom();
  checkbox();
  clearAll();
  refresh();
  drag();
});
