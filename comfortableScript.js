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
gameInfo.classList.add('message-output');
const output = (message) => {
  gameInfo.innerHTML = message;
};

const instructions = document.createElement('div');
instructions.classList.add('fixed-output');
instructions.innerHTML = 'HIGH CARD WITH A TWIST! <br><br> How to play <br> 1. Each player draws two cards. <br> 2. The player with the greatest difference between the two cards win!';
document.body.appendChild(instructions);

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
let player1Card1;
let player1Card2;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

// creating two main card containers to contain title and cards
let cardContainer1;
let cardContainer2;

// creating an inner container to wrap just the cards
let innerCardContainer1;
let innerCardContainer2;

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== PLAYER ACTION CALLBACK ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================

const player1Click = () => {
  if (playersTurn === 1) {
    // Empty cardContainer in case this is not the 1st round of gameplay
    innerCardContainer1.innerHTML = '';
    innerCardContainer2.innerHTML = '';
    player1Card1 = deck.pop();
    player1Card2 = deck.pop();

    // to ensure that the higher ranked card is shown first
    if (player1Card1.rank > player1Card2.rank) {
      const cardElement1 = createCard(player1Card1);
      const cardElement2 = createCard(player1Card2);
      innerCardContainer1.appendChild(cardElement1);
      innerCardContainer1.appendChild(cardElement2);
    } else if (player1Card1.rank < player1Card2.rank) {
      const cardElement1 = createCard(player1Card2);
      const cardElement2 = createCard(player1Card1);
      innerCardContainer1.appendChild(cardElement1);
      innerCardContainer1.appendChild(cardElement2);
    }

    output("It's player 2's turn. <br> Click to draw two cards!");
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card1 = deck.pop();
    const player2Card2 = deck.pop();

    // to ensure that the higher ranked card is shown first
    if (player2Card1.rank > player2Card2.rank) {
      const cardElement1 = createCard(player2Card1);
      const cardElement2 = createCard(player2Card2);
      innerCardContainer2.appendChild(cardElement1);
      innerCardContainer2.appendChild(cardElement2);
    } else if (player2Card1.rank < player2Card2.rank) {
      const cardElement1 = createCard(player2Card2);
      const cardElement2 = createCard(player2Card1);
      innerCardContainer2.appendChild(cardElement1);
      innerCardContainer2.appendChild(cardElement2);
    }
    playersTurn = 1;
    console.log('running here too');

    const player1Difference = player1Card1.rank - player1Card2.rank;
    const player2Difference = player2Card1.rank - player2Card2.rank;

    if (Math.abs(player1Difference) > Math.abs(player2Difference)) {
      output('Player 1 wins!');
    } else if (Math.abs(player1Difference) < Math.abs(player2Difference)) {
      output('Player 2 wins!');
    } else {
      output('Awww... a tie? Try again!');
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

  // player1: main container to wrap inner container of cards and title "player 1 cards"
  // ===============================================================================================
  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container1');
  const message1 = document.createElement('h2');
  message1.textContent = 'Player 1 cards';

  // have an inner container to house the cards
  innerCardContainer1 = document.createElement('div');
  innerCardContainer1.classList.add('inner-container1');

  // append them all into the html
  cardContainer1.appendChild(message1);
  cardContainer1.appendChild(innerCardContainer1);
  document.body.appendChild(cardContainer1);

  // player2: main container to wrap inner container of cards and title "player 2 cards"
  // ===============================================================================================
  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container2');
  const message2 = document.createElement('h2');
  message2.textContent = 'Player 2 cards';

  // have an inner container to house the cards
  innerCardContainer2 = document.createElement('div');
  innerCardContainer2.classList.add('inner-container1');

  // append them all into the html
  cardContainer2.appendChild(message2);
  cardContainer2.appendChild(innerCardContainer2);
  document.body.appendChild(cardContainer2);

  // initialize button functionality
  // ===============================================================================================
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  // ===============================================================================================
  gameInfo.innerHTML = "Its player 1's turn. <br> Click to draw two cards!";
  document.body.appendChild(gameInfo);
};

initGame();
// rmb this if not the game wont even appear on the browser lolol
