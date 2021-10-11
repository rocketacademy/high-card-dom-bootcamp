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
  const suitShapes = ['♥', '♦', '♣', '♠'];
  let cardColor = ''
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

      if (currentSuit === `diamonds`){
        symbol = `♦`;
        cardColor = "red";
      } else if (currentSuit === `clubs`){
        symbol = `♣`
        cardColor = "black";
      }else if (currentSuit === `hearts`){
        symbol = `♥`
        cardColor = "red";
      } else if (currentSuit === `spades`){
        symbol = `♠`
        cardColor = "black";
      }



      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
        symbol
      };
      console.log(card)

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;
let player2Card;

// create two buttons
const player1Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

//create card display
const createCard = (cardInfo) => {
  console.log("card info:", cardInfo)
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add('name')
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  if (cardInfo.color === 'red'){
    card.classList.add('red')
  };

  

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

let canClick = true;
let cardContainer;
cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);


// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
player1Button.addEventListener('click', () => {
  if (playersTurn === 1) {
    cardContainer.innerHTML = ""
    const displayCard = () => {
    player1Card = deck.pop();
    const showhand = createCard(player1Card)
    cardContainer.appendChild(showhand)
    playersTurn = 2;
    }
    setTimeout(displayCard,2000)
  }
});


// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
player2Button.addEventListener('click', () => {
  if (playersTurn === 2) {
    const displayCard2 = () => {
    player2Card = deck.pop();
    const showhand = createCard(player2Card)
    cardContainer.appendChild(showhand)
    playersTurn = 1;
    console.log("player 1: ", player1Card, "player 2: ", player2Card)

    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
    console.log("player one: ", player1Card.rank, "player two: ", player2Card.rank)
  }
  setTimeout(displayCard2, 2000)
} 
  
})