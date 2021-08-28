// ########## GLOBAL VARIABLES ##########

let player1Card;
let player2Card;

let p1Ranks = [];
let p2Ranks = [];

const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const endRoundButton = document.createElement('button');

const gameInfo = document.createElement('div');
const p1Label = document.createElement('div');
const p2Label = document.createElement('div');

let canClick = true;

let cardContainer;
let p1Div;
let p2Div;

// ########## HELPER FUNCTIONS ##########

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
    let currentSymbol;
    let currentColour = 'red';

    if (currentSuit === 'hearts') {
      currentSymbol = '❤️';
    } else if (currentSuit === 'diamonds') {
      currentSymbol = '♦️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
      currentColour = 'black';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
      currentColour = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;

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

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSymbol,
        displayName: cardDisplay,
        colour: currentColour,
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
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

const addOutput = (message) => {
  gameInfo.innerText += message;
};

// ########## PLAYER ACTION CALLBACKS ##########

const player1Click = () => {
  if (canClick === true) {
    canClick = false;
    output('Player 1 drawing...');

    setTimeout(() => {
      player1Card = deck.pop();
      p1Ranks.push(player1Card.rank);

      const cardElement = createCard(player1Card);

      p1Div.appendChild(cardElement);
      canClick = true;
      output('Player 1 drew a card!');
    }, 1000);
  }
};

const player2Click = () => {
  if (canClick === true) {
    canClick = false;
    output('Player 2 drawing...');

    setTimeout(() => {
      player2Card = deck.pop();
      p2Ranks.push(player2Card.rank);

      const cardElement = createCard(player2Card);

      p2Div.appendChild(cardElement);
      canClick = true;
      output('Player 2 drew a card!');
    }, 1000);
  }
};

const endRound = () => {
  if (p1Ranks.length < 2 || p2Ranks.length < 2) {
    output('Each player must have at least 2 cards in order to end the round!');
  } else {
    p1Ranks.sort((a, b) => a - b);
    p2Ranks.sort((a, b) => a - b);
    const p1Score = p1Ranks[p1Ranks.length - 1] - p1Ranks[0];
    const p2Score = p2Ranks[p2Ranks.length - 1] - p2Ranks[0];
    console.log(`p1 ${p1Score}`);
    console.log(`p2 ${p2Score}`);

    if (p1Score === p2Score) {
      output('Both players draw! <br>');
    } else if (p1Score > p2Score) {
      output('Player 1 Wins! <br>');
    } else if (p1Score < p2Score) {
      output('Player 2 Wins! <br>');
    }
    addOutput('New round starting in 5... ');

    setTimeout(() => { addOutput('4... '); }, 1000);
    setTimeout(() => { addOutput('3... '); }, 2000);
    setTimeout(() => { addOutput('2... '); }, 3000);
    setTimeout(() => { addOutput('1...'); }, 4000);

    setTimeout(() => {
      output('New round has started! Click the respective buttons to draw cards!');
      p1Div.innerHTML = '';
      p2Div.innerHTML = '';
      p1Ranks = [];
      p2Ranks = [];
    }, 5000);
  }
};

// ########## GAME INITIALISATION ##########

const initGame = () => {
  // fill game info div with starting instructions
  gameInfo.innerText = 'Welcome! Click the respective buttons to draw cards!';
  document.body.appendChild(gameInfo);

  // card container
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // divs for each player
  p1Div = document.createElement('div');
  p2Div = document.createElement('div');
  p1Label.innerHTML = 'Player 1 Hand';
  p2Label.innerHTML = '<br> Player 2 Hand';
  cardContainer.appendChild(p1Label);
  cardContainer.appendChild(p1Div);
  cardContainer.appendChild(p2Label);
  cardContainer.appendChild(p2Div);

  // button div
  const buttonDiv = document.createElement('div');
  document.body.appendChild(buttonDiv);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  buttonDiv.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  buttonDiv.appendChild(player2Button);

  endRoundButton.innerText = 'End Round';
  buttonDiv.appendChild(endRoundButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  endRoundButton.addEventListener('click', endRound);
};

const deck = shuffleCards(makeDeck());

initGame();
