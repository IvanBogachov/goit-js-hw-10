import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);


function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');
  
  makePromise(delay, state)
    .then((delay) => {
      iziToastAction(delay, state);
    })
    .catch((delay) => {
      iziToastAction(delay, state);
    });

  event.target.reset();
}

function makePromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    },delay);
  });
}

function iziToastAction(delay, state) {
  const message =
    state === 'fulfilled'
      ? `✅ Fulfilled promise in ${delay}ms`
      : `❌ Rejected promise in ${delay}ms`;
  const bgColor = state === 'fulfilled' ? '#59a10d' : '#ef4040';

  iziToast.show({
    icon: false,
    backgroundColor: `${bgColor}`,
    message: `${message}`,
    messageColor: 'white',
    messageSize: '16',
    position: 'topRight',
    close: false,
    displayMode: 1,
  });
}
