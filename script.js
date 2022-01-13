

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
  const suitSymbols = ['♥', '♦', '♣', '♠'];
  const cardColours = ['red', 'red', 'black', 'black'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];
    const currentCardColour = cardColours[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSuitSymbol,
        colour: currentCardColour,
      };
      // Add the new card to the deck
      newDeck.push(card);
    }
  }
  // Return the completed card deck
  return newDeck;
};
// update createDeck to include new visual attributes!!
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;
  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.name;
  const card = document.createElement('div');
  card.classList.add('card');
  // append card name and suit to the card div
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};


// GLOBAL VARIABLES
const deck = shuffleCards(makeDeck());
let playersTurn = 1; // matches with starting instructions
let player1Card;
// define card number elements
const cardNumberDiv = document.createElement('div');
const cardNumberInput = document.createElement('input');
const cardNumberButton = document.createElement('button');
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const gameInfo = document.createElement('div');
let canClick = true;
let cardContainer;
let numberOfCards = 0;
const p1Hand = [];
const p2Hand = [];
let scoreP1 = 0;
let scoreP2 = 0;
// let highestRankP1 = 0;
// const lowestRankP1 = 0;
// const highestRankP2 = 0;
// const lowestRankP2 = 0;
// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};


// CALLBACK FUNCTIONS
const cardNumberButtonClick = () => {
  if (cardNumberInput.value > 0 && cardNumberInput.value < 10) {
    numberOfCards = cardNumberInput.value;
    cardNumberButton.disabled = true;
  }
};
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    let highestRankP1 = 0;
    let lowestRankP1 = 0;
    // loop timeout and deck.pop
    setTimeout(() => {
      cardContainer.innerHTML = '';
      // loop to pop cards one by one depending on variable card number
      for (let i = 0; i < numberOfCards; i += 1) {
        // set color for p1 container
        cardContainer.setAttribute('class', 'p1-container');
        player1Card = deck.pop(); // get card from player1
        p1Hand[i] = player1Card;
        // determine highest rank based on card drawn
        if (highestRankP1 === 0) {
          highestRankP1 = player1Card.rank;
        }
        // if current highest is lower than next card
        else if (highestRankP1 < player1Card.rank) {
          highestRankP1 = player1Card.rank;
        }
        // determine lowest rank based on card drawn
        if (lowestRankP1 === 0) { // starting condition to set first card
          lowestRankP1 = player1Card.rank;
        }
        // if current lowest is higher than next card
        else if (lowestRankP1 > player1Card.rank) {
          lowestRankP1 = player1Card.rank;
        }
      }
      // sort cards in ascending order
      p1Hand.sort((a, b) => a.rank - b.rank);
      // loop to create cards into card container.
      for (let i = 0; i < numberOfCards; i += 1) {
        // create card element from card metadata
        const cardElement = createCard(p1Hand[i]);
        // append card element to cardContainer
        cardContainer.appendChild(cardElement);
      }
      // scoring based on rank differences:
      scoreP1 = highestRankP1 - lowestRankP1;
      // define and append a break between players' cards.
      const spaceHr = document.createElement('hr');
      cardContainer.appendChild(spaceHr);
      playersTurn = 2;
      canClick = true;
    }, 200);
  }
};
const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    let highestRankP2 = 0;
    let lowestRankP2 = 0;
    setTimeout(() => {
      for (let i = 0; i < numberOfCards; i += 1) {
        // set color for p2 container
        cardContainer.setAttribute('class', 'p2-container');
        const player2Card = deck.pop();
        p2Hand[i] = player2Card;
        // determine highest rank based on card drawn
        if (highestRankP2 === 0) {
          highestRankP2 = player2Card.rank;
        }
        // if current highest is lower than next card
        else if (highestRankP2 < player2Card.rank) {
          highestRankP2 = player2Card.rank;
        }
        // determine lowest rank based on card drawn
        if (lowestRankP2 === 0) { // starting condition to set first card
          lowestRankP2 = player2Card.rank;
        }
        // if current lowest is higher than next card
        else if (lowestRankP2 > player2Card.rank) {
          lowestRankP2 = player2Card.rank;
        }
      }
      // sort cards in ascending order
      p2Hand.sort((a, b) => a.rank - b.rank);
      // loop to create cards into card container.
      for (let i = 0; i < numberOfCards; i += 1) {
        // create card element from card metadata
        const cardElement = createCard(p2Hand[i]);
        // append card element to cardContainer
        cardContainer.appendChild(cardElement);
      }
      // scoring based on rank differences:
      scoreP2 = highestRankP2 - lowestRankP2;
      playersTurn = 1;
      canClick = true;
      cardNumberButton.disabled = false; // enable card number button after p2's turn is over
      console.log(scoreP1, scoreP2);
      if (scoreP1 > scoreP2) {
        output('player 1 wins');
      } else if (scoreP2 > scoreP1) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }, 200);
  }
};

// INITIALISATION
const initGame = () => {
  // initialize button functionality
  // card number input
  document.body.appendChild(cardNumberDiv);
  cardNumberInput.placeholder = 'How many cards per player?';
  cardNumberDiv.appendChild(cardNumberInput);
  cardNumberButton.innerText = 'Submit';
  cardNumberDiv.appendChild(cardNumberButton);
  // player 1 draw button
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);
  // player 2 draw button
  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);
  // event listeners
  cardNumberButton.addEventListener('click', cardNumberButtonClick);
  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
  // initialise a div 'cardContainer'
  cardContainer = document.createElement('div');
  cardContainer.classList.add('cardContainer');
  document.body.appendChild(cardContainer);
};
initGame();