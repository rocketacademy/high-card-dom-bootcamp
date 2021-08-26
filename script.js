// Please implement exercise logic here

// ==================== HELPER FUNCTIONS ====================
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
    let symbol = '';
    let color = '';

    if (currentSuit === 'hearts') {
      symbol = '♥️';
      color = 'red';
    } else if (currentSuit === 'diamonds') {
      symbol = '♦️';
      color = 'red';
    } else if (currentSuit === 'clubs') {
      symbol = '♣️';
      color = 'black';
    } else if (currentSuit === 'spades') {
      symbol = '♠️';
      color = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortForm = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortForm = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortForm = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortForm = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortForm = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: shortForm,
        suitSymbol: symbol,
        suitColour: color,
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
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.suitColour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// identify highest ranking card in hand
const getMax = (array) => {
  let maxRank = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].rank > maxRank) {
      maxRank = array[i].rank;
    }
  } return maxRank;
};

// identify lowest ranking card in hand
const getMin = (array) => {
  let minRank = 100;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].rank < minRank) {
      minRank = array[i].rank;
    }
  } return minRank;
};

// calculate difference between highest and lowest ranking card in hand
const getDiff = (array) => {
  const diffValue = getMax(array) - getMin(array);
  return diffValue;
};

// ==================== GLOBAL SETUP ====================
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;

const gameInfo = document.createElement('div');

const player1Button = document.createElement('button');
player1Button.classList.add('button');

const player2Button = document.createElement('button');
player2Button.classList.add('button');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

let cardContainer1;
let cardContainer2;
let buttonDiv;
const player1Hand = [];
const player2Hand = [];

// ==================== PLAYER ACTION CALLBACKS ====================
const player1Click = () => {
  // Switch to player 1's turn
  playersTurn = 1;

  if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    player1Hand.push(player1Card);

    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // // Empty cardContainer in case this is not the 1st round of gameplay
    // cardContainer1.innerHTML = '';
    // Append the card element to the card container
    cardContainer1.appendChild(cardElement);
  }
};

const player2Click = () => {
  // Switch to player 2's turn
  playersTurn = 2;
  output('It\'s player 2\'s turn.<br>Click again to draw a card!');

  if (playersTurn === 2) {
    // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    player2Hand.push(player2Card);

    // Create card element from card metadata
    const cardElement = createCard(player2Card);
    // Append card element to card container
    cardContainer2.appendChild(cardElement);

    // Determine and output winner
    if (getDiff(player1Hand) > getDiff(player2Hand)) {
      output('Player 1 wins!<br>Player 1, click to draw a card and play again!');
    } else if (getDiff(player1Hand) < getDiff(player2Hand)) {
      output('Player 2 wins!<br>Player 1, click to draw a card and play again!');
    } else {
      output('Its a tie!<br>Player 1, click to draw a card and play again!');
    } console.log(getDiff(player1Hand), getDiff(player2Hand));
  }
};

// ==================== GAME INITIALIZATION ====================
const initGame = () => {
  // fill game info div with starting instructions
  gameInfo.innerHTML = 'Welcome to High Card Game.<br>It\'s player 1\'s turn. Click to draw a card!';
  gameInfo.classList.add('info');
  document.body.appendChild(gameInfo);

  // Initialise card container 1
  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container', 'wrapper');
  document.body.appendChild(cardContainer1);

  // Initialise card container 2
  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container', 'wrapper');
  document.body.appendChild(cardContainer2);

  // Initialise button container
  buttonDiv = document.createElement('div');
  buttonDiv.classList.add('wrapper');
  document.body.appendChild(buttonDiv);

  // initialize button functionality
  player1Button.innerText = 'Player 1: Draw';
  buttonDiv.appendChild(player1Button);

  player2Button.innerText = 'Player 2: Draw';
  buttonDiv.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

initGame();
