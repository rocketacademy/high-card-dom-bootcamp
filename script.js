// Please implement exercise logic here
// Please implement exercise logic here

let canClick = true;
let cardContainer;

const cardNameMap = {
  1: "Ace",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "Jack",
  12: "Queen",
  13: "King",
};

const cardScoreValueMap = {
  1: 11, // can be 1 or 11, defaults to 11 before user input
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
};

const cardSuitEmojiMap = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const displayNameMap = {
  1: "A",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6️",
  7: "7️",
  8: "8️",
  9: "9️",
  10: "10",
  11: "J",
  12: "Q",
  13: "K",
};

// HELPER FUNCTIONS
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);
// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = function () {
  const cardDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    let rankCounter = 1;
    while (rankCounter <= 13) {
      const cardName = cardNameMap[rankCounter];
      const cardSuitEmojiTemp = cardSuitEmojiMap[suits[suitIndex]];
      const cardScoreValue = cardScoreValueMap[rankCounter];
      const cardDisplayName = displayNameMap[rankCounter];
      let cardColor;
      if (currentSuit == "hearts" || currentSuit == "diamonds") {
        cardColor = "red";
      } else cardColor = "black";

      const card = {
        suitSymbol: cardSuitEmojiTemp,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        color: cardColor,
        rank: rankCounter,
        scoreValue: cardScoreValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;
  // suit.innerHTML = `<span style="color:${cardInfo.color}>${cardInfo.suitSymbol}</span>`

  const name = document.createElement("div");
  name.classList.add(cardInfo.displayName, cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Global Setup
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      player1Card = deck.pop();

      const cardElement = createCard(player1Card);

      // in case this is not the 1st time
      // in the entire app,
      // empty the card container
      cardContainer.innerHTML = "";

      cardContainer.appendChild(cardElement);
      playersTurn = 2;
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      const player2Card = deck.pop();
      const cardElement = createCard(player2Card);

      cardContainer.appendChild(cardElement);

      playersTurn = 1;
      canClick = true;

      if (player1Card.rank > player2Card.rank) {
        output("player 1 wins");
      } else if (player1Card.rank < player2Card.rank) {
        output("player 2 wins");
      } else {
        output("tie");
      }
    }, 2000);
  }
};

const initGame = () => {
  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement("div");
  document.body.appendChild(cardContainer);
};

initGame();

// let cardContainer = document.createElement('div');
// cardContainer.classList.add('card-container');
// document.body.appendChild(cardContainer);
