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

// Make a new deck of cards
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  let currentSuitEmoji = '';
  let suitColor = '';

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    // Define suit emoji
    if (currentSuit === 'hearts') {
      currentSuitEmoji = '♥️';
    } else if (currentSuit === 'diamonds') {
      currentSuitEmoji = '♦️';
    } else if (currentSuit === 'clubs') {
      currentSuitEmoji = '♣️';
    } else if (currentSuit === 'spades') {
      currentSuitEmoji = '♠️';
    }
    // Define suit color

    if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
      suitColor = 'red';
    } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
      suitColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentSuitEmoji,
        color: suitColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Render card on DOM
const makeCard = (card, playerContainer) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = card.emoji;

  const name = document.createElement('div');
  name.classList.add('name');
  if (card.color === 'red') {
    name.classList.add('red');
  } else if (card.color === 'black') { name.classList.add('black'); }
  name.innerText = card.name;

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card');
  playerContainer.appendChild(cardContainer);

  cardContainer.appendChild(name);
  cardContainer.appendChild(suit);
};

// MATCH
const mode = 'draw cards';
let player1Card;
let player2Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const getResultButton = document.createElement('button');

const gameInfo = document.createElement('div');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const deck = shuffleCards(makeDeck());

// Player Action Callbacks
const player1Click = () => {
  if (mode === 'draw cards') {
    player1Card = deck.pop();
    makeCard(player1Card, document.getElementById('player1Container'));
  }
};

const player2Click = () => {
  if (mode === 'draw cards') {
    player2Card = deck.pop();
    makeCard(player2Card, document.getElementById('player2Container'));
  }
};
const getResultsClick = () => {
  if (player1Card.rank > player2Card.rank) {
    output('player 1 wins');
  } else if (player1Card.rank < player2Card.rank) {
    output('player 2 wins');
  } else {
    output('tie');
  }
};

// Game Initialisation
const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.getElementById('player1Container').appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.getElementById('player2Container').appendChild(player2Button);

  getResultButton.innerText = 'Get Results';
  document.body.appendChild(getResultButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  getResultButton.addEventListener('click', getResultsClick);

  // document.body.appendChild(player1Container);
  // document.body.appendChild(player2Container);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

initGame();
