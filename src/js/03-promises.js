import { Notify } from 'notiflix';

function createPromise(position, delay) {
  const promis = new Promise((resolt, reject) => { 
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    // Fulfill
    resolt({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
  }
  }, delay);
});
return promis;
}
const formElement = document.querySelector('.form');
formElement.addEventListener('submit', onSubmite);
function onSubmite(event) {
  event.preventDefault();
    let delay = Number(event.currentTarget.delay.value);
    const amount = Number(event.currentTarget.amount.value);
    const step = Number(event.currentTarget.step.value);
    for (let i = 1; i <= amount; i+= 1) {
      createPromise(i, delay).then(onSucces).catch(onError);
      delay += step;
}   
}
function onSucces ({ position, delay }) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }

function onError ({ position, delay }) {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
