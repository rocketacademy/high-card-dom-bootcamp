// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = Math.floor(Math.random() * cards.length);
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
  const suitSymbols = ['♥️', '♦', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayName = cardName;
      const colour = suitIndex <= 1 ? 'red' : 'black';

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSymbol,
        displayName,
        colour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

let playersTurn = 1; // Player 1 starts first
let player1Card;
let cardContainer;

// create two buttons
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

// Create game info div as global value
const gameInfo = document.createElement('div');
const instructions = document.createElement('p');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  instructions.innerText = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

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
    playersTurn = 2;
    instructions.innerText = 'Its player 2 turn. Click to draw a card!';
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

const initGame = () => {
  // fill game info div with starting instructions
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  gameInfo.appendChild(cardContainer);

  instructions.innerText = 'Its player 1 turn. Click to draw a card!';
  gameInfo.appendChild(instructions);
  document.body.appendChild(gameInfo);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

initGame();
