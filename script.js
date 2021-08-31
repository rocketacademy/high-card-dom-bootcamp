// Please implement exercise logic here
// ########## GLOBAL VARIABLES ##########

let player1Card;
let player2Card;

let numCards = 52;

let p1Deck = [];
let p2Deck = [];

const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const endRoundButton = document.createElement('button');

const gameInfo = document.createElement('div');
const p1Label = document.createElement('div');
const p2Label = document.createElement('div');

const numberDiv = document.createElement('div');
const numberText = document.createElement('p');
const numberInput = document.createElement('input');
const numberButton = document.createElement('button');

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

//DOM ELEMENT FOR THE CARD TO APPEAR!!!
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
const endRound = () => {
  if (p1Deck.length < 2 || p2Deck.length < 2) {
    output('Each player must have at least 2 cards in order to end the round!');
  } else {
    numberDiv.innerText = '';

    p1Deck.sort((a, b) => a - b);
    p2Deck.sort((a, b) => a - b);
    const p1Score = p1Deck[p1Deck.length - 1] - p1Deck[0];
    const p2Score = p2Deck[p2Deck.length - 1] - p2Deck[0];
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
      p1Deck = [];
      p2Deck = [];
      numberDiv.appendChild(numberText);
      numberDiv.appendChild(numberInput);
      numberDiv.appendChild(numberButton);
    }, 5000);
  }
};

const checkEnd = () => {
  if (p1Deck.length === numCards && p2Deck.length === numCards) {
    endRound();
  }
};

//Player 1
const player1Click = () => {
  numberDiv.innerText = `Limit number of cards: ${numCards}`;
  if (numCards === 52) {
    numberDiv.innerText = 'Limit number of cards: unlimited';
  }

  if (canClick === true && p1Deck.length < numCards) {
    canClick = false;
    output('Player 1 drawing...');

    setTimeout(() => {
      player1Card = deck.pop();
      p1Deck.push(player1Card.rank);

      const cardElement = createCard(player1Card);

      p1Div.appendChild(cardElement);
      canClick = true;
      output('Player 1 drew a card!');
      checkEnd();
    }, 1000);
  }
};

const player2Click = () => {
  numberDiv.innerText = `Limit number of cards: ${numCards}`;
  if (numCards === 52) {
    numberDiv.innerText = 'Limit number of cards: unlimited';
  }

  if (canClick === true && p2Deck.length < numCards) {
    canClick = false;
    output('Player 2 drawing...');

    setTimeout(() => {
      player2Card = deck.pop();
      p2Deck.push(player2Card.rank);

      const cardElement = createCard(player2Card);

      p2Div.appendChild(cardElement);
      canClick = true;
      output('Player 2 drew a card!');
      checkEnd();
    }, 1000);
  }
};

//Input for player to put how many cards to draw each round.
const setNumber = () => {
  const userInput = document.getElementById('num-of-cards').value;
  //convert string to number, and store it in numCards
  numCards = Number(userInput);

  //mini validation of sorts, to prompt the player about the input.
  if (isNaN(numCards)) {
    numberText.innerText = 'Invalid input. Please only input NUMBER (e.g. 2,3,4)';
  } else if (numCards < 2) {
    numberText.innerText = 'Please input a number that is at least 2';
  } else {
    numberText.innerText = `Limit number of cards: ${numCards}`;
    if (numCards === 52) {
      numberText.innerText = 'Limit number of cards: unlimited';
    }
  }
};

///GAME INITIALISATION

const initGame = () => {
  // fill game info div with starting instructions
  gameInfo.innerText = 'Welcome! Click the respective buttons to draw cards!';
  document.body.appendChild(gameInfo);

  //NumCards
  numberText.innerText = 'Limit number of cards: ';
  numberDiv.appendChild(numberText);
  numberInput.setAttribute('id', 'num-of-cards');
  numberDiv.appendChild(numberInput);
  numberButton.innerText = 'Enter';
  numberDiv.appendChild(numberButton);
  document.body.appendChild(numberDiv);

  //Card-Container like a board
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  //Placeholder for each players
  p1Div = document.createElement('div');
  p2Div = document.createElement('div');
  p1Label.innerHTML = 'Player 1 Deck';
  p2Label.innerHTML = '<br> Player 2 Deck';
  cardContainer.appendChild(p1Label);
  cardContainer.appendChild(p1Div);
  cardContainer.appendChild(p2Label);
  cardContainer.appendChild(p2Div);

  // button div
  const buttonDiv = document.createElement('div');
  document.body.appendChild(buttonDiv);

  // initialize button functionality
  player1Button.innerText = 'Draw for P1';
  buttonDiv.appendChild(player1Button);

  player2Button.innerText = 'Draw for P2';
  buttonDiv.appendChild(player2Button);

  endRoundButton.innerText = 'End Round';
  buttonDiv.appendChild(endRoundButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  endRoundButton.addEventListener('click', endRound);
  numberButton.addEventListener('click', setNumber);
};

const deck = shuffleCards(makeDeck());

initGame();