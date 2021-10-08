/// Global Variables ///////////////////////////////////////////////////////////////////
// player 1 starts by default
let playersTurn = 1;

let previousTurn;

let player1Cards = [];
let player2Cards = [];

// create a container for cardContainer element and gameInfo element
const container = document.createElement('div');

// create a cardContainer
const cardContainerOne = document.createElement('div');
const cardContainerTwo = document.createElement('div');

// create gameInfo div
const gameInfo = document.createElement('div');

// create two buttons and input field
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

const inputContainer = document.createElement('div');

const cardCountField = document.createElement('input');
const cardCountButton = document.createElement('button');

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
  if (playersTurn === 1) {
    cardContainerOne.innerText = '';
    if (previousTurn === 2) {
      cardContainerTwo.innerText = '';
    }
    if (player1Cards.length < 3) {
      player1Cards.push(deck.pop());
    }
    for (let i = 0; i < player1Cards.length; i += 1) {
      const cardElement = makeCard(player1Cards[i]);
      cardContainerOne.appendChild(cardElement);
    }
    if (player1Cards.length === 3) {
      previousTurn = 1;
      playersTurn = 2;
      gameInfo.innerHTML = 'Its player 2 turn. Click to draw a card!';
    }
  }
};

// player 2's button to draw card, determine winner and switch back to player 1's turn to repeat
const player2Click = () => {
  if (playersTurn === 2) {
    cardContainerTwo.innerText = '';
    if (player2Cards.length < 3) {
      player2Cards.push(deck.pop());
    }
    for (let i = 0; i < player2Cards.length; i += 1) {
      const cardElement = makeCard(player2Cards[i]);
      cardContainerTwo.appendChild(cardElement);
    }
    if (player2Cards.length === 3) {
      if (calcDifference(player1Cards) > calcDifference(player2Cards)) {
        output('<br>player 1 wins');
      } else if (calcDifference(player1Cards) < calcDifference(player2Cards)) {
        output('<br>player 2 wins');
      } else {
        output('<br>tie');
      }
      previousTurn = 2;
      playersTurn = 1;
      gameInfo.innerHTML += '<br>Its player 1 turn. Click to draw a card!';
      player1Cards = [];
      player2Cards = [];
    }
  }
};

/// Initialise /////////////////////////////////////////////////////////////////////////

const initGame = () => {
  container.classList.add('container');
  document.body.appendChild(container);

  cardContainerOne.classList.add('card-container-one');
  container.appendChild(cardContainerOne);

  cardContainerTwo.classList.add('card-container-two');
  container.appendChild(cardContainerTwo);

  gameInfo.classList.add('game-info');
  // fill gameInfo div with starting instructions
  gameInfo.innerHTML = 'Its player 1 turn. Click to draw a card!';
  container.appendChild(gameInfo);

  // initialize button functionality
  player1Button.classList.add('button');
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.classList.add('button');
  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  document.body.appendChild(inputContainer);
  inputContainer.appendChild(cardCountField);
  cardCountButton.innerText = 'Submit';
  inputContainer.appendChild(cardCountButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

initGame();
