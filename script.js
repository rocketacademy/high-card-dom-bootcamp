// Please implement exercise logic here
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

const makeDeck = () => {
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;
      let cardSuit = "❤";
      let cardColor = "red";
      let cardValue = `${rankCounter}`;

      if (cardName === "1") {
        cardName = "ace";
        cardDisplay = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        cardDisplay = "J";
        cardValue = "10";
      } else if (cardName === "12") {
        cardName = "queen";
        cardDisplay = "Q";
        cardValue = "10";
      } else if (cardName === "13") {
        cardName = "king";
        cardDisplay = "K";
        cardValue = "10";
      }

      if (currentSuit === "clubs") {
        cardSuit = "♠";
      } else if (currentSuit === "spades") {
        cardSuit = "♣";
      } else if (currentSuit === "diamonds") {
        cardSuit = "♦";
      }

      if (currentSuit === "clubs" || currentSuit === "spades") {
        cardColor = "black";
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        shape: cardSuit,
        colour: cardColor,
        displayName: cardDisplay,
        value: cardValue,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.colour);
  suit.innerText = cardInfo.shape;

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
  gameInfo.innerText = message;
};

const resetGame = () => {
  player1Cards = [];
  player2Cards = [];
  player = 1;
  deck = shuffleCards(makeDeck());
};

const player1Click = () => {
  if (player1Draws === 0) {
    chosenTimes.innerText =
      "Please key in the number of times you want to draw";
  }

  if (player2Draws === 0) {
    chosenTimes2.innerText =
      "Please key in the number of times you want to draw";
  }

  if (player1Draws != 0 && player2Draws != 0) {
    if (player2Cards.length === 0) {
      cardRow2.innerHTML = "";
      player2Button.disabled = false;
    }

    if (player1Cards.length < player1Draws) {
      cardRow1.innerHTML = "";
      const player1Card = deck.pop();
      player1Cards.push(player1Card);
      // Arrange the cards so that the highest and lowest cards in the hand are displayed next to each other in the row.
      player1Cards.sort((a, b) => a.rank - b.rank);
      for (let i = 0; i < player1Cards.length; i += 1) {
        const cardElement = createCard(player1Cards[i]);
        cardRow1.appendChild(cardElement);
      }
      output(
        `Player 1 drew ${player1Cards.length} cards. You have to draw ${player1Draws} times `
      );
    }

    if (
      player1Cards.length === player1Draws &&
      player2Cards.length != player2Draws
    ) {
      output(
        "Player 1 you have drawn the maximum number of times, Player 2 please draw"
      );
    }

    if (
      player2Cards.length === player2Draws &&
      player1Cards.length === player1Draws
    ) {
      resultsGenerated();
      player2Button.disabled = true;
    }
  }
};

const player2Click = () => {
  if (player2Draws === 0) {
    chosenTimes.innerText =
      "Please key in the number of times you want to draw";
  }

  if (player1Draws != 0) {
    if (player2Cards.length < player2Draws) {
      cardRow2.innerHTML = "";
      const player2Card = deck.pop();
      player2Cards.push(player2Card);
      // Arrange the cards so that the highest and lowest cards in the hand are displayed next to each other in the row.
      player2Cards.sort((a, b) => a.rank - b.rank);
      for (let i = 0; i < player2Cards.length; i += 1) {
        const cardElement = createCard(player2Cards[i]);
        cardRow2.appendChild(cardElement);
      }
      output(
        `Player 2 drew ${player2Cards.length} cards. You have to draw ${player2Draws} times `
      );
    }

    if (
      player2Cards.length === player2Draws &&
      player1Cards.length != player1Draws
    ) {
      output(
        "Player 2 you have drawn the maximum number of times, Player 1 please draw"
      );
    }

    if (
      player2Cards.length === player2Draws &&
      player1Cards.length === player1Draws
    ) {
      resultsGenerated();
      player2Button.disabled = true;
    }
  }
};

