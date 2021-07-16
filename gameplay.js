// create array to store players' card
let player1Arr = [];
let player2Arr = [];

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
  const symbols = ['❤️', '♦️', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = symbols[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;
      let cardColor = 'red';
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplay = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplay = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplay = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplay = 'K';
      }

      if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
        cardColor = 'red';
      } else if (currentSuit === 'spades' || currentSuit === 'clubs') {
        cardColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSymbol,
        displayName: cardDisplay,
        color: cardColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
// create a shuffled deck
const deck = shuffleCards(makeDeck());
// Player 1 starts first
let playersTurn = 1;
// Use let for player1Card object because player1Card will be reassigned
let player1Card;

// create two buttons
const player1Button = document.createElement('button');
player1Button.className = 'button';
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
player2Button.className = 'button2';
player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// create fucntion to get score
// https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
const getScore = (playerArr) => {
  const highestScore = Math.max.apply(Math, playerArr.map((o) => o.rank));
  const lowestScore = Math.min.apply(Math, playerArr.map((o) => o.rank));
  const score = Number(String(highestScore) - String(lowestScore));
  return score;
};

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
const player1Click = () => {
  if (playersTurn === 1) {
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer1.innerHTML = '';
    // player1Arr = '';
    for (let i = 0; i < 3; i += 1) {
    // Pop player 1's card metadata from the deck
      player1Card = deck.pop();
      player1Arr.push(player1Card);
      // Create card element from card metadata
      const cardElement = createCard(player1Card);
      // Append the card element to the card container
      cardContainer1.appendChild(cardElement);
    }
    output('Player 2\'s turn!');
    // Switch to player 2's turn
    playersTurn = 2;
  }
};
const player2Click = () => {
  if (playersTurn === 2) {
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer2.innerHTML = '';
    // player2Arr = '';
    for (let i = 0; i < 3; i += 1) {
    // Pop player 2's card metadata from the deck
      const player2Card = deck.pop();
      player2Arr.push(player2Card);
      // Create card element from card metadata
      const cardElement = createCard(player2Card);
      // Append card element to card container
      cardContainer2.appendChild(cardElement);
    }
    // Switch to player 1's turn
    playersTurn = 1;
  }
  // Determine and output winner
  if (getScore(player1Arr) > getScore(player2Arr)) {
    output('Player 1 wins. Player 1\'s turn now!');
  } else if (getScore(player1Arr) < getScore(player2Arr)) {
    output('Player 2 wins. Player 1\'s turn now!');
  } else {
    output('tie');
  }
  if (deck.length < 6) {
    deck = shuffleCards(makeDeck());
  }
  player1Arr = [];
  player2Arr = [];
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
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

initGame();
