//////////////////////////////////
//Global variables
//////////////////////////////////
let playersTurn = 1; // matches with starting instructions
let player1Card; //if not unable to access this variable in player2Click() 

let cardContainer;
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");

//////////////////////////////////
//Helper functions
//////////////////////////////////
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
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
    let suitSymbol = "",
      suitColor = "";

    currentSuit === "hearts"
      ? (suitSymbol = "♥️")
      : currentSuit === "diamonds"
      ? (suitSymbol = "♦")
      : currentSuit === "clubs"
      ? (suitSymbol = "♣")
      : (suitSymbol = "♠");

    currentSuit === "hearts" || currentSuit === "diamonds"
      ? (suitColor = "red")
      : (suitColor = "black");

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`,
        shortName = `${rankCounter}`;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        shortName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        shortName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        shortName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        shortName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitPic: suitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: shortName,
        colour: suitColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

const deck = shuffleCards(makeDeck());

//creating a card for display with information stored in card object
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.colour);
  suit.innerText = cardInfo.suitPic;

  const name = document.createElement("div");
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

//////////////////////////////////
//Player Action Callbacks
//////////////////////////////////
const player1Click = () => {
  if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    
    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = '';
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
    
    // Switch to player 2's turn
    playersTurn = 2
    output("It's player 2 turn. Click to draw a card!");
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    
    // Create card element from card metadata
    const cardElement = createCard(player2Card);    
    // Append card element to card container
    cardContainer.appendChild(cardElement);
    
    // Switch to player 1's turn
    playersTurn = 1;
    
    // Determine and output winner
    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
};
//////////////////////////////////
//Main Game Play
//////////////////////////////////
//use a IIFE so dun need to explicitly call the function
(() => {
  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);

  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "It's player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);
})();
