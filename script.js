let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Hand = [];
const player2Hand = [];

let player1HandCounter = 0;
let player2HandCounter = 0;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const endTurnButton = document.createElement('button');

const gameInfo = document.createElement('div');

let cardContainer;
cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);

// Helper Functions

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

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardSuitSymbol = ""; 
      let  suitColor = "";
      let  cardDisplayName = "";

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      if (cardName === '1') {
        cardDisplayName = 'A';
      } else if (cardName === '11') {
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardDisplayName = 'K';
      }

      if (currentSuit === 'hearts') {
        cardSuitSymbol = '♥';
        suitColor = 'red'
      } else if (currentSuit === 'diamonds') {
        cardSuitSymbol = '♦️';
        suitColor = 'red'
      } else if (currentSuit === 'clubs') {
        cardSuitSymbol = '♣';
        suitColor = 'black'
      } else if (currentSuit === 'spades') {
        cardSuitSymbol = '♠';
        suitColor = 'black'
      }

      // Create a new card with the current name, suit, and rank
    const cardInfo = {
      suitSymbol: cardSuitSymbol,
      suit: currentSuit,
      name: cardName,
      displayName: cardDisplayName,
      colour: suitColor,
      rank: rankCounter,
     };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
const createCard = (cardInfo) => {
  console.log(cardInfo)
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.rank;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  console.log (cardInfo.suitSymbol)
  return card;
  
};

// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// Player Action Callbacks
const player1Click = () => {
  if (playersTurn === 1) {
    
    player1HandCounter += 1;
    player1Card = deck.pop();
    player1Hand.push(player1Card.rank)

    console.log(player1Card,"p1")
    const player1Display = createCard(player1Card)
    
    cardContainer.appendChild(player1Display)
    


    
  }
};



const player2Click = () => {
  if (playersTurn === 2) {
    player2HandCounter += 1;
    const player2Card = deck.pop();
    player2Hand.push(player2Card.rank)

    const player2Display = createCard(player2Card)
    cardContainer.appendChild(player2Display)
    console.log(player2Card,"p2")    

    if (player1HandCounter === player2HandCounter){

    
    if (findDifference(...player1Hand) > findDifference(...player2Hand)) {
      output('player 1 wins');
    } else if (findDifference(...player1Hand) < findDifference(...player2Hand)) {
      output('player 2 wins');
    } else {
      output('tie');
    }  

    }
  }
};


const endTurn = () => {
  if (playersTurn === 1){
  playersTurn = 2;  gi
}else if (playersTurn === 2){
  player1Hand = [];
  player2Hand = [];
  player1HandCounter = 0;
  player2HandCounter = 0;
  cardContainer.innerHTML = ""
  playersTurn = 1;
  }
}

const findMax = (...arrayInput) => {
  return Math.max(...arrayInput)
}

const findMin = (...arrayInput) => {
  return Math.min(...arrayInput)
}

const findDifference = (...arrayInput) => {
  return findMax(...arrayInput) - findMin(...arrayInput)  
}






// Game Initialisation
const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  endTurnButton.innerHTML = "End Turn"
  document.body.appendChild(endTurnButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  endTurnButton.addEventListener('click', endTurn);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};



initGame()

// High / Low Card
// The players can draw multiple cards each. The winner is the player who has the greatest difference in rank between the highest and lowest cards in his hand.
// Change the CSS of the game so that each players' cards are displayed in a row.


// The players can draw multiple cards each


// Determine greatest difference in rank between the highest and lowest cards

// Compare and output result