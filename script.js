// Please implement exercise logic here
// High/Low Card
// players can draw multiple cards each
// the winner is the player who has the greatest difference beween the highest
// and lowest cards in hand
// player's cards are displayed in a row
// global variables
let playersTurn = 1; // matches with starting instructions
let player1Card;
// create the array to store the player's hands
const player1hand = [];
const player2hand = [];

const player1Button = document.createElement('button');
// player 1 variables
const player1div = document.createElement('div');
player1div.classList.add('player1container');
document.body.appendChild(player1div);

let player1highcard = 0;
let player1lowcard = 0;
let player1difference = 0;

const player2Button = document.createElement('button');
// player 2 variables
const player2div = document.createElement('div');
player2div.classList.add('player2container');
document.body.appendChild(player2div);
let player2highcard = 0;
let player2lowcard = 0;
let player2difference = 0;

const gameInfo = document.createElement('div');

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// display message using output
const output = (message) => {
  gameInfo.innerText = message;
};

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
  const suitShapes = ['♥', '♦', '♣', '♠'];
  let cardColor = '';
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

      if (currentSuit === 'diamonds') {
        symbol = '♦';
        cardColor = 'red';
      } else if (currentSuit === 'clubs') {
        symbol = '♣';
        cardColor = 'black';
      } else if (currentSuit === 'hearts') {
        symbol = '♥';
        cardColor = 'red';
      } else if (currentSuit === 'spades') {
        symbol = '♠';
        cardColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
        symbol,
      };
      // console.log(card);

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
// function to store the metainfo of the drawn card
const createCard = (cardInfo) => {
  console.log('card info:', cardInfo);
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  if (cardInfo.color === 'red') {
    card.classList.add('red');
  }

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const deck = shuffleCards(makeDeck());

// Player Action Callbacks
const player1Click = () => {
  if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    
    player1Card = deck.pop();
    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // push the card player has drawn into the player1hand array
    player1hand.push(player1Card);
    // Append the card element to the card container
    setTimeout(() => {
    player1div.appendChild(cardElement);

    if (player1highcard === 0 && player1lowcard === 0) {
      player1highcard = player1Card;
      player1lowcard = player1Card;
    }

    if (player1Card.rank > player1highcard.rank) {
      player1highcard = player1Card;
    }
    // compare with the global variable player1lowcard to get the lowest card
    if (player1Card.rank < player1lowcard.rank) {
      player1lowcard = player1Card;
    }
    console.log(player1highcard);
    console.log(player1lowcard);

    // find the difference between the high card and low card
    player1difference = player1highcard.rank - player1lowcard.rank;
    console.log(player1difference);
    playersTurn = 2;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    // push the card player has drawn into the player1hand array
    player2hand.push(player2Card);
    // Create card element from card metadata
    const cardElement = createCard(player2Card);
    // Append card element to card container
    setTimeout(() => {
    player2div.appendChild(cardElement);

    if (player2highcard === 0 && player2lowcard === 0) {
      player2highcard = player2Card;
      player2lowcard = player2Card;
    }

    if (player2Card.rank > player2highcard.rank) {
      player2highcard = player2Card;
    }
    // compare with the global variable player1lowcard to get the lowest card
    if (player2Card.rank < player2lowcard.rank) {
      player2lowcard = player2Card;
    }
    // find the difference between the high card and low card
    player2difference = player2highcard.rank - player2lowcard.rank;
    console.log(player2difference);

    // Switch to player 1's turn
    playersTurn = 1;

    // Determine and output winner
    if (player1difference > player2difference) {
      output('player 1 wins');
    } else if (player2difference > player1difference) {
      output('player 2 wins');
    } else {
      output('tie');
    }
    }, 2000);
  }
};

const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card! The player with the highest difference in rank wins!';
  document.body.appendChild(gameInfo);
};

initGame();