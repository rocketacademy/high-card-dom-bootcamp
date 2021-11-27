// Please implement exercise logic here
// High/Low Card
// players can draw multiple cards each
// the winner is the player who has the greatest difference beween the highest
// and lowest cards in hand
// player's cards are displayed in a row
// global variables
let playersTurn = 1; // matches with starting instructions
let player1Card;
// create the array to store the player's hands
const player1hand = [];
const player2hand = [];

const player1Button = document.createElement('button');
// player 1 variables
const player1div = document.createElement('div');
player1div.classList.add('player1container');
// document.body.appendChild(player1div);

let player1highcard = 0;
let player1lowcard = 0;
let player1difference = 0;

const player2Button = document.createElement('button');
// player 2 variables
const player2div = document.createElement('div');
// div to store the draw buttons
let drawButtonsContainer = document.createElement("div");

player2div.classList.add('player2container');
// document.body.appendChild(player2div);
let player2highcard = 0;
let player2lowcard = 0;
let player2difference = 0;

const gameInfo = document.createElement('div');

// create submit button
let inputContainer = document.createElement("div");
const cbtn = document.createElement("BUTTON");
cbtn.innerHTML = "Submit";

let box = document.createElement("INPUT");
box.setAttribute("type", "text");
inputContainer.appendChild(box);
inputContainer.appendChild(cbtn);
document.body.appendChild(inputContainer);

let cardsNum = 0;
cbtn.addEventListener("click", function () {
  cardsNum = box.value;
  gameInfo.innerText = `Hi Players, please draw ${cardsNum} cards (Card takes 2 seconds to load)`;
  inputContainer.style.display = "none";
  drawButtonsContainer.style.display = "block";
});

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// display message using 
const output = (message) => {
  gameInfo.innerText = message;
};

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
  let cardColor = '';
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
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      if (currentSuit === 'diamonds') {
        symbol = '♦';
        cardColor = 'red';
      } else if (currentSuit === 'clubs') {
        symbol = '♣';
        cardColor = 'black';
      } else if (currentSuit === 'hearts') {
        symbol = '♥';
        cardColor = 'red';
      } else if (currentSuit === 'spades') {
        symbol = '♠';
        cardColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
        symbol,
      };
      // console.log(card);

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
// function to store the metainfo of the drawn card
const createCard = (cardInfo) => {
  console.log('card info:', cardInfo);
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  if (cardInfo.color === 'red') {
    card.classList.add('red');
  }

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const deck = shuffleCards(makeDeck());

// Player Action Callbacks
const player1Click = () => {

  if (playersTurn === 1) {
    output(`Player 2 Draw!`)
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    player1hand.push(player1Card);
    // Append the card element to the card container
    // clear the player's div
    player1div.innerHTML = '';
    // sort the player1 hand
    player1hand.sort((a,b) => a.rank - b.rank)
    player1temphighcard = player1hand.pop();
    player1hand.unshift(player1temphighcard);
    // do a for loop to append it to player1div
    for (let i=0; i < player1hand.length; i+=1) {
      const cardElement = createCard(player1hand[i]);
      player1div.appendChild(cardElement)
    }

    if (player1highcard === 0 && player1lowcard === 0) {
      player1highcard = player1Card;
      player1lowcard = player1Card;
    }

    if (player1Card.rank > player1highcard.rank) {
      player1highcard = player1Card;
    }
    // compare with the global variable player1lowcard to get the lowest card
    if (player1Card.rank < player1lowcard.rank) {
      player1lowcard = player1Card;
    }
    console.log(player1highcard);
    console.log(player1lowcard);

    // find the difference between the high card and low card
    player1difference = player1highcard.rank - player1lowcard.rank;
    console.log(player1difference);
    playersTurn = 2;
  }
};

const player2Click = () => {

  if (playersTurn === 2) {
    output(`Player 1 Draw!`)
    // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    // push the card player has drawn into the player1hand array
    player2hand.push(player2Card);
    player2div.innerHTML = '';
    // sort the player1 hand
    player2hand.sort((a,b) => a.rank - b.rank)
    let player2temphighcard = player2hand.pop();
    player2hand.unshift(player2temphighcard);

    // do a for loop to append it to player1div
    for (let j=0; j < player2hand.length; j+=1) {
      const cardElement = createCard(player2hand[j]);
      player2div.appendChild(cardElement)
    }

    // Append card element to card container
    if (player2highcard === 0 && player2lowcard === 0) {
      player2highcard = player2Card;
      player2lowcard = player2Card;
    }

    if (player2Card.rank > player2highcard.rank) {
      player2highcard = player2Card;
    }
    // compare with the global variable player1lowcard to get the lowest card
    if (player2Card.rank < player2lowcard.rank) {
      player2lowcard = player2Card;
    }
    // find the difference between the high card and low card
    player2difference = player2highcard.rank - player2lowcard.rank;
    console.log(player2difference);

    if (player2hand.length < cardsNum ){
    // Switch to player 1's turn
    playersTurn = 1;
    } 
    
    if (player2hand.length >= cardsNum){
      if (player1difference > player2difference) {
        output(`Player 1 Win! Player 1 Difference is ${player1difference}. Player 2 Difference is ${player2difference}.`)
      }
      if (player2difference > player1difference) {
        output(`Player 2 Win! Player 1 Difference is ${player1difference}.Player 2 Difference is ${player2difference}.`)
      }
      if (player1difference === player2difference){
        output(`Its a tie. The difference for both is ${player2difference}.`)
      }
    }
  }
};

const initGame = (input) => {

  document.body.appendChild(player1div);
  document.body.appendChild(player2div);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  drawButtonsContainer.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  drawButtonsContainer.appendChild(player2Button);
  document.body.appendChild(drawButtonsContainer);
  drawButtonsContainer.style.display = "none";

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  gameInfo.innerText = 'Please key in the number of cards (1 to 5) each player has to draw!';
  document.body.appendChild(gameInfo);

};

initGame();