// ----------------------------------------------------------------
// GLOBAL SETUP
// ----------------------------------------------------------------

let canClick = true;

let cardContainer;

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;
let player2Card;

// create two buttons
const player1Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// ---------------------------------------------------------
// HELPER FUNCTIONS FOR GAME LOGIC
// ---------------------------------------------------------

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
  const suitSymbols = ['♥️', '♦️', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];
    let suitColour = '';

    if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
      suitColour = 'red';
    } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
      suitColour = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayAs = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayAs = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayAs = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayAs = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayAs = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: currentSymbol,
        displayName: displayAs,
        colour: suitColour,
        rank: rankCounter,
      };

      const cardInfo = {

        suit: 'diamond',
        name: 'queen',

        rank: 12,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// what is this even for?
const makeCard = (card) => {
  const cardEl = document.createElement('p');
  cardEl.innerText = card.name; // also output the other attributes
  return cardEl;
};

// ---------------------------------------------------------
// PLAYER ACTION CALLBACKS: WHEN P1 & P2 CLICK ON RESPECTIVE BTNS
// ---------------------------------------------------------

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    console.log('p1: ', canClick);

    setTimeout(() => {
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
      // document.body.appendChild(cardContainer);

      canClick = true;
      console.log('timeout is happening');
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    console.log('p2', canClick);

    setTimeout(() => {
      // Pop player 2's card metadata from the deck
      player2Card = deck.pop();

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
    }, 2000);
    console.log('timeout is happening');
  }
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// ---------------------------------------------------------
//
// ---------------------------------------------------------

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
player1Button.addEventListener('click', player1Click);

// -- refactored --
// player1Button.addEventListener('click', () => {
//   if (playersTurn === 1) {
//     player1Card = deck.pop();
//     playersTurn = 2;
//     createCard(player1Card);
//   }
// });

// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
player2Button.addEventListener('click', player2Click);

// -- refactored --
// player2Button.addEventListener('click', () => {
//   if (playersTurn === 2) {
//     player2Card = deck.pop();
//     playersTurn = 1;

//     createCard(player2Card);

//     if (player1Card.rank > player2Card.rank) {
//       output('player 1 wins');
//     } else if (player1Card.rank < player2Card.rank) {
//       output('player 2 wins');
//     } else {
//       output('tie');
//     }
//   }
// });

// ----------------------------------------------------------------
// GAME INITIALISATION
// ----------------------------------------------------------------

const deck = shuffleCards(makeDeck());

const initGame = () => {
  // initialize button functionality
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

cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);

// i need to call this function when button is clicked
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  cardContainer.appendChild(card);

  return card;
};

// -----------------------------------------------------------------------
// HARDCODED DOM
// -----------------------------------------------------------------------

// ! Deprecated variables because are declared more than twice with same values

// const suit = document.createElement('div');
// suit.classList.add('suit');
// suit.innerText = '♥️';

// const name = document.createElement('div');
// name.classList.add('name', 'red');
// name.innerText = '5';

// const card = document.createElement('div');
// card.classList.add('card');

// card.appendChild(name);
// card.appendChild(suit);

// // document.body.appendChild(card);

// const makeCard = (currentPlayerCard) => {
//   const suit = document.createElement('div');
//   suit.classList.add('suit');
//   suit.innerText = currentPlayerCard.suitSymbol;

//   const name = document.createElement('div');
//   name.classList.add('name', currentPlayerCard.colour);
//   name.innerText = currentPlayerCard.displayName;

//   const card = document.createElement('div');
//   card.classList.add('card');

//   card.appendChild(name);
//   card.appendChild(suit);
//   document.body.appendChild(card);
// };

// makeCard();

// -- HARDCODED CARD METADATA --

// const cardInfo = {
//   suitSymbol: '♦️',
//   suit: 'diamond',
//   name: 'queen',
//   displayName: 'Q',
//   colour: 'red',
//   rank: 12,
// };

// HARDCODED FUNCTION FOR CREATING VISUAL OUTPUT OF CARD
// const createCard = (cardInfo) => {
//   const suit = document.createElement('div');
//   suit.classList.add('suit');
//   suit.innerText = cardInfo.suitSymbol;

//   const name = document.createElement('div');
//   name.classList.add(cardInfo.displayName, cardInfo.colour);
//   name.innerText = '5';

//   const card = document.createElement('div');
//   card.classList.add('card');

//   card.appendChild(name);
//   card.appendChild(suit);

//   // document.body.appendChild(card);

//   return card;
// };

// createCard(cardInfo);
