// eslint-disable-next-line import/no-cycle
import { getTask, updateLocalStorage } from './script.js';

const checking = (bool, id) => {
  const task = getTask(id);
  task.complete = bool;
  updateLocalStorage();
};

const checkbox = () => {
  document.querySelectorAll('.check').forEach((check) => {
    const h3 = check.nextElementSibling;
    const parent = check.parentElement.parentElement;
    const task = getTask(parent.id);

    if (task.complete) {
      h3.classList.add('select');
      check.checked = true;
    } else {
      h3.classList.remove('select');
      check.checked = false;
    }

    check.onchange = () => {
      if (check.checked === true) {
        h3.classList.add('select');
        checking(true, parent.id);
      } else {
        h3.classList.remove('select');
        checking(false, parent.id);
      }
    };
  });
};

// eslint-disable-next-line import/prefer-default-export
export default checkbox;