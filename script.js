// Initialize global variable for container holding all cards
let cardContainer;
// Initialize global variable to keep track of num of cards drawns
let numCardsPOne = 0;
let numCardsPTwo = 0;
// Global variable to store player 1's card
let player1Card;
let player2Card;
// Boolean value to ensure P1 goes first and P2 cannot go until turn ends
let isPlayerOne = true;

// Array to store card values
const pOneValueArray = [];
const pTwoValueArray = [];
// Global variables for DOM element creation
const player2Button = document.createElement('button');
const changePlayerButton = document.createElement('button');
changePlayerButton.innerText = 'End P1 Turn';
const player1Button = document.createElement('button');
const gameInfo = document.createElement('div');

// Create a deck
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits & emojis in our deck
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitEmoji = ['❤️', '♦️', '♣️', '♠️'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit & suit emoji in a variable
    const currentSuit = suits[suitIndex];
    const currentEmoji = suitEmoji[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let shortName = `${rankCounter}`;

      if (shortName === '1') {
        shortName = 'A';
      } else if (shortName === '11') {
        shortName = 'J';
      } else if (shortName === '12') {
        shortName = 'Q';
      } else if (shortName === '13') {
        shortName = 'K';
      }

      let cardName = `${rankCounter}`;
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      let emojiColour = '';

      if (currentSuit === 'hearts') {
        emojiColour = 'red';
      } else if (currentSuit === 'diamonds') {
        emojiColour = 'red';
      } else if (currentSuit === 'spades') {
        emojiColour = 'black';
      } else if (currentSuit === 'clubs') {
        emojiColour = 'black';
      }
      // Create a new card with the current name, suit, and rank, colour, displayName and emoji
      const generatedCard = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentEmoji,
        displayName: shortName,
        colour: emojiColour,
      };

      // Add the new card to the deck
      newDeck.push(generatedCard);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (newDeck) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < newDeck.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(newDeck.length);
    // Select the card that corresponds to randomIndex
    const randomCard = newDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = newDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    newDeck[currentIndex] = randomCard;
    newDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return newDeck;
};

// Global variable for shuffled deck
const shuffledDeck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

// Function to generate DOM card from players drawn card
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

// Function to generate DOM card from player 2 draw: Diff due to diff class
// so that position can be changed based on which player's card it is
const createCardTwo = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('player2');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Callback function for player 1: Draws a card from deck,
// converts to a displayed card and appends to document
const player1Click = () => {
  // Ensure that P2 cannot draw careds
  if (isPlayerOne === true) {
    output('Player 1 is drawing!');
    // If both players have drawn same no of cards,
    // Clear the array, global counters and clear the output elements
    if (numCardsPOne === numCardsPTwo) {
      for (let j = 0; j < numCardsPOne; j += 1) {
        pOneValueArray.pop();
        pTwoValueArray.pop();
      }
      numCardsPOne = 0;
      numCardsPTwo = 0;
      cardContainer.innerHTML = '';
      // Append card container so that changes are seen in the document
      document.body.appendChild(cardContainer);
    }
    // Increment counter for each click made
    numCardsPOne += 1;
    player1Card = shuffledDeck.pop();
    // Store cards rank in array
    pOneValueArray.push(player1Card.rank);
    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }
};
// Callback function to switch between player turns
const endP1Turn = () => {
  isPlayerOne = false;
};
// Functions to calculate difference between max and min values for each player
const findMax = (...array) => Math.max(...array);
const findMin = (...array) => Math.min(...array);
const findDif = (...array) => {
  const outputDif = findMax(...array) - findMin(...array);
  return outputDif;
};

// Callback function for player 2: Draws a card from deck,
// converts to a displayed card and appends to document
const player2Click = () => {
  // Ensure that P1 cannot draw careds
  if (isPlayerOne === false) {
  // Update game info message to players
    output('Player 2 is drawing cards!');
    // Increment counter for number of cards drawn by player 2
    numCardsPTwo += 1;
    player2Card = shuffledDeck.pop();
    // Store cards rank in array
    pTwoValueArray.push(player2Card.rank);
    const cardElement = createCardTwo(player2Card);
    // Append card element to card container
    cardContainer.appendChild(cardElement);
    // Condition where if both players have same no of cards, compare values and declare a winner
    if (numCardsPOne === numCardsPTwo) {
      // Change back to P1 turn
      isPlayerOne = true;
      if (findDif(...pOneValueArray) - findDif(...pTwoValueArray) > 0) {
        output(`Player 1 wins! <br> Player 1's High Low Diff: ${findDif(...pOneValueArray)} <br> Player 2's High Low Diff: ${findDif(...pTwoValueArray)} <br> `);
      } else if (findDif(...pOneValueArray) - findDif(...pTwoValueArray) < 0) {
        output(`Player 2 wins! <br> Player 1's High Low Diff: ${findDif(...pOneValueArray)} <br> Player 2's High Low Diff: ${findDif(...pTwoValueArray)} <br> `);
      } else {
        output(`It's a tie! <br> Player 1's High Low Diff: ${findDif(...pOneValueArray)} <br> Player 2's High Low Diff: ${findDif(...pTwoValueArray)} <br> `);
      }
    }
  }
};

// Function to initialize
const initGame = () => {
// Create elements for content to be displayed at start of game
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);
  document.body.appendChild(changePlayerButton);
  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  gameInfo.innerHTML = 'Player 1: Draw as many cards as you like. <br> Then Player 2 will draw the same number of cards!🃏';
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);
  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click); };
changePlayerButton.addEventListener('click', endP1Turn);
// Start game
initGame();
