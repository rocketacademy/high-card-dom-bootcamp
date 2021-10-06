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

const deck = shuffleCards(makeDeck());
let player1Cards = [];
let player2Cards = [];
let cardsPerPlayer = 0;
let gameInProgress = false;

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
  cardsPerPlayer = 0;
  gameInProgress = false;
  document.getElementById('button-player-1').disabled = false;
  document.getElementById('button-player-2').disabled = false;
};

const calculateDifference = (cards) => {
  const sorted = [...cards].sort((a, b) => a.rank - b.rank);
  return sorted[sorted.length - 1].rank - sorted[0].rank;
};

const determineWinner = () => {
  const player1Difference = calculateDifference(player1Cards);
  const player2Difference = calculateDifference(player2Cards);
  let message = `Player 1 has a greatest difference of ${player1Difference}.<br>`;
  message += `Player 2 has a greatest difference of ${player2Difference}.<br>`;

  // Determine and output winner
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

const playerClick = (player) => {
  if (cardsPerPlayer === 0) cardsPerPlayer = Number(document.getElementById('num-cards-input').value);

  const oppPlayer = player === 1 ? 2 : 1;
  const playerCardArr = player === 1 ? player1Cards : player2Cards;

  const cardContainer = document.getElementById(`cards-player-${player}`);
  const oppCardContainer = document.getElementById(`cards-player-${oppPlayer}`);

  const playerButton = document.getElementById(`button-player-${player}`);
  // Pop players card metadata from the deck
  const newCard = deck.pop();
  playerCardArr.push(newCard);

  output(`Player ${player} drew the ${newCard.name} of ${newCard.suit}.`);

  cardContainer.innerHTML = '';
  if (!gameInProgress) {
    oppCardContainer.innerHTML = '';
    gameInProgress = true;
  }

  // Create card element from card metadata
  createCards(playerCardArr, player);

  if (playerCardArr.length === cardsPerPlayer) playerButton.disabled = true;
  if (player1Cards.length === cardsPerPlayer && player2Cards.length === cardsPerPlayer) {
    determineWinner();
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

    const playerButton = document.createElement('button');
    playerButton.id = `button-player-${i}`;
    playerButton.innerText = `Player ${i} Draw`;
    playerButton.addEventListener('click', () => { playerClick(i); });
    playerContainer.appendChild(playerButton);

    gameContainer.appendChild(playerContainer);
  }

  const outputDiv = document.createElement('div');
  outputDiv.classList.add('output');

  const numCardsInput = document.createElement('input');
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

  const instructions = document.createElement('p');
  instructions.id = 'instructions';
  instructions.innerHTML = 'Input the number of cards to draw.<br>Then either player can hit Draw to start the game!';
  outputDiv.appendChild(instructions);

  document.body.appendChild(outputDiv);
};

initGame();
