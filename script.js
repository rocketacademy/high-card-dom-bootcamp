import { shuffleCards, makeDeck } from "./deck.js";

const deck = shuffleCards(makeDeck());

let player1Hand = []; // Array of card obj
let player2Hand = [];
const maxCards = 3;
let endGameState = false;
let playersTurn = 1; // Player 1 starts first

// createCards fn accepts an array of cards, from array draw cards dom and assigns to correct player doms
const createCards = (cardsArr, player) => {
  const cardContainer = document.getElementById(`player-${player}-cards`);
  const highLowContainer = document.getElementById(
    `player-${player}-high-low-cards`
  );
  const otherCardsContainer = document.getElementById(
    `player-${player}-other-cards`
  );

  const cardsArrCopy = [...cardsArr].sort((a, b) => a.rank - b.rank);

  cardsArrCopy.forEach((card, index) => {
    const suit = document.createElement("div");
    suit.classList.add("suit", card.colour);
    suit.innerText = card.suitSymbol;

    const name = document.createElement("div");
    name.classList.add("name", card.colour);
    name.innerText = card.displayName;

    const cardDom = document.createElement("div");
    cardDom.classList.add("card");

    cardDom.appendChild(name);
    cardDom.appendChild(suit);

    switch (true) {
      case cardsArrCopy.length == 1: // 1 card in hand
        otherCardsContainer.appendChild(cardDom);
      case cardsArrCopy.length == 2:
        highLowContainer.appendChild(cardDom);
        otherCardsContainer.innerHTML = "";
      case cardsArrCopy.length > 2:
        if (index === 0) {
          highLowContainer.innerHTML = "";
          highLowContainer.appendChild(cardDom); // append smallest card
        } else if (index === cardsArrCopy.length - 1) {
          highLowContainer.appendChild(cardDom); // append highest card
        } else {
          otherCardsContainer.appendChild(cardDom); // need to pop the others?
        }
      default:
        return `Card length is < 1`;
    }
  });
};

const output = (message) => {
  const instructions = document.getElementById("instructions");
  instructions.innerText = message;
};

const reset = () => {
  player1Hand = [];
  player2Hand = [];
  endGameState = true;
};

const clearDOM = () => {
  // clear playing area
  for (let i = 0; i < 2; i++) {
    const hl = document.getElementById(`player-${i + 1}-high-low-cards`);
    const other = document.getElementById(`player-${i + 1}-other-cards`);

    hl.innerHTML = "";
    other.innerHTML = "";
  }
  // display starting instructions
  document.getElementById("instructions").innerHTML = "";
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
  console.log("determineWinner");
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
    // add card to player 1 hand
    const newCard = deck.pop();
    player1Hand.push(newCard);

    // Create card element and append to container
    createCards(player1Hand, 1);

    // Switch to player 2's turn
    playersTurn = 2;
    output("Its player 2 turn. Click to draw a card!");
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    // add card to player 2 hand
    const newCard = deck.pop();
    player2Hand.push(newCard);

    // Create card element and append to container
    createCards(player2Hand, 2);
    // player2Container.appendChild(cardElement);

    // Switch to player 1's turn
    playersTurn = 1;

    // check for endgame condition
    console.log(player1Hand.length, player2Hand.length);
    if (player1Hand.length === maxCards && player2Hand.length === maxCards) {
      determineWinner();
      endGameState = false;
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

  const newGameButton = document.createElement("button");
  newGameButton.id = "new-game-button";
  newGameButton.innerText = "New Game";
  newGameButton.addEventListener("click", clearDOM);
  gameContainer.appendChild(newGameButton);

  // create containers for players in big-container
  for (let i = 0; i < 2; i++) {
    let p = i + 1;
    const playerContainer = document.createElement("div");
    playerContainer.id = `player-${p}`;

    const cardContainer = document.createElement("div");
    cardContainer.id = `player-${p}-cards`;
    playerContainer.appendChild(cardContainer);

    // nest divs for high-low cards and remaining cards
    const highLowContainer = document.createElement("div");
    highLowContainer.id = `player-${p}-high-low-cards`;
    cardContainer.appendChild(highLowContainer);

    const otherCardsContainer = document.createElement("div");
    otherCardsContainer.id = `player-${p}-other-cards`;
    cardContainer.appendChild(otherCardsContainer);

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
