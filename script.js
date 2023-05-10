// Please implement exercise logic here
// ******* Helper Functions ****** //

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
  const suitSymbol = ['♥️', '♦️', '♣︎', '♠️']

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbol[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      let cardColour = 'black';
      if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
        cardColour = 'red';
      };

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        colour: cardColour,
        suitSymbol: currentSuitSymbol
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// ******* Variables Used Throughout Deck ****** //

const deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;

// Create a card container to be used later to put the 
let cardContainer;

// create two buttons
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.name[0].toUpperCase();

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// set timeout
let canClick = true;



// ******* Player Action CallBacks ****** //

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      player1Card = deck.pop();
      // Create card element from card metadata
      const cardElement1= createCard(player1Card);
      // Clear the container to reset game if not on first try
      cardContainer.innerText = '';
      cardContainer.appendChild(cardElement1);
      console.log("Player one card is", player1Card);
      output('Its player 2 turn. Click to draw a card!');
      playersTurn = 2;
      canClick = true;
    }, 1000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      const player2Card = deck.pop();
      // Create card element from card metadata
      const cardElement2= createCard(player2Card);
      cardContainer.appendChild(cardElement2);

      playersTurn = 1;
      canClick = true;
      console.log("Player two card is", player2Card)
      output('Its player 2 turn. Click to draw a card!');
      if (player1Card.rank > player2Card.rank) {
        output('Player 1 wins. Player 1 click to draw a card.');
      } else if (player1Card.rank < player2Card.rank) {
        output('Player 2 wins. Player 1 click to draw a card.');
      } else {
        output('Tie');
      }
      }, 1000);
  }
};

// ******* Initialize Game ****** // 

const initGame = () => {
  //create card container
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  document.body.appendChild(cardContainer);
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

initGame()