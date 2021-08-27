// ###### Global variables ######

// creating various DOM elements
let cardContainer1;
let cardContainer2;
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const decideWinnerButton = document.createElement('button');
const field = document.createElement('input');
const submitButton = document.createElement('button');
const gameInfo = document.createElement('div');

// create global player hands in order to arrange the array
const player1Hand = [];
const player2Hand = [];

// store maximum number of cards
let maxCard;

// ##### Helper Functions #####

const getRandomIndex = (max) => Math.floor(Math.random() * max);

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
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      let icon = suitIndex;
      if (suitIndex === 0) {
        icon = '♥️';
      } else if (suitIndex === 1) {
        icon = '♦️';
      } else if (suitIndex === 2) {
        icon = '♣️';
      } else if (suitIndex === 3) {
        icon = '♠️';
      }

      let cardDisplayName = `${rankCounter}`;
      if (cardDisplayName === '1') {
        cardDisplayName = 'A';
      } else if (cardDisplayName === '11') {
        cardDisplayName = 'J';
      } else if (cardDisplayName === '12') {
        cardDisplayName = 'Q';
      } else if (cardDisplayName === '13') {
        cardDisplayName = 'K';
      }

      let cardColor = suitIndex;
      if (suitIndex === 0 || suitIndex === 1) {
        cardColor = 'red';
      } else {
        cardColor = 'black';
      }
      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: icon,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

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

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// function to capture max cards from input field
const capture = () => {
  // query select the id for input field
  const input = document.querySelector('#userInput');
  // assign value to maxCard
  maxCard = Number(input.value);
  // check that maxCard is a whole positive number
  if (Number.isInteger(maxCard) && maxCard > 0) {
    output(`You have selected ${maxCard} maximum cards.`);
  } else {
    output('Please submit a whole number');
  }
};

// function that will re-arrange the array such that the largest card is first, lowest is second.
// rest of cards will follow
const rearrange = (hand, draw) => {
  // to not run on first card draw
  if (hand.length === 0) {
    hand.push(draw);
  // determine if drawn card is the largest in array
  } else if (draw.rank > findLargest(hand).rank) {
  // if drawn card is largest then push the current largest card to back of array
  // replace 1st card with drawn card
    hand.push(hand[0]);
    hand.splice(0, 1, draw);
  // do the same for lowest card
  } else if (draw.rank < findLowest(hand).rank) {
    hand.push(hand[1]);
    hand.splice(1, 1, draw);
  } else {
    hand.push(draw);
  }
};

// function to run when player 1 button is hit.
const player1Click = () => {
  // to prevent drawing more than maxcards
  if (player1Hand.length < maxCard) {
    const player1Draw = deck.pop();
    // run the rearrange function
    rearrange(player1Hand, player1Draw);
    // display array in DOM elements
    cardContainer1.innerHTML = '';
    for (let i = 0; i < player1Hand.length; i += 1) {
      const cardElement = createCard(player1Hand[i]);
      cardContainer1.appendChild(cardElement);
    }
    console.log('player1Hand = ', player1Hand);
  } else {
    // error message when hitting beyond maxCards
    output('Player 1 cannot draw anymore cards');
  }
};

// same as player2
const player2Click = () => {
  if (player2Hand.length < maxCard) {
    const player2Card = deck.pop();
    rearrange(player2Hand, player2Card);
    cardContainer2.innerHTML = '';
    for (let i = 0; i < player2Hand.length; i += 1) {
      const cardElement = createCard(player2Hand[i]);
      cardContainer2.appendChild(cardElement);
    }
    console.log('player2Hand = ', player2Hand);
  } else {
    output('Player 2 cannot draw anymore cards');
  }
};

// function to decide the winner
const decideWinner = () => {
  // get player score which is diff between biggest and smallest card
  const player1Score = Number(findLargest(player1Hand).rank - findLowest(player1Hand).rank);
  const player2Score = Number(findLargest(player2Hand).rank - findLowest(player2Hand).rank);
  // console.log('Player 1 largest', findLargest(player1Hand));
  // console.log('Player 1 smallest', findLowest(player1Hand));
  console.log('player1Score', player1Score);

  // console.log('Player 2 largest', findLargest(player2Hand));
  // console.log('Player 2 smallest', findLowest(player2Hand));
  console.log('player2Score', player2Score);

  if (player1Score > player2Score) {
    output('Player 1 wins!!!!');
  } else if (player1Score < player2Score) {
    output('Player 2 wins!!!!');
  } else {
    output('Its a Tie....');
  }
};

// function to find lowest card in array
const findLowest = (hand) => {
  let smallestCard = hand[0];
  for (let i = 0; i < hand.length; i += 1) {
    if (smallestCard.rank > hand[i].rank) {
      smallestCard = hand[i];
    }
  }
  return smallestCard;
};

// function to find highest card in array
const findLargest = (hand) => {
  let biggestCard = hand[0];
  for (let i = 0; i < hand.length; i += 1) {
    if (biggestCard.rank < hand[i].rank) {
      biggestCard = hand[i];
    }
  }
  return biggestCard;
};

// const card = {
//         suitSymbol: icon,
//         suit: currentSuit,
//         name: cardName,
//         displayName: cardDisplayName,
//         colour: cardColor,
//         rank: rankCounter,
//       };

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  decideWinnerButton.innerText = 'Winner?';
  document.body.appendChild(decideWinnerButton);

  const divider = document.createElement('div');
  divider.innerHTML = '<br>';
  document.body.appendChild(divider);

  field.setAttribute('id', 'userInput');
  document.body.appendChild(field);

  submitButton.innerText = 'Submit';
  document.body.appendChild(submitButton);

  const divider2 = document.createElement('p');
  divider.innerHTML = '<br>';
  document.body.appendChild(divider2);
  gameInfo.innerText = 'Input maximum number of cards each player can draw';
  document.body.appendChild(gameInfo);

  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container');
  document.body.appendChild(cardContainer1);

  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container');
  document.body.appendChild(cardContainer2);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  decideWinnerButton.addEventListener('click', decideWinner);
  submitButton.addEventListener('click', capture);
};

initGame();
