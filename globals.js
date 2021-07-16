// create card container
let cardContainer1;
cardContainer1 = document.createElement('div');
cardContainer1.classList.add('card-container1');
document.body.appendChild(cardContainer1);

let cardContainer2;
cardContainer2 = document.createElement('div');
cardContainer2.classList.add('card-container2');
document.body.appendChild(cardContainer2);

const gameInfo = document.createElement('div');
const output = (message) => {
  gameInfo.innerText = message;
};
