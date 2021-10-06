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
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
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
        cardName = 'Ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'Jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'Queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'King';
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

let deck = shuffleCards(makeDeck());
let player1Cards = [];
let player2Cards = [];
let cardsPerPlayer = 0;
let gameInProgress = false;

const numCardsInput = document.createElement('input');
const gameOutput = document.createElement('p');

// Helper function to output message
const output = (message) => {
  gameOutput.innerHTML = message;
};

// Helper function to create the cards UI given an array of cards
const createCards = (cards, player) => {
  const cardContainer = document.getElementById(`cards-player-${player}`);
  cardContainer.innerHTML = '';

  // Sort player's cards in ascending order based on rank
  // Then get the last (highest) card and put it in front
  const cardsCopy = [...cards].sort((a, b) => a.rank - b.rank);
  cardsCopy.unshift(cardsCopy.pop());

  // Creating a card UI for each element in the cards array
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
      // Special styling for the first (highest) and second (lowest) card
      if (index === 0) cardDiv.classList.add('high');
      if (index === 1) cardDiv.classList.add('low');
    }
    cardDiv.appendChild(name);
    cardDiv.appendChild(suit);

    cardContainer.appendChild(cardDiv);
  });
};

// Helper function to reset game
const resetGame = () => {
  deck = shuffleCards(makeDeck());
  player1Cards = [];
  player2Cards = [];
  cardsPerPlayer = 0;
  gameInProgress = false;
  document.getElementById('button-player-1').disabled = false;
  document.getElementById('button-player-2').disabled = false;
  numCardsInput.disabled = false;
};

// Calculate difference by sorting the cards in ascending order
// And subtract rank of first card from rank of last card
const calculateDifference = (cards) => {
  const sorted = [...cards].sort((a, b) => a.rank - b.rank);
  return sorted[sorted.length - 1].rank - sorted[0].rank;
};

// Determine winner by calculating each player's greatest difference
const determineWinner = () => {
  const player1Difference = calculateDifference(player1Cards);
  const player2Difference = calculateDifference(player2Cards);
  let message = `Player 1 has a greatest difference of ${player1Difference}.<br>`;
  message += `Player 2 has a greatest difference of ${player2Difference}.<br>`;

  if (player1Difference > player2Difference) {
    message += 'Player 1 wins!';
  } else if (player1Difference < player2Difference) {
    message += 'Player 2 wins!';
  } else {
    message += "It's a tie!";
  }
  message += '<br><br>Start a new game by choosing the number of cards and hitting Draw again!';

  output(message);
  resetGame();
};

// This function gets called when either Player 1 or 2 clicks Draw
const playerClick = (player) => {
  const oppPlayer = player === 1 ? 2 : 1;
  const oppCardContainer = document.getElementById(`cards-player-${oppPlayer}`);

  if (!gameInProgress) {
    // If it is a new game, then empty the opponent's card container
    // And set the gameInProgress flag and the cards per player value
    oppCardContainer.innerHTML = '';
    gameInProgress = true;
    cardsPerPlayer = Number(numCardsInput.value);
    numCardsInput.disabled = true;
  }

  const playerCardArr = player === 1 ? player1Cards : player2Cards;
  const playerButton = document.getElementById(`button-player-${player}`);

  const newCard = deck.pop();
  playerCardArr.push(newCard);

  output(`Player ${player} drew the ${newCard.name} of ${newCard.suit}.`);

  // Create card UIs for the current player
  createCards(playerCardArr, player);

  if (playerCardArr.length === cardsPerPlayer) {
    // Current player done drawing
    playerButton.disabled = true;
  }
  if (player1Cards.length === cardsPerPlayer && player2Cards.length === cardsPerPlayer) {
    // Both players done drawing
    determineWinner();
  }
};

// Functions to generate all the HTML elements necessary
const initGameArea = () => {
  const gameContainer = document.createElement('div');
  gameContainer.id = 'container';
  document.body.appendChild(gameContainer);

  for (let i = 1; i <= 2; i += 1) {
    const playerContainer = document.createElement('div');
    playerContainer.id = `player-${i}`;

    const cardContainer = document.createElement('div');
    cardContainer.id = `cards-player-${i}`;
    playerContainer.appendChild(cardContainer);

    const playerButton = document.createElement('button');
    playerButton.id = `button-player-${i}`;
    playerButton.innerText = `Player ${i} Draw`;
    playerButton.addEventListener('click', () => { playerClick(i); });
    playerContainer.appendChild(playerButton);

    gameContainer.appendChild(playerContainer);
  }
};

const initOutputArea = () => {
  const outputDiv = document.createElement('div');
  outputDiv.classList.add('output');

  numCardsInput.id = 'num-cards-input';
  numCardsInput.type = 'number';
  numCardsInput.min = '2';
  numCardsInput.max = '5';
  numCardsInput.value = '2';
  numCardsInput.addEventListener('input', () => {
    const player1Button = document.getElementById('button-player-1');
    const player2Button = document.getElementById('button-player-2');
    if (numCardsInput.value >= 2 && numCardsInput.value <= 5) {
      player1Button.disabled = false;
      player2Button.disabled = false;
    } else {
      player1Button.disabled = true;
      player2Button.disabled = true;
    }
  });
  outputDiv.appendChild(numCardsInput);

  gameOutput.id = 'gameOutput';
  gameOutput.innerHTML = 'Input the number of cards to draw.<br>Then either player can hit Draw to start the game!';
  outputDiv.appendChild(gameOutput);

  document.body.appendChild(outputDiv);
};

initGameArea();
initOutputArea();
