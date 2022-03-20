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

// different game types

function highCardGame(card1, card2) {
    if (card1.rank > card2.rank) {
      output('player 1 wins!');
    } else if (card1.rank < card2.rank) {
      output('player 2 wins!');
    } else {
      output('tie!');
  }
};

let maxCard;
let minCard;

function rankDifference(playerCards) {
  if (playerCards.length === 1) {
    maxCard = playerCards[0];
    minCard = playerCards[0];
  }

  if (playerCards.length > 1) {
  for (let i = 0; i < playerCards.length; i += 1) {
    console.log(i);
    console.log('here');
    if (playerCards[i].rank > maxCard.rank) {
      maxCard = playerCards[i];
    }
    if (playerCards[i].rank < minCard.rank) {
      minCard = playerCards[i];
    }
  }
  }
  let difference = maxCard.rank - minCard.rank;
  console.log('difference:' ,difference)
  return difference;

};

function highLowCardGame(difference1, difference2) {
  if (difference1 > difference2) {
    output('player 1 wins');
  } else if (difference1 < difference2) {
    output('player 2 wins');
  } else output('tie');
}


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

// initialise game type
let gameType;

// PLAYER ACTION CALLBACKS

const player1HighClick = () => {
  if (playersTurn === 1) {
    cardContainer.innerHTML = '';
    player1Card = drawCard();
    playersTurn = 2;
    output('Its player 2 turn.');
  }
};

const player2HighClick = () => {
  if (playersTurn === 2) {
    player2Card = drawCard();
    playersTurn = 1;
    highCardGame(player1Card, player2Card);
  }
};

let player1HighLowHand=[];
const player1HighLowClick = () => {
  player1Card = drawCard();
  player1HighLowHand.push(player1Card);
  player1difference = rankDifference(player1HighLowHand);
}

let player2HighLowHand=[];
const player2HighLowClick = () => {
  player2Card = drawCard();
  player2HighLowHand.push(player2Card);
  player2difference = rankDifference(player2HighLowHand);
  console.log(player1difference);
  highLowCardGame(player1difference, player2difference);
}

// GAME INITIALISATION


const highCardButton = document.createElement('button');
highCardButton.innerText = "High Card Game";
document.body.appendChild(highCardButton);

const highLowCardButton = document.createElement('button');
highLowCardButton.innerText = "High Low Card Game";
document.body.appendChild(highLowCardButton);

highCardButton.addEventListener('click', () => initHighCardGame())
highLowCardButton.addEventListener('click', () => initHighLowCardGame());



const initHighCardGame = () => {
  console.log('game type:' + gameType)
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


  player1Button.addEventListener('click', player1HighClick);
  player2Button.addEventListener('click', player2HighClick);

};
  
const initHighLowCardGame = () => {
  console.log('highlowcardgame starts')
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


  player1Button.addEventListener('click', player1HighLowClick);
  player2Button.addEventListener('click', player2HighLowClick);




};