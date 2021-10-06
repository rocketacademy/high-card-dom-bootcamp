let cardContainer;

// Global variable to store players turn and player 1's card
let playersTurn = 1;
let player1Card;
// Create elements for displayed items

const player1Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

const gameInfo = document.createElement('div');
gameInfo.innerText = 'Player 1: Click to draw a card!🃏';
document.body.appendChild(gameInfo);

cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitEmoji = ['❤️', '♦️', '♣️', '♠️'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
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

// Function to generate DOM card from players draw
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

const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = shuffledDeck.pop();
    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = '';
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
    output('Player 2: Click to draw a card!🃏');
    playersTurn = 2;
    // gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = shuffledDeck.pop();

    const cardElement = createCard(player2Card);
    // Append card element to card container
    cardContainer.appendChild(cardElement);
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('Player 1 wins!😊 <br> Player 1 please try again!');
    } else if (player1Card.rank < player2Card.rank) {
      output('Player 2 wins!😊<br> Player 1 please try again!');
    } else {
      output('Tie😑<br> Player 1 please try again!');
    }
  }
};

player1Button.addEventListener('click', player1Click);
player2Button.addEventListener('click', player2Click);
