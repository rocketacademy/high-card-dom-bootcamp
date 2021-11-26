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
};

// globals
let playerTurn = 0;
let canDraw = true;
let player1HandSize = 0;
let player2HandSize = 0;
let player = 1;

const btnPlayer1 = document.createElement('button');
const btnPlayer2 = document.createElement('button');
const gameInfo = document.createElement('div');
const cardContainer = document.createElement('div');
const player1container = document.createElement('div');
const player2container = document.createElement('div');
const player1CardRank = [];
const player2CardRank = [];

const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (player === 1) {
    setTimeout(function () {
      let player1Card = deck.pop();
      player1CardRank.push(player1Card.rank);
      output("Player 2's turn to draw.");
      const cardElement = makeCard(player1Card);
      player1container.appendChild(cardElement);
      player = 2;
    }, 0);
  }
};

const player2Click = () => {
  if (player === 2) {
    setTimeout(function () {
      const player2Card0 = deck.pop();
      player2CardRank.push(player2Card0.rank);
      const cardElement0 = makeCard(player2Card0);
      player2container.appendChild(cardElement0);
      player = 1;
      determineWinner(player1CardRank, player2CardRank);
      playerTurn++;
    }, 0);
  }
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

const determineRank = function (card1, card2) {
  if (card1.rank > card2.rank) {
    return card1.rank - card2.rank;
  } else {
    return card2.rank - card1.rank;
  }
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
        `Player 2 wins with: ${player2Diff} against player 2: ${player1Diff}.`
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
