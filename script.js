// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = Math.floor(Math.random() * cards.length);
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
  const suitSymbols = ['♥️', '♦', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayName = cardName;
      const colour = suitIndex <= 1 ? 'red' : 'black';

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
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
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSymbol,
        displayName,
        colour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());
let player1Cards = [];
let player2Cards = [];
const CARDS_PER_PLAYER = 3;
let gameInProgress = true;

let playersTurn = 1; // Player 1 starts first

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  const instructions = document.getElementById('instructions');
  instructions.innerHTML = message;
};

const createCards = (cards, player) => {
  const cardContainer = document.getElementById(`cards-player-${player}`);
  const cardsCopy = [...cards].sort((a, b) => a.rank - b.rank);
  cardsCopy.unshift(cardsCopy.pop());

  cardsCopy.forEach((card, index) => {
    const suit = document.createElement('div');
    suit.classList.add('suit', card.colour);
    suit.innerText = card.suitSymbol;

    const name = document.createElement('div');
    name.classList.add('name', card.colour);
    name.innerText = card.displayName;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (cardsCopy.length > 1) {
      if (index === 0) cardDiv.classList.add('high');
      if (index === 1) cardDiv.classList.add('low');
    }
    cardDiv.appendChild(name);
    cardDiv.appendChild(suit);

    cardContainer.appendChild(cardDiv);
  });
};

const resetGame = () => {
  player1Cards = [];
  player2Cards = [];
  gameInProgress = false;
};

const calculateDifference = (cards) => {
  const sorted = [...cards].sort((a, b) => a.rank - b.rank);
  return sorted[sorted.length - 1].rank - sorted[0].rank;
};

const determineWinner = () => {
  const player1Difference = calculateDifference(player1Cards);
  const player2Difference = calculateDifference(player2Cards);
  let message = `Player 1 has a difference of ${player1Difference}.<br>`;
  message += `Player 2 has a difference of ${player2Difference}.<br>`;

  // Determine and output winner
  if (player1Difference > player2Difference) {
    message += 'player 1 wins!';
  } else if (player1Difference < player2Difference) {
    message += 'player 2 wins!';
  } else {
    message += 'tie!';
  }

  output(message);
  resetGame();
};

const player1Click = () => {
  if (playersTurn === 1) {
    const cardContainer = document.getElementById('cards-player-1');
    const oppCardContainer = document.getElementById('cards-player-2');
    // Pop player 1's card metadata from the deck
    const newCard = deck.pop();
    player1Cards.push(newCard);

    cardContainer.innerHTML = '';
    if (!gameInProgress) {
      oppCardContainer.innerHTML = '';
      gameInProgress = true;
    }

    // Create card element from card metadata
    createCards(player1Cards, 1);

    // Switch to player 2's turn
    playersTurn = 2;
    output('Its player 2 turn. Click to draw a card!');
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const cardContainer = document.getElementById('cards-player-2');
    // Pop player 2's card metadata from the deck
    const newCard = deck.pop();
    player2Cards.push(newCard);

    cardContainer.innerHTML = '';
    // Create card element from card metadata
    createCards(player2Cards, 2);

    // Switch to player 1's turn
    playersTurn = 1;
    if (player1Cards.length === CARDS_PER_PLAYER && player2Cards.length === CARDS_PER_PLAYER) {
      determineWinner();
    } else {
      output('Its player 1 turn. Click to draw a card!');
    }
  }
};

const initGame = () => {
  const gameContainer = document.createElement('div');
  gameContainer.id = 'container';
  document.body.appendChild(gameContainer);

  for (let i = 1; i <= 2; i += 1) {
    const playerContainer = document.createElement('div');
    playerContainer.id = `player-${i}`;

    const cardContainer = document.createElement('div');
    cardContainer.id = `cards-player-${i}`;
    playerContainer.appendChild(cardContainer);

    const playerLabel = document.createElement('p');
    playerLabel.id = `label-player-${i}`;
    // playerLabel.innerText = 'test';
    playerContainer.appendChild(playerLabel);

    const playerButton = document.createElement('button');
    playerButton.id = `button-player-${i}`;
    playerButton.innerText = `Player ${i} Draw`;
    const listenerFn = i === 1 ? player1Click : player2Click;
    playerButton.addEventListener('click', listenerFn);
    playerContainer.appendChild(playerButton);

    gameContainer.appendChild(playerContainer);
  }

  const instructions = document.createElement('p');
  instructions.id = 'instructions';
  instructions.innerText = 'Its player 1 turn. Click to draw a card!';
  gameContainer.appendChild(instructions);
};

initGame();
