// Please implement exercise logic here

// HELPER FUNCTIONS

// creating text input to draw cards
function getVal() {
  text = Number(document.getElementById("text_id").value);
  console.log(text);
  return text;
}

const submitButton = document.createElement('button');
submitButton.innerText = 'Submit';
document.body.appendChild(submitButton);
submitButton.addEventListener('click', () => getVal());

// make deck
const makeDeck = () => {
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const color = ['red', 'red', 'black', 'black']

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    let currentSymbol;
    let currentColor;
    let currentSortRank;

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

      currentSortRank = (suitIndex * 13) + rankCounter;

      const card = {
      name: cardName,
      suit: currentSuit,
      suitSymbol: currentSymbol,
      rank: rankCounter, // 1 to 13
      displayName: currentDisplayName,
      color: currentColor,
      sortRank: currentSortRank // 1 to 52
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

// sort cards
function sortCards(array) {
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length - i - 1; j += 1) {
      if (array[j].rank > array[j+1].rank) {
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }

  // swap 2nd and max card
  if (array.length > 1) {
  let temp2 = array[1]; 
  console.log('temp2: ', temp2)
  array[1] = array[array.length-1];
  console.log('2nd card in array: ', array[1]);
  array[array.length-1] = temp2;
  console.log('last card in array: ', array[array.length-1]);
  }

  return array;
};
 
// draw cards for high card game
function drawCard () {
  let playerCard = deck.pop();
  const cardElement = createCard(playerCard);
  if (playersTurn === 1) {
    p1CardCanvas.appendChild(cardElement);
  } 
  if (playersTurn === 2) {
    p2CardCanvas.appendChild(cardElement);
  }
  return playerCard
}

// draw cards for high low card game

function printCard(playerHand) {
  if (playersTurn === 1) {
    p1CardCanvas.innerText = "";
    for (let i = 0 ; i < playerHand.length; i += 1) {
      const cardElement = createCard(playerHand[i]);
      p1CardCanvas.appendChild(cardElement);
    }
  }

  if (playersTurn === 2) {
    p2CardCanvas.innerText = "";
    for (let i = 0 ; i < playerHand.length; i += 1) {
      const cardElement = createCard(playerHand[i]);
      p2CardCanvas.appendChild(cardElement);
    }
  }
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

// HTML to JS DOM for each card
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

function rankDifference(playerCards) {
  let difference;
  if (playersTurn === 1) {
  if (playerCards.length === 1) {
    p1MaxCard = playerCards[0];
    p1MinCard = playerCards[0];
  }
  if (playerCards.length > 1) {
  for (let i = 0; i < playerCards.length; i += 1) {

    if (playerCards[i].rank > p1MaxCard.rank) {
      p1MaxCard = playerCards[i];
    }
    if (playerCards[i].rank < p1MinCard.rank) {
      p1MinCard = playerCards[i];
    }
  }
  }
  difference = p1MaxCard.rank - p1MinCard.rank;}

  if (playersTurn === 2) {
  if (playerCards.length === 1) {
    p2MaxCard = playerCards[0];
    p2MinCard = playerCards[0];
  }
  if (playerCards.length > 1) {
  for (let i = 0; i < playerCards.length; i += 1) {

    if (playerCards[i].rank > p2MaxCard.rank) {
      p2MaxCard = playerCards[i];
    }
    if (playerCards[i].rank < p2MinCard.rank) {
      p2MinCard = playerCards[i];
    }
  }
  }
    difference = p2MaxCard.rank - p2MinCard.rank;
  }


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

function initHTMLcontainers() {
  // fill in game info with starting instructions
  
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  document.body.appendChild(playerHandContainer);
  document.body.appendChild(drawButtonContainer);

  playerHandContainer.appendChild(p1CardContainer);
  playerHandContainer.appendChild(p2CardContainer);

  p1CardContainer.appendChild(p1CardCanvas);
  p2CardContainer.appendChild(p2CardCanvas);

  // initialise button functionality
  drawButtonContainer.appendChild(player1Button);
  drawButtonContainer.appendChild(player2Button);
}


// GLOBAL SET UP

// initialising variables
const deck = shuffleCards(makeDeck());

// player 1 starts first
let playersTurn = 1; 

// initialise player cards and hands
let player1Card; 
let player2Card;

let p1MaxCard;
let p1MinCard;
let p2MaxCard;
let p2MinCard;

let player1HighLowHand=[];
let player2HighLowHand=[];

let canClick = true;

let text;

// HTML set up

// creating containers for game type buttons, game info, player hand, and draw card containers
const gameButtonContainer = document.createElement('div');
const gameInfo = document.createElement('div'); 
const playerHandContainer = document.createElement('div');
const drawButtonContainer = document.createElement('div');

document.body.appendChild(gameButtonContainer);

// create containers for p1 and p2 hands
const p1CardContainer = document.createElement('div');
const p2CardContainer = document.createElement('div');

const p1CardContainerText = document.createElement('p');
p1CardContainerText.innerText = 'Player 1 Hand';
p1CardContainer.appendChild(p1CardContainerText);

const p2CardContainerText = document.createElement('p');
p2CardContainerText.innerText = "Player 2 Hand";
p2CardContainer.appendChild(p2CardContainerText);

const p1CardCanvas = document.createElement('p');
const p2CardCanvas = document.createElement('p');

// creating game type buttons
const highCardButton = document.createElement('button');
highCardButton.innerText = "High Card Game";
gameButtonContainer.appendChild(highCardButton);

const highLowCardButton = document.createElement('button');
highLowCardButton.innerText = "High Low Card Game";
gameButtonContainer.appendChild(highLowCardButton);

// create two buttons
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
player1Button.innerText = 'Player 1 draw';
player2Button.innerText = 'Player 2 draw'

// PLAYER ACTION CALLBACKS

const player1HighClick = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    p1CardCanvas.innerHTML = '';
    p2CardCanvas.innerHTML = '';
    setTimeout( () => {
    player1Card = drawCard();
    playersTurn = 2;
    canClick = true;
  }, 500);
    output('Its player 2 turn.');
  }
};

const player2HighClick = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    
    setTimeout( () => {
    player2Card = drawCard();
    playersTurn = 1;
    canClick = true;  
    highCardGame(player1Card, player2Card);
  }, 500);
   
  }
};

