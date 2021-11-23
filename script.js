// SET GLOBAL VARIABLES

let playersTurn = 1;
let player1Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const cardRow = document.createElement('div');

const gameInfo = document.createElement('div');

let canClick = true;

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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let currentSymbol;
    let currentColor = 'red';

    if (currentSuit === 'hearts') {
      currentSymbol = '♥';
    } else if (currentSuit === 'diamonds') {
      currentSymbol = '♦️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
      currentColor = 'black';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
      currentColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplay = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplay = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplay = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplay = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSymbol,
        displayName: cardDisplay,
        color: currentColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// PLAYER ACTION FUNCTIONS

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    player1Card = deck.pop();

    const cardElement = createCard(player1Card);

    // empty card container in case this is not first time picking card
    cardRow.innerHTML = '';
    output('Now Player 2, pick a card!');
    cardRow.appendChild(cardElement);
    playersTurn = 2;
    canClick = true;
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;

    const player2Card = deck.pop();
    const cardElement = createCard(player2Card);

    cardRow.appendChild(cardElement);

    playersTurn = 1;
    canClick = true;

    if (player1Card.rank > player2Card.rank) {
      output('Player 1 wins!');
    } else if (player1Card.rank < player2Card.rank) {
      output('Player 2 wins!');
    } else {
      output('It\'s a tie!');
    }
  }
};

// INITIALISE GAME

const initGame = () => {
  // fill game info with instructions
  document.body.appendChild(cardRow);

  output('It\'s Player 1\'s turn! Click to draw a card!');
  document.body.appendChild(gameInfo);

  // add text to player buttons
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

const deck = shuffleCards(makeDeck());

initGame();
