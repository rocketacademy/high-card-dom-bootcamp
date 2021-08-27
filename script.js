let cardContainer;
let cardContainer2;
let numOfCardsDraw = 5;
let player1Score = 0;
let player2Score = 0;

let player1CardArray = [];
let player2CardArray = [];
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

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
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

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayCardName = cardName;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayCardName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayCardName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayCardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayCardName = 'K';
      }
      let cardSymbol = '';
      if (currentSuit == 'diamonds') {
        cardSymbol = '♦️';
      } else if (currentSuit == 'hearts') {
        cardSymbol = '♥️';
      } else if (currentSuit == 'clubs') {
        cardSymbol = '♣️';
      } else if (currentSuit == 'spades') {
        cardSymbol = '♠️';
      }
      // Create a new card with the current name, suit, and rank

      cardInfo = {
        suitSymbol: cardSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: displayCardName,
        colour: 'red',
        rank: rankCounter,

      };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};
console.log(makeDeck());
let deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;

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

const player1Click = () => {
  cardContainer.classList.add('card-container')
  cardContainer.innerText = '';
  cardContainer2.innerText = '';
  player1CardArray = [];
  player2CardArray = [];

  if (playersTurn === 1) {
    for (let i = 0; i < numOfCardsDraw; i += 1) {
      // Pop player 1's card metadata from the deck
      player1Card = deck.pop();

      player1CardArray.push(player1Card);
    }
  }
  for (let i = 0; i < numOfCardsDraw; i += 1) {
    player1CardArray.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
    // Create card element from card metadata
    const cardElement = createCard(player1CardArray[player1CardArray.length - (i + 1)]);
    // Empty cardContainer in case this is not the 1st round of gameplay
    // cardContainer.innerHTML = '';
    // Append the card element to the card container

    cardContainer.appendChild(cardElement);
  }

  // Switch to player 2's turn
  playersTurn = 2;
};

const comparingCardsValue = (cards) => {
  const cardsRank = cards.map((x) => x.rank);
  const diffValue = Math.max(...cardsRank) - Math.min(...cardsRank);
  return diffValue;
};

const player2Click = () => {
  cardContainer2.classList.add('card-container')
  cardContainer2.innerText = '';

  if (playersTurn === 2) {
    for (let i = 0; i < numOfCardsDraw; i += 1) {
      // Pop player 1's card metadata from the deck
      const player2Card = deck.pop();

      player2CardArray.push(player2Card);
    }
  }
  for (let i = 0; i < numOfCardsDraw; i += 1) {
    player2CardArray.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
    // Create card element from card metadata
    const cardElement = createCard(player2CardArray[player2CardArray.length - (i + 1)]);
    // Empty cardContainer in case this is not the 1st round of gameplay
    // cardContainer.innerHTML = '';
    // Append the card element to the card container

    cardContainer2.appendChild(cardElement);
  }
  let message = '';
  const player1DiffValue = comparingCardsValue(player1CardArray);
  console.log(`player 1 diff value :${player1DiffValue}`);
  const player2DiffValue = comparingCardsValue(player2CardArray);
  console.log(`player 2 diff value :${player2DiffValue}`);

  if (player1DiffValue < player2DiffValue) {
    message = ' player 2 win';
    player2Score += 1;
  } else if (player1DiffValue == player2DiffValue) {
    message = ' draw ';
  }
  else {
    message = ' player 1 win';
    player1Score += 1;
  }
  if (deck.length < numOfCardsDraw * 2) {
    message = ` GAME END, Player 1 won ${player1Score} and player 2 won ${player2Score} . \n cards will be reshuffle `;
    deck = shuffleCards(makeDeck());
    numOfCardsDraw = 5;
  }
  // Switch to player 1's turn
  playersTurn = 1;
  output(message);
  // Determine and output winner
};

const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  const inputNumCards = document.createElement('input');
  inputNumCards.placeholder = ' key in number of cards per playerhand';
  inputNumCards.size = '50';

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  inputNumCards.addEventListener('keyup', () => {
    numOfCardsDraw = inputNumCards.value;
  });

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container');
  document.body.appendChild(cardContainer2);

  document.body.appendChild(inputNumCards);
};
initGame();
