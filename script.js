// Please implement exercise logic here

// ==================== HELPER FUNCTIONS ====================
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
    let symbol = '';
    let color = '';

    if (currentSuit === 'hearts') {
      symbol = '♥️';
      color = 'red';
    } else if (currentSuit === 'diamonds') {
      symbol = '♦️';
      color = 'red';
    } else if (currentSuit === 'clubs') {
      symbol = '♣️';
      color = 'black';
    } else if (currentSuit === 'spades') {
      symbol = '♠️';
      color = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortForm = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortForm = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortForm = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortForm = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortForm = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: shortForm,
        suitSymbol: symbol,
        suitColour: color,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.suitColour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// identify highest ranking card in hand
const getMax = (array) => {
  let maxRank = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].rank > maxRank) {
      maxRank = array[i].rank;
    }
  } return maxRank;
};

// identify lowest ranking card in hand
const getMin = (array) => {
  let minRank = 100;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].rank < minRank) {
      minRank = array[i].rank;
    }
  } return minRank;
};

// calculate difference between highest and lowest ranking card in hand
const getDiff = (array) => {
  const diffValue = getMax(array) - getMin(array);
  return diffValue;
};

// const arrange = (array) => {
//   highestCard = getMax(array);
//   highCardIndex = array.indexOf(highestCard);
//   lowestCard = getMin(array);
//   lowCardIndex = array.indexOf(lowestCard);
// };

// ==================== GLOBAL SETUP ====================
const deck = shuffleCards(makeDeck());

// const playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;

const gameInfo = document.createElement('div');

const player1Button = document.createElement('button');
player1Button.classList.add('button');

const player2Button = document.createElement('button');
player2Button.classList.add('button');

const playAgainButton = document.createElement('button');
playAgainButton.classList.add('button');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

let cardContainer1;
let cardContainer2;
let buttonDiv;
let player1Hand = [];
let player2Hand = [];
let inputContainer;
let inputField;
let playButton;
let gameMode = 'default';
let input;
let lobbyInfo;
let playAgainDiv;
let canClick = true;

// const helperInfo = document.createElement('div');
// helperInfo.classList.add('wrapper');

const playerBoard = document.createElement('div');
document.body.appendChild(playerBoard);

// ==================== PLAYER ACTION CALLBACKS ====================
const player1Click = () => {
  // Switch to player 1's turn
  // playersTurn = 1;

  if (gameMode === 'gameplay' && canClick === true) {
    canClick = false;

    if (player1Hand.length === input - 1 && player2Hand.length === input) {
      output('Drawing card and analyzing game result...');
    }
    else if (player1Hand.length < input) {
      output('Drawing card...'); }
    else { output(`Each player can draw up to ${input} cards at any point.<br>Results will be shown once all players have drawn their cards.<br>The Player with the higher difference between their highest and lowest cards wins.`); }

    setTimeout(() => {
      if (player1Hand.length === input - 1 && player2Hand.length === input) {
        console.log('this ran');
        player1Card = deck.pop();
        player1Hand.push(player1Card);
        cardContainer1.innerHTML = '';
        player1Hand.sort((a, b) => a.rank - b.rank);
        player1Hand.unshift(player1Hand.pop());

        // Create card element from card metadata
        for (let i = 0; i < player1Hand.length; i += 1) {
          let cardElement = createCard(player1Hand[i]);
          cardElement = cardContainer1.appendChild(cardElement);
        }
        gameMode = 'default';

        // Determine and output winner
        if (getDiff(player1Hand) > getDiff(player2Hand)) {
          output('Player 1 wins!<br>Click \'Play Again\' to begin new round!');
        } else if (getDiff(player1Hand) < getDiff(player2Hand)) {
          output('Player 2 wins!<br>Click \'Play Again\' to begin new round!');
        } else {
          output('Its a tie!<br>Click \'Play Again\' to begin new round!');
        } console.log(getDiff(player1Hand), getDiff(player2Hand));
      } else if (player1Hand.length < input) { // Pop player 1's card metadata from the deck
        console.log('this also ran');

        player1Card = deck.pop();
        player1Hand.push(player1Card);
        cardContainer1.innerHTML = '';
        player1Hand.sort((a, b) => a.rank - b.rank);
        player1Hand.unshift(player1Hand.pop());

        // Create card element from card metadata
        for (let i = 0; i < player1Hand.length; i += 1) {
          let cardElement = createCard(player1Hand[i]);
          cardElement = cardContainer1.appendChild(cardElement);
        }
        output(`Each player can draw up to ${input} cards at any point.<br>Results will be shown once all players have drawn their cards.<br>The Player with the higher difference between their highest and lowest cards wins.`);
      } canClick = true; }, 1000); } };

// createCard(player1Card);
// // Empty cardContainer in case this is not the 1st round of gameplay
// cardContainer1.innerHTML = '';
// Append the card element to the card container
// cardContainer1.appendChild(cardElement);

