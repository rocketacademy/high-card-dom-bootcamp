import { shuffleCards, makeDeck } from "./deck.js";

const deck = shuffleCards(makeDeck());

let player1Hand = []; // Array of card obj
let player2Hand = [];
const maxCards = 3;
let endGameState = false;
let playersTurn = 1; // Player 1 starts first

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const output = (message) => {
  const instructions = document.getElementById("instructions");
  instructions.innerTe = message;
};

const reset = () => {
  player1Hand = [];
  player2Hand = [];
  endGameState = true;
};

const calculateScoreDiff = (hand) => {
  // compare ranks
  const rankArr = [];
  for (let i = 0; i < hand.length; i++) {
    rankArr.push(hand[i]["rank"]);
  }
  console.log("rankArr : " + rankArr);
  return Math.max(...rankArr) - Math.min(...rankArr);
};

const determineWinner = () => {
  const p1Score = calculateScoreDiff(player1Hand);
  const p2Score = calculateScoreDiff(player2Hand);
  let message = `Player 1 has a difference of ${p1Score}, `;
  message += `Player 2 has a difference of ${p2Score}, `;

  // Determine and output winner
  if (p1Score > p2Score) {
    message += "player 1 wins!";
  } else if (p1Score < p2Score) {
    message += "player 2 wins!";
  } else {
    message += "tie!";
  }

  output(message);
  reset();
};

const player1Click = () => {
  if (playersTurn === 1) {
    const player1Container = document.getElementById("player-1-cards");
    const player2Container = document.getElementById("player-2-cards");

    // add card to player 1 hand
    const newCard = deck.pop();
    player1Hand.push(newCard);

    // Create card element and append to container
    const cardElement = createCard(newCard);
    player1Container.appendChild(cardElement);

    if (endGameState) {
      player1Container.innerHTML = "";
      player2Container.innerHTML = "";
      endGameState = false;
    }

    // Switch to player 2's turn
    playersTurn = 2;
    output("Its player 2 turn. Click to draw a card!");
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Container = document.getElementById("player-2-cards");
    // add card to player 2 hand
    const newCard = deck.pop();
    player2Hand.push(newCard);

    // Create card element and append to container
    const cardElement = createCard(newCard);
    player2Container.appendChild(cardElement);

    // Switch to player 1's turn
    playersTurn = 1;

    // check for endgame condition
    if (player1Hand.length === maxCards && player2Hand.length === maxCards) {
      determineWinner();
    } else {
      output("Its player 1 turn. Click to draw a card!");
    }
  }
};

const initGame = () => {
  // create big-container
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  document.body.appendChild(gameContainer);

  // create containers for players in big-container
  for (let i = 0; i < 2; i++) {
    let p = i + 1;
    const playerContainer = document.createElement("div");
    playerContainer.id = `player-${p}`;

    const cardContainer = document.createElement("div");
    cardContainer.id = `player-${p}-cards`;
    playerContainer.appendChild(cardContainer);

    // p separator - TODO: not sure if this is the best way
    const playerLabel = document.createElement("p");
    playerLabel.id = `player-${p}-separator`;
    playerContainer.appendChild(playerLabel);

    const playerButton = document.createElement("button");
    playerButton.id = `player-${p}-button`;
    playerButton.innerText = `Player ${p} Draw`;

    const listenerFn = i === 0 ? player1Click : player2Click;
    playerButton.addEventListener("click", listenerFn);
    playerContainer.appendChild(playerButton);

    gameContainer.appendChild(playerContainer);
  }

  // starting instructions - changes in instructions use output
  const instructions = document.createElement("p");
  instructions.id = "instructions";
  instructions.innerText = "Its player 1 turn. Click to draw a card!";
  gameContainer.appendChild(instructions);
};

initGame();
