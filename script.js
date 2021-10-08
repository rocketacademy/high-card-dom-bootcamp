// Please implement exercise logic here
// GLOBAL VARIABLES

// HELPER FUNCTIONS
const createDeck = () => {
  // newDeck array to contain cards
  const newDeck = [];

  // outer loop. four suits; suit symbols; suit colors
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  const suitSymbols = ['♦️', '♣️', '♥️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];

    let suitColor = '';
    if (currentSuit === 'diamonds' || currentSuit === 'hearts') {
      suitColor = 'red';
    } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
      suitColor = 'black';
    }
    // inner loop. 1 to 13 ranks;
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Define card names
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;
      // Define exceptions for card name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // Define exceptions for display name
      if (shortName === '1') {
        shortName = 'A';
      } else if (shortName === '11') {
        shortName = 'J';
      } else if (shortName === '12') {
        shortName = 'Q';
      } else if (shortName === '13') {
        shortName = 'K';
      }

      // Create Card
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: currentSymbol,
        color: suitColor,
        displayName: shortName,
      };

      // add card to deck through push function.
      newDeck.push(card);
    }
  }

  return newDeck;
};

// function. Random Integer for shuffle function; input = deck.length
const getRandomInt = (max) => Math.floor(Math.random() * max);

// function. shuffle deck
const shuffleDeck = (deck) => {
  // loop through entire deck
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex += 1) {
    // pick random card through getRandomInt()
    const randomIndex = getRandomInt(deck.length);
    const randomCard = deck[randomIndex];
    // pick card at current index
    const currentCard = deck[currentIndex];
    // swap places
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// function. Create and initialize cards to append to interface.
const createCard = (cardData) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardName = document.createElement('div');
  cardName.classList.add(cardData.name, cardData.color);
  cardName.innerText = cardData.displayName;

  const suit = document.createElement('div');
  suit.classList.add(cardData.suit, cardData.color);
  suit.innerText = cardData.symbol;

  card.appendChild(cardName);
  card.appendChild(suit);

  return card;
};

// GLOBAL VARIABLES
const deck = shuffleDeck(createDeck());

const gameInterface = document.createElement('div');
const gameInfo = document.createElement('div');
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

let playerTurn = 1;
let player1Card;
let player2Card;

let cardContainer;

const output = (message) => {
  gameInfo.innerText = message;
};

// PLAYER ACTION CALLBACK
const player1Click = () => {
  if (playerTurn === 1) {
    cardContainer.innerText = '';

    player1Card = deck.pop();
    const cardElement = createCard(player1Card);

    cardContainer.appendChild(cardElement);
    playerTurn = 2;
  }
};

const player2Click = () => {
  if (playerTurn === 2) {
    player2Card = deck.pop();

    const cardElement = createCard(player2Card);
    cardContainer.appendChild(cardElement);

    playerTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('Player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('Player 2 wins');
    } else { output('You tied!'); }
  }
};

// GAME LOGIC

// GAME INIT
const initGame = () => {
  gameInfo.innerText = "It's player 1's turn. Click to draw a card!";
  gameInfo.classList.add('game-message');
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);
  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

initGame();