const player2Click = () => {
  // // Switch to player 2's turn
  // playersTurn = 2;
  // output('It\'s player 2\'s turn.<br>Click again to draw a card!');

  if (gameMode === 'gameplay' && canClick === true) {
    canClick = false;

    if (player1Hand.length === input && player2Hand.length === input - 1) {
      output('Drawing card and analyzing game result...');
    }
    else if (player2Hand.length < input) {
      output('Drawing card...'); }
    else { output(`Each player can draw up to ${input} cards at any point.<br>Results will be shown once all players have drawn their cards.<br>The Player with the higher difference between their highest and lowest cards wins.`); }

    setTimeout(() => {
      if (player1Hand.length === input && player2Hand.length === input - 1) {
        player2Card = deck.pop();
        player2Hand.push(player2Card);
        cardContainer2.innerHTML = '';
        player2Hand.sort((a, b) => a.rank - b.rank);
        console.log(player1Hand);
        player2Hand.unshift(player2Hand.pop());

        // Create card element from card metadata
        for (let i = 0; i < player2Hand.length; i += 1) {
          let cardElement = createCard(player2Hand[i]);
          cardElement = cardContainer2.appendChild(cardElement);
        }
        gameMode = 'default';

        // Determine and output winner
        if (getDiff(player1Hand) > getDiff(player2Hand)) {
          output('Player 1 wins!<br>Click \'Play Again\' to begin new round!');
        } else if (getDiff(player1Hand) < getDiff(player2Hand)) {
          output('Player 2 wins!<br>Click \'Play Again\' to begin new round!');
        } else {
          output('Its a tie!<br>Click \'Play Again\' to begin new round!');
        } console.log(getDiff(player1Hand), getDiff(player2Hand));
      }
      else if (player2Hand.length < input) { // Pop player 2's card metadata from the deck
        player2Card = deck.pop();
        player2Hand.push(player2Card);
        cardContainer2.innerHTML = '';
        player2Hand.sort((a, b) => a.rank - b.rank);
        console.log(player1Hand);
        player2Hand.unshift(player2Hand.pop());

        // Create card element from card metadata
        for (let i = 0; i < player2Hand.length; i += 1) {
          let cardElement = createCard(player2Hand[i]);
          cardElement = cardContainer2.appendChild(cardElement);
        }
        output(`Each player can draw up to ${input} cards at any point.<br>Results will be shown once all players have drawn their cards.<br>The Player with the higher difference between their highest and lowest cards wins.`);
      } canClick = true; }, 1000); }
};

// ==================== GAME COVER ====================

const gameLobby = () => {
  inputContainer = document.createElement('div');
  inputContainer.classList.add('wrapper');
  playerBoard.appendChild(inputContainer);

  lobbyInfo = document.createElement('div');
  lobbyInfo.innerHTML = 'Welcome to High Card Game.<br>Enter number of cards to be drawn for this round.';
  lobbyInfo.classList.add('info');
  inputContainer.appendChild(lobbyInfo);

  inputField = document.createElement('input');
  inputField.classList.add('input');
  input = inputField.innerText;
  inputContainer.appendChild(inputField);

  playButton = document.createElement('button');
  playButton.innerText = 'Play';
  playButton.classList.add('button');
  inputContainer.appendChild(playButton);

  playButton.addEventListener('click', playButtonClick);
};

// ==================== GAME INITIALIZATION ====================
const initGame = () => {
  // fill game info div with starting instructions
  gameInfo.innerHTML = `Each player can draw up to ${input} cards at any point.<br>Results will be shown once all players have drawn their cards.<br>The Player with the higher difference between their highest and lowest cards wins.`;
  gameInfo.classList.add('info');
  playerBoard.appendChild(gameInfo);

  // Initialise card container 1
  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container', 'wrapper');
  playerBoard.appendChild(cardContainer1);

  // Initialise card container 2
  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container', 'wrapper');
  playerBoard.appendChild(cardContainer2);

  // Initialise button container
  buttonDiv = document.createElement('div');
  buttonDiv.classList.add('wrapper');
  playerBoard.appendChild(buttonDiv);

  // initialize button functionality
  player1Button.innerText = 'Player 1: Draw';
  buttonDiv.appendChild(player1Button);

  player2Button.innerText = 'Player 2: Draw';
  buttonDiv.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // initialise play again container
  playAgainDiv = document.createElement('div');
  playAgainDiv.classList.add('wrapper');
  playerBoard.appendChild(playAgainDiv);

  // initialise play again button
  playAgainButton.innerText = 'Play Again';
  playAgainDiv.appendChild(playAgainButton);

  playAgainButton.addEventListener('click', () => {
    if (player1Hand.length === input && player2Hand.length === input) {
      playerBoard.innerHTML = '';
      player1Hand = [];
      player2Hand = [];
      gameLobby(); } });
};

const playButtonClick = () => {
  input = Number(inputField.value);
  lobbyInfo.innerHTML = 'Please enter a number more than 1 to begin.';
  if (input > 1) {
    inputContainer.innerHTML = '';
    initGame();
    gameMode = 'gameplay'; }
};

if (gameMode === 'default') {
  gameLobby();
} else {
  initGame(); }
