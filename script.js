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

// function. Calculate total hand value for comparison.
const getHandValue = (hand) => {
  let finalHandValue = 0;
  for (let i = 0; i < hand.length; i += 1) {
    finalHandValue += hand[i].rank;
  }
  return finalHandValue;
};

// GLOBAL VARIABLES
const deck = shuffleDeck(createDeck());

const gameInterface = document.createElement('div');
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const skipButton = document.createElement('button');
let player1Hand = [];
let player2Hand = [];
let player1HandValue;
let player2HandValue;
let playerTurn = 1;
let player1Card;
let player2Card;

let cardContainer1;
let cardContainer2;

const output = (message) => {
  gameInterface.innerText = message;
};

// PLAYER ACTION CALLBACK
// GAME LOGIC
const checkWinConditions = () => {
  if (player1HandValue > player2HandValue) {
    output(`Player 1 Hand Value: ${player1HandValue}
    Player 2 Hand Value: ${player2HandValue}
    Player 1 Wins!`);
  } else if (player1HandValue < player2HandValue) {
    output(`Player 1 Hand Value: ${player1HandValue}
    Player 2 Hand Value: ${player2HandValue}
    Player 2 Wins!`);
  } else { output(`Player 1 Hand Value: ${player1HandValue}
    Player 2 Hand Value: ${player2HandValue}
    Players are tied!`); }
};

const gameStateManager = () => {
  if (playerTurn === 1) {
    playerTurn = 2;
    skipButton.innerText = 'compare values';

    gameInterface.innerText = `It's player 2's turn. Each click to draws a card!
  Click multiple times to draw up to the same hand size as player 1.
  Player 2 may click the 'compare values' button with a smaller hand size to compare the hand values, and get bonus points! 
  The highest valued hand wins!`;
  } else if (playerTurn === 2) {
    playerTurn = 1;
    checkWinConditions();
    skipButton.innerText = 'reset';
  } else if (playerTurn === 0) {
    // reset game state
    cardContainer1.innerText = '';
    cardContainer2.innerText = '';
    player1Hand = [];
    player2Hand = [];
    playerTurn = 1;
    skipButton.innerText = 'Stand';
    gameInterface.innerText = `It's player 1's turn. Click to draw a card!
  Click multiple times to draw up to a hand of 5. 
  Player 2 will match the number of cards.
  Click the 'stand' button to let player 2 draw if player 1 does not have 5 cards yet.
  The higher hand value wins!`;
  }
  console.log(`player turn: ${playerTurn}`);
};

const player1Click = () => {
  if (playerTurn === 1) {
    // cardContainer.innerText = '';
    player1Card = deck.pop();
    const cardElement = createCard(player1Card);

    player1Hand.push(player1Card);
    console.log(`Player 1 Hand: ${player1Hand}`);
    player1HandValue = getHandValue(player1Hand);
    console.log(`Player 1 Hand Value: ${player1HandValue}`);
    cardContainer1.appendChild(cardElement);
    if (player1Hand.length === 5) {
      playerTurn = 2;
    }
  }
};

const player2Click = () => {
  if (playerTurn === 2) {
    player2Card = deck.pop();
    const cardElement = createCard(player2Card);

    player2Hand.push(player2Card);
    console.log(`Player 2 Hand: ${player2Hand}`);
    player2HandValue = getHandValue(player2Hand);
    console.log(`Player 2 Hand Value: ${player2HandValue}`);
    cardContainer2.appendChild(cardElement);
    if (player2Hand.length === player1Hand.length) {
      playerTurn = 0;
      checkWinConditions();
      skipButton.innerText = 'Reset';
    }
  }
};

// GAME INIT
const initGame = () => {
  gameInterface.innerText = `It's player 1's turn. Click to draw a card!
  Click multiple times to draw up to a hand of 5. 
  Player 2 will match the number of cards.
  Click the 'stand' button to let player 2 draw if player 1 does not have 5 cards yet.
  The higher hand value wins!`;
  gameInterface.classList.add('game-message');
  document.body.appendChild(gameInterface);

  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container');
  document.body.appendChild(cardContainer1);

  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container');
  document.body.appendChild(cardContainer2);

  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);
  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);
  skipButton.innerText = 'Stand';
  document.body.appendChild(skipButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  skipButton.addEventListener('click', gameStateManager);
};

initGame();
