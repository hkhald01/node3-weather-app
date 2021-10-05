console.log('client side javascript file is loaded!');

<<<<<<< HEAD
//commented method
=======
>>>>>>> ea61021227d110fb372a2a61fe7c7e706e2be942
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//  response.json().then((data) => {
//   console.log(data);
//  });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
 event.preventDefault();
 messageOne.textContent = 'Loading ...';
 messageTwo.textContent = '';
 const location = search.value;
 const url = `/weather?address=${location}}`;
 fetch(url).then((response) => {
  response.json().then((data) => {
   if (data.error) {
    messageOne.textContent = data.error;
    return;
   }
   messageOne.textContent = data.location;
   messageTwo.textContent = data.forecast;
  });
 });
});
