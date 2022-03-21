// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== HELPER FUNCTIONS ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================

const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
// ================================================================================================
// ================================================================================================
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

// creating the deck
// ================================================================================================
// ================================================================================================
const createDeck = () => {
  // initialise an empty array of cards
  const deckTwo = [];

  // initialise an array of suits
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  // creating 13 cards for each suit
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // store current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];
    let currentSuitColor = '';

    // set suit color based on index
    if (suitIndex === 0 || suitIndex === 1) {
      currentSuitColor = 'red';
    } else if (suitIndex === 2 || suitIndex === 3) {
      currentSuitColor = 'black';
    }

    for (let rankCounter = 1; rankCounter < 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: currentSymbol,
        display: displayName,
        colour: currentSuitColor,
      };

      // Add the new card to the deck
      deckTwo.push(cardInfo);
    }
  }

  return deckTwo;
};

// creating cardInfo - the visual aspect of it
// ================================================================================================
// ================================================================================================
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.display;

  // this card container is a div element wrapping each card's info into a container
  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);
  document.body.appendChild(card);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
// ================================================================================================
// ================================================================================================
const gameInfo = document.createElement('div');
const output = (message) => {
  gameInfo.innerText = message;
};

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== GLOBAL VARIABLES ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================

const deck = shuffleCards(createDeck());
// means = use the shuffleCards func to shuffle cards frm the cards created in the createDeck func
// and store it in a constant called 'deck'

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

let cardContainer;
// cardContainer contains the div element to wrap both cards in a container
// so that JS can add these cards programatically

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== PLAYER ACTION CALLBACK ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================

const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    const cardElement = createCard(player1Card);
    cardContainer.innerHTML = '';
    cardContainer.appendChild(cardElement);
    playersTurn = 2;
    output('Its player 2 turn. Click to draw a card!');
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    const cardElement = createCard(player2Card);
    cardContainer.appendChild(cardElement);
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
};

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== GAME INITIALISATION ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================

const initGame = () => {
  console.log('running');

  // create container for card element generation
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

initGame();
// rmb this if not the game wont even appear on the browser lolol
