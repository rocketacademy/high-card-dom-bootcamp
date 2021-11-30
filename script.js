// Please implement exercise logic here
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
  const suitSymbol = ['♥', '♦', '♣', '♠'];

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
      let currentColor;
      let cardName = `${rankCounter}`;
      let currentDisplayName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        currentDisplayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        currentDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        currentDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        currentDisplayName = 'K';
      }
      if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
        currentColor = 'red';
      } else {
        currentColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        color: currentColor,
        displayName: currentDisplayName,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// globals
let playerTurn = 0;
let canDraw = true;
let player1HandSize = 0;
let player2HandSize = 0;
let player = 1;
let player1RankSuit = [];
let player2RankSuit = [];

const inputContainer = document.createElement('div');
const inputLabel = document.createElement('label');
const inputField = document.createElement('input');
const inputButton = document.createElement('button');
const btnPlayer1 = document.createElement('button');
const btnPlayer2 = document.createElement('button');
const gameInfo = document.createElement('div');
const cardContainer = document.createElement('div');
const player1container = document.createElement('div');
const player2container = document.createElement('div');
const input = document.createElement('input');
let player1Hand = [];
let player2Hand = [];
let player1HandSorted = [];
let player2HandSorted = [];
const player1CardRank = [];
const player2CardRank = [];
let numCards;

const gameInit = () => {
  btnPlayer1.innerText = 'Player 1 Draw';
  btnPlayer2.innerText = 'Player 2 Draw';
  gameInfo.innerText = 'Press player 1 button to begin!';

  document.body.appendChild(gameInfo);
  document.body.appendChild(btnPlayer1);
  document.body.appendChild(btnPlayer2);
  cardContainer.appendChild(player1container);
  cardContainer.appendChild(player2container);

  cardContainer.classList.add('class-container');
  document.body.appendChild(cardContainer);

  btnPlayer1.addEventListener('click', () => player1Click());
  btnPlayer2.addEventListener('click', () => player2Click());

  // input field
  inputLabel.classList.add('input-label');
  inputLabel.innerText = 'Number of cards:';
  inputContainer.appendChild(inputLabel);
  inputField.classList.add('input-field');
  inputContainer.appendChild(inputField);
  inputButton.classList.add('input-button');
  inputButton.innerText = 'Submit';
  inputButton.addEventListener('click', inputButtonClick);
  inputContainer.appendChild(inputButton);
  inputContainer.classList.add('input-container');
  document.body.appendChild(inputContainer);
};

const output = (message) => {
  gameInfo.innerText = message;
};

const inputButtonClick = function () {
  // reset players hands
  player1Hand = [];
  player2Hand = [];
  player1container.innerHTML = '';
  player2container.innerHTML = '';
  numCards = Number(document.querySelector('.input-field').value);
};

const player1Click = function () {
  if (player === 1 && player1Hand.length < numCards) {
    const player1Card = deck.pop();
    // add card object to player1 hand
    player1Hand.push(player1Card);
    player1CardRank.push(player1Card.rank);
    player1HandSorted = [...player1Hand];
    sortDescending(player1HandSorted);
    if (player1HandSorted.length > 1) {
      [player1HandSorted[1], player1HandSorted[player1HandSorted.length - 1]] =
        [player1HandSorted[player1HandSorted.length - 1], player1HandSorted[1]];
    }
    player1container.innerHTML = '';
    for (let i = 0; i < player1HandSorted.length; i++) {
      const cardElement = makeCard(player1HandSorted[i]);
      player1container.appendChild(cardElement);
    }
    player = 2;
  }
};

const player2Click = () => {
  if (player === 2 && player2Hand.length < numCards) {
    setTimeout(function () {
      const player2Card = deck.pop();
      player2Hand.push(player2Card);
      player2CardRank.push(player2Card.rank);
      player2HandSorted = [...player2Hand];
      sortDescending(player2HandSorted);
      if (player2HandSorted.length > 2) {
        [
          player2HandSorted[1],
          player2HandSorted[player2HandSorted.length - 1],
        ] = [
          player2HandSorted[player2HandSorted.length - 1],
          player2HandSorted[1],
        ];
      }
      player2container.innerHTML = '';
      for (let i = 0; i < player2HandSorted.length; i++) {
        const cardElement0 = makeCard(player2HandSorted[i]);
        player2container.appendChild(cardElement0);
      }
      player = 1;
      determineWinner(player1CardRank, player2CardRank);
      playerTurn++;
    }, 0);
  }
};

// sort player cards by rank by descending order
const sortDescending = function (array) {
  array.sort(function (a, b) {
    return b.rank - a.rank;
  });
};

const sortAscending = function (array) {
  array.sort(function (a, b) {
    return a - b;
  });
};

// to create the card
const makeCard = (cardInfo) => {
  const card = document.createElement('div');
  const cardName = document.createElement('div');
  const suit = document.createElement('div');

  card.classList.add('card');
  cardName.classList.add('name', cardInfo.color);
  suit.classList.add('suit', cardInfo.color);

  cardName.innerText = cardInfo.displayName;
  suit.innerText = cardInfo.suitSymbol;

  card.appendChild(suit);
  card.appendChild(cardName);

  return card;
};

const determineWinner = function (player1, player2) {
  if (playerTurn >= 1) {
    let player1Max = Math.max(...player1);
    let player2Max = Math.max(...player2);
    let player1Min = Math.min(...player1);
    let player2Min = Math.min(...player2);
    let player1Diff = player1Max - player1Min;
    let player2Diff = player2Max - player2Min;
    if (player1Diff > player2Diff) {
      output(
        `Player 1 wins with: ${player1Diff} against player 2: ${player2Diff}.`
      );
    } else if (player2Diff > player1Diff) {
      output(
        `Player 2 wins with: ${player2Diff} against player 1: ${player1Diff}.`
      );
    } else {
      output(`It is a draw.`);
    }
  }
  if (playerTurn === 0) {
    if (player1 > player2) {
      output(`Player 1 wins with: ${player1} against player 2: ${player2}`);
    } else if (player2 > player1) {
      output(`Player 2 wins with: ${player2} against player 1: ${player1}`);
    } else {
      output(`It is a draw.`);
    }
  }
};
gameInit();
