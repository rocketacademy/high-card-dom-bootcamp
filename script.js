let playersTurn = 1; // matches with starting instructions
let player1Card;
let cardContainer;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      let icon = suitIndex;
      if (suitIndex === 0) {
        icon = '♥️';
      } else if (suitIndex === 1) {
        icon = '♦️';
      } else if (suitIndex === 2) {
        icon = '♣️';
      } else if (suitIndex === 3) {
        icon = '♠️';
      }

      let cardDisplayName = `${rankCounter}`;
      if (cardDisplayName === '1') {
        cardDisplayName = 'A';
      } else if (cardDisplayName === 'J') {
        cardDisplayName = 'jack';
      } else if (cardDisplayName === 'Q') {
        cardDisplayName = 'queen';
      } else if (cardDisplayName === 'K') {
        cardDisplayName = 'king';
      }

      let cardColor = suitIndex;
      if (suitIndex === 0 || suitIndex === 1) {
        cardColor = 'red';
      } else {
        cardColor = 'black';
      }
      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: icon,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

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

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
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

const cardInfo = {
  suitSymbol: '♦️',
  suit: 'diamond',
  name: 'queen',
  displayName: 'Q',
  colour: 'red',
  rank: 12,
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = '3';

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const initGame = () => {
  // initialize button functionality
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

initGame();