const resultsGenerated = () => {
  let cardPosition = player1Cards.length - 1;
  let player1Difference = player1Cards[0].value;
  let player2Difference = player2Cards[0].value;

  if (player1Cards.length > 1) {
    player1Difference =
      player1Cards[cardPosition].value - player1Cards[0].value;
  }

  if (player2Cards.length > 1) {
    cardPosition = player2Cards.length - 1;
    player2Difference =
      player2Cards[cardPosition].value - player2Cards[0].value;
  }

  console.log("player 1 difference", player1Difference);
  const player1Score = document.createElement("div");
  player1Score.innerText = `Player 1 score is: ${player1Difference}`;
  cardRow1.appendChild(player1Score);
  console.log("player 2 difference", player2Difference);
  const player2Score = document.createElement("div");
  player2Score.innerText = `Player 2 score is: ${player2Difference}`;
  cardRow2.appendChild(player2Score);

  // The winner is the player who has the greatest difference in rank between the highest and lowest cards in his hand.
  if (player2Difference > player1Difference) {
    output("Player 2 has won! Press player 1 Draw to start a new game");
  } else if (player2Difference < player1Difference) {
    output("Player 1 has won! Press player 1 Draw to start a new game");
  } else if (player1Difference === player2Difference) {
    output("It is a draw! Press player 1 Draw to start a new game");
  }
  resetGame();
};

//Global Variables
let player1Cards = [];
let player2Cards = [];
let player = 1;
let deck = shuffleCards(makeDeck());
let player1Draws = 0;
let player2Draws = 0;

//Buttons
const player1Button = document.createElement("button");
player1Button.innerText = "Player 1 Draw";
document.body.appendChild(player1Button);

const player2Button = document.createElement("button");
player2Button.innerText = "Player 2 Draw";
document.body.appendChild(player2Button);
player2Button.disabled = true;

player1Button.addEventListener("click", player1Click);
player2Button.addEventListener("click", player2Click);

//Card Containers
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
document.body.appendChild(cardContainer);
const cardRow1 = document.createElement("div");
cardRow1.classList.add("card-row");
const cardRow2 = document.createElement("div");
cardRow2.classList.add("card-row");
const row1Paragraph = document.createElement("h2");
row1Paragraph.innerText = "Player 1 Cards";
const row2Paragraph = document.createElement("h2");
row2Paragraph.innerText = "Player 2 Cards";

//Add card containers
cardContainer.appendChild(row1Paragraph);
cardContainer.appendChild(cardRow1);
cardContainer.appendChild(row2Paragraph);
cardContainer.appendChild(cardRow2);

//Output
const gameInfo = document.createElement("div");
gameInfo.classList.add("output");
gameInfo.innerText =
  "Please input the number of times that each player wants to draw";
document.body.appendChild(gameInfo);

// Create a text input. The players will decide before hand how many cards will be drawn per player in the game by typing a number in the input and clicking a button.
// During game play the players can draw in any order until the set number of cards has been drawn. Display the winner after the last card has been drawn.

//Create input fields
const inputField = document.createElement("div");
cardRow1.appendChild(inputField);
const player1input = document.createElement("INPUT");
player1input.setAttribute("type", "text");
const player1inputButton = document.createElement("button");
player1inputButton.innerHTML = "Submit";
inputField.appendChild(player1input);
inputField.appendChild(player1inputButton);
const chosenTimes = document.createElement("p");
row1Paragraph.appendChild(chosenTimes);

const inputField2 = document.createElement("div");
cardRow2.appendChild(inputField2);
const player2input = document.createElement("INPUT");
player2input.setAttribute("type", "text");
const player2inputButton = document.createElement("button");
player2inputButton.innerHTML = "Submit";
inputField2.appendChild(player2input);
inputField2.appendChild(player2inputButton);
const chosenTimes2 = document.createElement("p");
row2Paragraph.appendChild(chosenTimes2);

const player1Inputs = () => {
  let value = player1input.value;
  if (isNaN(value)) {
    chosenTimes.innerText = `Please key number of times you want to draw`;
  }

  if (value === "") {
    chosenTimes.innerText = `Please key number of times you want to draw`;
  }

  if (value !== "") {
    player1Draws = Number(value);
    chosenTimes.innerText = `Player 1 number of draws: ${value}`;
    player1input.remove();
    player1inputButton.remove();
  }
};

const player2Inputs = () => {
  let value = player2input.value;
  if (isNaN(value)) {
    chosenTimes2.innerText = `Please key number of times you want to draw`;
  }

  if (value === "") {
    chosenTimes2.innerText = `Please key number of times you want to draw`;
  }

  if (value !== "") {
    player2Draws = Number(value);
    chosenTimes2.innerText = `Player 2 number of draws: ${value}`;
    player2input.remove();
    player2inputButton.remove();
  }
};

player1inputButton.addEventListener("click", player1Inputs);
player2inputButton.addEventListener("click", player2Inputs);
