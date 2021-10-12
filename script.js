// --HELPER FUNCTIONS--
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

      let symbol = '';
      if (currentSuit === 'hearts') {
        symbol = '♥️';
      } else if (currentSuit === 'diamonds') {
        symbol = '♦️';
      } else if (currentSuit === 'clubs') {
        symbol = '♣';
      } else if (currentSuit === 'spades') {
        symbol = '♠';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: cardName,
        colour: 'black',
        suitSymbol: symbol,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Create game info div as global value
const gameInfo = document.createElement('div');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// --GLOBAL SETUP--
const deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;

// create two buttons
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

// Create card container
let cardContainer1;
let cardContainer2;

// Create a player deck array
let player1Array = [];
let player2Array = [];

let gameInProgress = false;

// --PLAYER ACTION CALLBACKS--

// create a card with css styling

const createCard = (cardInfo) => {
  const cname = document.createElement('div');
  cname.classList.add(cardInfo.displayName, cardInfo.colour);
  cname.innerText = cardInfo.name;

  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(cname);
  card.appendChild(suit);

  return card;
};

// Function: Determine Winner
const determineWinner = () => {
  console.log('determineWinner');
  const player1Rank = [];
  const player2Rank = [];
  for (let i = 0; i < player1Array.length; i += 1) {
    player1Rank.push(player1Array[i].rank);
    player2Rank.push(player2Array[i].rank);
  }
  const player1Diff = Math.max(...player1Rank) - Math.min(...player1Rank);
  const player2Diff = Math.max(...player2Rank) - Math.min(...player2Rank);
  if (player1Diff > player2Diff) {
    output(`Player 1 win by ${player1Diff - player2Diff}`);
  } else if (player2Diff > player1Diff) {
    output(`Player 2 win by ${player2Diff - player1Diff}`);
  } else {
    output('Draw!');
  }
};

// Callback: when player 1 clicks, add a card to his deck.
const player1Click = () => {
  if (playersTurn === 1) {
    if (gameInProgress === false) {
      gameInProgress = true;
      cardContainer1.innerHTML = '';
      cardContainer2.innerHTML = '';
    }
    output("It's player 2's turn!");
    // Adding setTimeout() function just for practice
    setTimeout(() => {
      player1Card = deck.pop();
      player1Array.push(player1Card);
      const cardElement = createCard(player1Card);
      cardContainer1.appendChild(cardElement);
    }, 1000);

    playersTurn = 2;
    player1Button.disabled = true;
    player2Button.disabled = false;
  }
};

// Callback: when player 2 clicks, add a card to his deck. Compare ranks and output the winner.
const player2Click = () => {
  if (playersTurn === 2) {
    console.log('playerturn = 2');
    const player2Card = deck.pop();
    player2Array.push(player2Card);

    const cardElement = createCard(player2Card);
    cardContainer2.appendChild(cardElement);

    playersTurn = 1;
    player1Button.disabled = false;
    player2Button.disabled = true;
  }
  if (player2Array.length < 3) {
    output("It's player 1's turn!");
  } else {
    console.log('detWinner');
    determineWinner();
    gameInProgress = false;
    player1Array = [];
    player2Array = [];
  }
};

// --GAME INITIALIZATION--

// Initialize button functionality
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
player1Button.addEventListener('click', player1Click);

// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
player2Button.addEventListener('click', player2Click);

// fill game info div with starting instructions
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// initialize cardContainer as a div
cardContainer1 = document.createElement('div');
cardContainer1.classList.add('card-container');
document.body.appendChild(cardContainer1);

cardContainer2 = document.createElement('div');
cardContainer2.classList.add('card-container');
document.body.appendChild(cardContainer2);