const player1HighLowClick = () => {
  playersTurn = 1;
  
  if (playersTurn === 1 && canClick === true && player1HighLowHand.length < text) {
    canClick = false;
  
    setTimeout ( () => {
  
      player1Card = deck.pop()
      player1HighLowHand.push(player1Card);
      player1HighLowHand = sortCards(player1HighLowHand);
      printCard(player1HighLowHand);
      player1difference = rankDifference(player1HighLowHand);
    
      canClick = true;
      highLowCardGame(player1difference, player2difference);
      }, 500);
  }
};

const player2HighLowClick = () => {
  playersTurn = 2;

  if (playersTurn === 2 && canClick === true && player2HighLowHand.length < text) {
    canClick = false;

    setTimeout( () => {
      player2Card = deck.pop();
      player2HighLowHand.push(player2Card);
      player2HighLowHand = sortCards(player2HighLowHand);
      printCard(player2HighLowHand);
      player2difference = rankDifference(player2HighLowHand);
      canClick = true;
      highLowCardGame(player1difference, player2difference);
    }, 500);
  }
};

// GAME INITIALISATION

highCardButton.addEventListener('click', () => initHighCardGame())
highLowCardButton.addEventListener('click', () => initHighLowCardGame());

const initHighCardGame = () => {
  
  initHTMLcontainers();

  player1Button.addEventListener('click', player1HighClick);
  player2Button.addEventListener('click', player2HighClick);

};
  
const initHighLowCardGame = () => {
  
  initHTMLcontainers();

  player1Button.addEventListener('click', player1HighLowClick);
  player2Button.addEventListener('click', player2HighLowClick);

};


