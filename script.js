// Please implement exercise logic here

// HELPER FUNCTIONS

// make deck
const makeDeck = () => {
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const color = ['red', 'red', 'black', 'black']

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    let currentSymbol;
    let currentColor;

    if (currentSuit == 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit == 'diamonds') {
      currentSymbol = '♦️';
    } else if (currentSuit == 'clubs') {
      currentSymbol = '♣️';
    } else if (currentSuit == 'spades') {
      currentSymbol = '♠️';
    }

    if (currentSuit == 'hearts' || currentSuit == 'diamonds') {
      currentColor = 'red';
    } else if (currentSuit == 'clubs' || currentSuit == 'spades') {
      currentColor = 'black';
    }
      
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let currentDisplayName = rankCounter

      let cardName = `${rankCounter}`;
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
      const card = {
      name: cardName,
      suit: currentSuit,
      suitSymbol: currentSymbol,
      rank: rankCounter,
      displayName: currentDisplayName,
      color: currentColor,
      };
    newDeck.push(card);
    }
  }
  return newDeck;
}

// shuffle cards
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];

    //swap current card and random card position
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
}

// draw cards
function drawCard () {
  let playerCard = deck.pop();
  const cardElement = createCard(playerCard);
  cardContainer.appendChild(cardElement);
  return playerCard
}


// check deck count to have at least 2 cards
// before player 1 draws/ when player 2 ends, there should be at least 2 cards


const checkDeckCount = (deck) => {
  if ( (playersTurn === 1 && deck.length < 2) || (playersTurn === 2 && deck.length < 1) || deck.length <= 0 ) {
    return false;
  } else {
    return true ;
  }
}

// display output message
const output = (message) => {
  if (checkDeckCount(deck)) {
  gameInfo.innerText = message + ' Click to draw a card!'
} else { gameInfo.innerText = message + ' There are not enough cards left in deck. Restart game to play.'}
  
}

// HTML to JS DOM
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



// GLOBAL SET UP

const deck = shuffleCards(makeDeck());

// player 1 starts first
let playersTurn = 1; 

// initialise player1Card
let player1Card; 
let player2Card;

const gameInfo = document.createElement('div')

let cardContainer;

// create two buttons
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');



// PLAYER ACTION CALLBACKS

const player1Click = () => {
  if (playersTurn === 1) {
    cardContainer.innerHTML = '';
    player1Card = drawCard();
    playersTurn = 2;
    output('Its player 2 turn.');
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    player2Card = drawCard();
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins!');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins!');
    } else {
      output('tie!');
    }
  }
};


// GAME INITIALISATION

const initGame = () => {

  // fill in game info with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // initialise button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);


  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  

};

initGame();