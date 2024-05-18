import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      }, delay);
    } else {
      setTimeout(() => {
        reject(`❌ Rejected promise in ${delay}ms`);
      }, delay);
    }
  });
  promise
    .then(value => {
      iziToast.show({
        message: value,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        color: 'red',
        position: 'topRight',
      });
    });
  form.reset();
}
