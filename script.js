const deck = shuffleCards(makeDeck());
let firstPlayerCardContainer;
let secondPlayerCardContainer;
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");
const player1Cards = [];
const player2Cards = [];

/////////////////
// comfortable //
/////////////////

// const player1Click = () => {
//   // Create card element from card metadata
//   const card = deck.pop();
//   const cardElement = createCard(card);
//   player1Cards.push(card.rank);
//   // Empty cardContainer in case this is not the 1st round of gameplay
//   // Append the card element to the card container
//   firstPlayerCardContainer.appendChild(cardElement);
//   calculateWinner();
// };

// const player2Click = () => {
//   // Create card element from card metadata
//   const card = deck.pop();
//   const cardElement = createCard(card);
//   player2Cards.push(card.rank);
//   // Append card element to card container
//   secondPlayerCardContainer.appendChild(cardElement);
//   calculateWinner();
// };

// const calculateWinner = () => {
//   // fill game info div with starting instructions
//   const player1Difference =
//     Math.max(...player1Cards) - Math.min(...player1Cards);
//   const player2Difference =
//     Math.max(...player2Cards) - Math.min(...player2Cards);

//   if (player1Difference > player2Difference) {
//     gameInfo.innerText = "Player 1 is the winner!";
//   } else if (player1Difference < player2Difference) {
//     gameInfo.innerText = "Player 2 is the winner!";
//   } else if (player1Difference == player2Difference) {
//     gameInfo.innerText = "Tie between players!";
//   }

//   gameInfo.innerText += ` | Player 1 Difference: ${player1Difference} | Player 2 Difference: ${player2Difference}`;

//   document.body.appendChild(gameInfo);
// };

// const initGame = () => {
//   firstPlayerCardContainer = document.createElement("div");
//   firstPlayerCardContainer.classList.add("first-player-card-container");
//   document.body.appendChild(firstPlayerCardContainer);

//   secondPlayerCardContainer = document.createElement("div");
//   secondPlayerCardContainer.classList.add("second-player-card-container");
//   document.body.appendChild(secondPlayerCardContainer);

//   // initialize button functionality
//   player1Button.innerText = "Player 1 Draw";
//   document.body.appendChild(player1Button);

//   player2Button.innerText = "Player 2 Draw";
//   document.body.appendChild(player2Button);

//   player1Button.addEventListener("click", player1Click);
//   player2Button.addEventListener("click", player2Click);
// };

initGame();
