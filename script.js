/// Global Variables ///////////////////////////////////////////////////////////////////
// player 1 starts by default
let playersTurn = 1;

let previousTurn;

let cardCount = 2;

let player1Cards = [];
let player2Cards = [];

// create a container for cardContainer element and gameInfo element
const container = document.createElement('div');

// create a cardContainer
const cardTable = document.createElement('table');
const cardRow = document.createElement('tr');
const cardColOne = document.createElement('td');
const cardColTwo = document.createElement('td');

// create gameInfo row
const infoRow = document.createElement('tr');
const gameInfo = document.createElement('td');

// create two buttons and input field
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

const inputContainer = document.createElement('div');
const cardCountField = document.createElement('input');

/// Helper Functions ///////////////////////////////////////////////////////////////////
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

// Make a deck of card/array of card objects
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    let currentSymbol = '';
    if (suitIndex === 0) {
      currentSymbol = '♥';
    } else if (suitIndex === 1) {
      currentSymbol = '♦';
    } else if (suitIndex === 2) {
      currentSymbol = '♣';
    } else if (suitIndex === 3) {
      currentSymbol = '♠';
    }

    let currentColor = '';
    if (suitIndex === 0 || suitIndex === 1) {
      currentColor = 'red';
    } else if (suitIndex === 2 || suitIndex === 3) {
      currentColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name and short name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // and set shortName to the abbreviation of ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      // and suit symbol, display name and color
      const card = {
        suitSymbol: currentSymbol,
        name: cardName,
        suit: currentSuit,
        displayName: shortName,
        color: currentColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

// function to consume a cardObject and produce a card element
const makeCard = (cardObject) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const name = document.createElement('div');
  name.classList.add('name', cardObject.color);
  name.innerText = cardObject.displayName;
  card.appendChild(name);

  const suit = document.createElement('div');
  suit.classList.add('suit', cardObject.color);
  suit.innerText = cardObject.suitSymbol;
  card.appendChild(suit);

  return card;
};

// function to calculate the difference between the highest card
// and the lowest card in a hand
const calcDifference = (hand) => {
  const handRanks = [];
  for (let i = 0; i < hand.length; i += 1) {
    handRanks.push(hand[i].rank);
  }
  const handMax = Math.max(...handRanks);
  const handMin = Math.min(...handRanks);
  const handDif = handMax - handMin;
  return handDif;
};

/// Callback Functions ///////////////////////////////////////////////////////////////////
// player 1's button to draw card and switch to player 2's turn
const player1Click = () => {
  cardCountField.disabled = true;
  cardCount = Number(cardCountField.value);
  if (playersTurn === 1) {
    cardColOne.innerText = '';
    if (previousTurn === 2) {
      cardColTwo.innerText = '';
    }
    if (player1Cards.length < cardCount) {
      player1Cards.push(deck.pop());
    }
    player1Cards.sort((firstItem, secondItem) => firstItem.rank - secondItem.rank);
    player1Cards.unshift(player1Cards.pop());
    for (let i = 0; i < player1Cards.length; i += 1) {
      const cardElement = makeCard(player1Cards[i]);
      cardColOne.appendChild(cardElement);
    }
    if (player1Cards.length === cardCount) {
      gameInfo.innerHTML = 'Its player 2 turn. Click to draw a card!';
      previousTurn = 1;
      playersTurn = 2;
      player1Button.disabled = true;
      player2Button.disabled = false;
    }
  }
};

// player 2's button to draw card, determine winner and switch back to player 1's turn to repeat
const player2Click = () => {
  if (playersTurn === 2) {
    cardColTwo.innerText = '';
    if (player2Cards.length < cardCount) {
      player2Cards.push(deck.pop());
    }
    player2Cards.sort((firstItem, secondItem) => firstItem.rank - secondItem.rank);
    player2Cards.unshift(player2Cards.pop());
    for (let i = 0; i < player2Cards.length; i += 1) {
      const cardElement = makeCard(player2Cards[i]);
      cardColTwo.appendChild(cardElement);
    }
    if (player2Cards.length === cardCount) {
      if (calcDifference(player1Cards) > calcDifference(player2Cards)) {
        output('player 1 wins');
      } else if (calcDifference(player1Cards) < calcDifference(player2Cards)) {
        output('player 2 wins');
      } else {
        output('tie');
      }
      gameInfo.innerHTML += '<br>Its player 1 turn. Click to draw a card!';
      previousTurn = 2;
      playersTurn = 1;
      player1Cards = [];
      player2Cards = [];
      player1Button.disabled = false;
      player2Button.disabled = true;
      cardCountField.disabled = false;
    }
  }
};

/// Initialise /////////////////////////////////////////////////////////////////////////

const initGame = () => {
  container.classList.add('container');
  document.body.appendChild(container);

  container.appendChild(cardTable);
  cardRow.classList.add('card-container');
  cardTable.appendChild(cardRow);

  cardColOne.classList.add('player-one');
  cardRow.appendChild(cardColOne);
  cardColTwo.classList.add('player-two');
  cardRow.appendChild(cardColTwo);

  infoRow.classList.add('info-row');
  cardTable.appendChild(infoRow);
  gameInfo.classList.add('game-info');
  // fill gameInfo div with starting instructions
  gameInfo.innerHTML = 'Its player 1 turn. Click to draw a card!';
  infoRow.appendChild(gameInfo);

  // initialize button functionality
  player1Button.classList.add('button');
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.classList.add('button');
  player2Button.innerText = 'Player 2 Draw';
  player2Button.disabled = true;
  document.body.appendChild(player2Button);

  document.body.appendChild(inputContainer);
  cardCountField.type = 'number';
  cardCountField.value = '2';
  cardCountField.min = '2';
  cardCountField.max = '6';
  inputContainer.appendChild(cardCountField);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

initGame();
