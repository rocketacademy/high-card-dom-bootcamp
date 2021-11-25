//= ========================
// Global Variables
//= ========================

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");

let cardContainer;

//= ========================
// Helper Functions
//= ========================

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

// makeDeck helper functionss
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const suitSymbols = ["♥", "♦️", "♣", "♠"];
  const suitColours = ["red", "red", "black", "black"];

  // Loop over the suits
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];
    const currentColour = suitColours[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        displayName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        displayName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        displayName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        displayName = "K";
      }

      // Create a new card with the current name
      // suit, and rank, colour, displayName, and suitSymbol
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        colour: currentColour,
        displayName,
        suitSymbol: currentSuitSymbol,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// createCard function
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add(cardInfo.suit, cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;
  console.log(name.innerText);

  const card = document.createElement("div");
  card.classList.add("card", "whiteBackground");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// creating a container element for the cards
cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
document.body.appendChild(cardContainer);

const deck = shuffleCards(makeDeck());

// ==========================
// Game Functions
// =========================

// player 1's turn to draw the card
const player1Click = () => {
  if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = "";
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
    // Switch to player 2's turn
    playersTurn = 2;
  }
};

// player 2's turn to draw the card
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
      output("player 1 wins");
    } else if (player1Card.rank < player2Card.rank) {
      output("player 2 wins");
    } else {
      output("tie");
    }
  }
};

// initiate game function
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
};

// call the function to initate the game
initGame();
