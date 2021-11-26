// SET GLOBAL VARIABLES

let player1Card;
let player2Card;
const player1Hand = [];
const player2Hand = [];

const gameInfo = document.createElement('div');

const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

const p1CardRow = document.createElement('div');
p1CardRow.classList.add('cardrow');
const p2CardRow = document.createElement('div');
p2CardRow.classList.add('cardrow');

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

const deck = shuffleCards(makeDeck());

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

// create helper function to sort array by descending order
const sortArray = (array) => {
  array.sort((a, b) => b.rank - a.rank);
};

// calculate difference between highest and lowest rank in hand
const calcRankDiff = (array) => {
  sortArray(array);
  const rankDiff = array[0].rank - array[array.length - 1].rank;
  return rankDiff;
};

// PLAYER ACTION FUNCTIONS

const player1Click = () => {
  setTimeout(() => {
    player1Card = deck.pop();
    player1Hand.push(player1Card);
    const cardElement = createCard(player1Card);
    p1CardRow.appendChild(cardElement);

    if (player1Hand.length < 2 || player2Hand.length < 2) {
      output('Y\'all gotta draw more cards!');
    } else if (player1Hand.length > 1 && player2Hand > 1) {
      if (calcRankDiff(player1Hand) > calcRankDiff(player2Hand)) {
        output('Player 1 wins!');
      } else if (calcRankDiff(player1Hand) < calcRankDiff(player2Hand)) {
        output('Player 2 wins!');
      } else {
        output('It\'s a tie!');
      }
    }
  }, 1000);
};

const player2Click = () => {
  setTimeout(() => {
    player2Card = deck.pop();
    player2Hand.push(player2Card);
    const cardElement = createCard(player2Card);
    p2CardRow.appendChild(cardElement);

    if (player1Hand.length < 2 || player2Hand.length < 2) {
      output('Y\'all gotta draw more cards!');
    } else if (player2Hand.length > 1 && player1Hand.length > 1) {
      if (calcRankDiff(player1Hand) > calcRankDiff(player2Hand)) {
        output('Player 1 wins!');
      } else if (calcRankDiff(player1Hand) < calcRankDiff(player2Hand)) {
        output('Player 2 wins!');
      } else {
        output('It\'s a tie!');
      }
    }
  }, 1000);
};

// INITIALISE GAME

const initGame = () => {
  // fill game info with instructions
  output('Draw as many cards as you want! The player with the greatest difference between their highest card and lowest card wins!');
  document.body.appendChild(gameInfo);

  document.body.appendChild(p1CardRow);

  player1Button.innerText = 'Player 1 Draw';
  player1Button.classList.add('button');
  document.body.appendChild(player1Button);

  document.body.appendChild(p2CardRow);

  player2Button.innerText = 'Player 2 Draw';
  player2Button.classList.add('button');
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

initGame();
