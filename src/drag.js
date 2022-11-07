// eslint-disable-next-line import/no-cycle
import { getTask, updateLocalStorage } from './script.js';

let startindex;
let lastindex;

const dragstart = (e) => {
  startindex = +e.target.getAttribute('data-index');
};

const swapitems = (from, to) => {
  const itemOne = document.querySelector(`.li${from}`).querySelector('.list');
  const itemTwo = document.querySelector(`.li${to}`).querySelector('.list');
  itemOne.setAttribute('data-index', to);
  itemTwo.setAttribute('data-index', from);

  const taskOne = getTask(itemOne.id);
  const taskTwo = getTask(itemTwo.id);

  if (taskOne.index !== taskTwo.index) {
    const temp = taskOne.index;
    taskOne.index = taskTwo.index;
    taskTwo.index = temp;
    updateLocalStorage();
  }

  document.querySelector(`.li${from}`).appendChild(itemTwo);
  document.querySelector(`.li${to}`).appendChild(itemOne);
};

const dragdrop = (e) => {
  e.preventDefault();
  if (e.target.tagName.toLowerCase() === 'h3') {
    lastindex = +e.target.parentElement.parentElement.getAttribute('data-index');
  } else {
    lastindex = +e.target.getAttribute('data-index');
  }
  swapitems(startindex, lastindex);
};

const dragover = (e) => {
  e.preventDefault();
};

export default () => {
  const listItem = document.querySelectorAll('.list');
  const drapLists = document.querySelectorAll('li');

  listItem.forEach((item) => {
    item.addEventListener('dragstart', dragstart);
  });

  drapLists.forEach((list) => {
    list.addEventListener('drop', dragdrop);
    list.addEventListener('dragover', dragover);
  });
};
