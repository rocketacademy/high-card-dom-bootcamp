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
  const suits = ['❤️', '♦️', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Assign hearts and diamonds to color red, clubs and spades to color black.
    let suitColor = '';
    if (suitIndex === 0 || suitIndex === 1) {
      suitColor = 'red';
    } else {
      suitColor = 'black';
    }

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
        displayName: cardName,
        suitSymbol: currentSuit,
        rank: rankCounter,
        color: suitColor
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;

const cardDisplay = document.createElement('div');
cardDisplay.classList.add('display-container');

const visualCard1 = document.createElement('div');
visualCard1.classList.add('card-container');

const visualCard2 = document.createElement('div');
visualCard2.classList.add('card-container');

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');
gameInfo.classList.add('info-display');

const buttonDisplay = document.createElement('div');

// const resetGame = () => {
//   playersTurn = 1;

// }

const player1Click = () => {
  if (playersTurn === 1) {
    initGame();
    player1Card = deck.pop();
    visualCard1.appendChild(createCard(player1Card));
    cardDisplay.appendChild(visualCard1);
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    visualCard2.appendChild(createCard(player2Card));
    cardDisplay.appendChild(visualCard2);
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('Player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('Player 2 wins');
    } else {
      output('Tie');
    }
  }
};

const initGame = () => {
  visualCard1.innerHTML = '';
  visualCard2.innerHTML = '';

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  buttonDisplay.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  buttonDisplay.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  document.body.appendChild(cardDisplay);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  document.body.append(buttonDisplay);
};

initGame();