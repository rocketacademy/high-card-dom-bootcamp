const deck = shuffleCards(makeDeck());
let firstPlayerCardContainer;
let secondPlayerCardContainer;
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");
const player1CardRanks = [];
const player1CardObjects = [];
const player2CardRanks = [];
const player2Cards = [];
let player1MinMaxCards;
let player2MinMaxCards;
let numberOfCardsDrawn = [0, 0];
let numberOfCardsAllowed;

/////////////////////////////////////
// more comfortable - card display //
/////////////////////////////////////

const player1Click = () => {
  // Create card element from card metadata
  setTimeout(() => {
    if (numberOfCardsDrawn[0] !== numberOfCardsAllowed) {
      // Create card element from card metadata
      const card = deck.pop();
      const cardElement = createCard(card);
      player1CardRanks.push(card.rank);
      // Empty cardContainer in case this is not the 1st round of gameplay
      // Append the card element to the card container
      firstPlayerCardContainer.appendChild(cardElement);
      numberOfCardsDrawn[0]++;
      checkBothPlayersCards();
    } 
  }, 1000);
};

const player2Click = () => {
  // Create card element from card metadata
  setTimeout(() => {
    if (numberOfCardsDrawn[1] !== numberOfCardsAllowed) {
      // Create card element from card metadata
      const card = deck.pop();
      const cardElement = createCard(card);
      player2CardRanks.push(card.rank);
      // Empty cardContainer in case this is not the 1st round of gameplay
      // Append the card element to the card container
      secondPlayerCardContainer.appendChild(cardElement);
      numberOfCardsDrawn[1]++;
      checkBothPlayersCards();
    }
  }, 1000);
};

const checkBothPlayersCards = () => {
  if (numberOfCardsDrawn[0] == numberOfCardsAllowed && numberOfCardsDrawn[1] == numberOfCardsAllowed) {
    calculateWinner();
  }
};

const calculateWinner = () => {
  // fill game info div with starting instructions
  const player1Difference =
    Math.max(...player1CardRanks) - Math.min(...player1CardRanks);
  const player2Difference =
    Math.max(...player2CardRanks) - Math.min(...player2CardRanks);

  if (player1Difference > player2Difference) {
    gameInfo.innerText = "Player 1 is the winner!";
  } else if (player1Difference < player2Difference) {
    gameInfo.innerText = "Player 2 is the winner!";
  } else if (player1Difference == player2Difference) {
    gameInfo.innerText = "Tie between players!";
  }

  gameInfo.innerText += ` | Player 1 Difference: ${player1Difference} | Player 2 Difference: ${player2Difference}`;

  document.body.appendChild(gameInfo);
};

const initGame = () => {
  let numberOfCardsInput = document.createElement("input");
  numberOfCardsInput.id = "numberOfCards";
  numberOfCardsInput.type = "number";
  numberOfCardsInput.min = 1;
  numberOfCardsInput.placeholder = "Enter number of rounds";
  document.body.appendChild(numberOfCardsInput);

  let submitButton = document.createElement("button");
  submitButton.id = "submitButton";
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", () => {
    numberOfCardsAllowed = parseInt(
      document.getElementById("numberOfCards").value
    );
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("numberOfCards").style.display = "none";
  });
  document.body.appendChild(submitButton);

  firstPlayerCardContainer = document.createElement("div");
  firstPlayerCardContainer.classList.add("first-player-card-container");
  document.body.appendChild(firstPlayerCardContainer);

  secondPlayerCardContainer = document.createElement("div");
  secondPlayerCardContainer.classList.add("second-player-card-container");
  document.body.appendChild(secondPlayerCardContainer);

  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);
};

/////////////////////////////////////
// more comfortable - card display //
/////////////////////////////////////

// const player1Click = () => {
//   // Create card element from card metadata
//   const card = deck.pop();
//   const cardElement = createCard(card);
//   player1CardRanks.push(card.rank);
//   player1CardObjects.push(card);
//   player1MinMaxCards = checkMinMaxCards(player1CardRanks);

//   firstPlayerCardContainer.innerHTML = "";

//   if (player1CardObjects.length == 1) {
//     firstPlayerCardContainer.appendChild(cardElement);
//   } else {
//     firstPlayerCardContainer.appendChild(
//       createCard(player1CardObjects[player1MinMaxCards[0]])
//     );
//     firstPlayerCardContainer.appendChild(
//       createCard(player1CardObjects[player1MinMaxCards[1]])
//     );
//   }
// };

// const player2Click = () => {
//   // Create card element from card metadata
//   const card = deck.pop();
//   const cardElement = createCard(card);
//   player2CardRanks.push(card.rank);
//   player2Cards.push(card);
//   player2MinMaxCards = checkMinMaxCards(player2CardRanks);

//   secondPlayerCardContainer.innerHTML = "";

//   if (player2Cards.length == 1) {
//     secondPlayerCardContainer.appendChild(cardElement);
//   } else {
//     secondPlayerCardContainer.appendChild(
//       createCard(player2Cards[player2MinMaxCards[0]])
//     );
//     secondPlayerCardContainer.appendChild(
//       createCard(player2Cards[player2MinMaxCards[1]])
//     );
//   }
// };

// const checkMinMaxCards = (playerCards) => {
//   const minMaxCards = [];

//   minMaxCards.push(playerCards.indexOf(Math.min(...playerCards)));
//   minMaxCards.push(playerCards.indexOf(Math.max(...playerCards)));

//   return minMaxCards;
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

/////////////////
// comfortable //
/////////////////

// const player1Click = () => {
//   // Create card element from card metadata
//   const card = deck.pop();
//   const cardElement = createCard(card);
//   player1CardRanks.push(card.rank);
//   // Empty cardContainer in case this is not the 1st round of gameplay
//   // Append the card element to the card container
//   firstPlayerCardContainer.appendChild(cardElement);
//   calculateWinner();
// };

// const player2Click = () => {
//   // Create card element from card metadata
//   const card = deck.pop();
//   const cardElement = createCard(card);
//   player2CardRanks.push(card.rank);
//   // Append card element to card container
//   secondPlayerCardContainer.appendChild(cardElement);
//   calculateWinner();
// };

// const calculateWinner = () => {
//   // fill game info div with starting instructions
//   const player1Difference =
//     Math.max(...player1CardRanks) - Math.min(...player1CardRanks);
//   const player2Difference =
//     Math.max(...player2CardRanks) - Math.min(...player2CardRanks);

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
