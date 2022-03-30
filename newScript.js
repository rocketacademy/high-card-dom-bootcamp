/*
 * ========================================================
 * ========================================================
 *
 *        Global Variables
 *
 * ========================================================
 * ========================================================
 */

let deck;
let playersTurn = 1;
let player1Card;
let player2Card;
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const messageInterface = document.createElement('div');
const gameInterface = document.createElement('div');
const buttonContainer = document.createElement('div');

/*
 * ========================================================
 * ========================================================
 *
 *        Helper Functions
 *
 * ========================================================
 * ========================================================
 */

/**
 * Function that gets a random integer based on length of input array
 * To be used in shuffleCard function
 * @param {array} max
 * @returns not needed because single line
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function that shuffles an array of card objects based on their index positions
 * @param {array} cards
 */
const shuffleCards = (cards) => {
  for (let i = 0; i < cards.length; i += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[i];

    // Logic that switches positions of cards
    cards[i] = randomCard;
    cards[randomIndex] = currentCard;
  }

  return cards;
};
/**
 * Function that instantiates a deck array of card objects
 * @returns newDeck = [...cards]
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['♥️', '♦️', '♣️', '♠️'];
  for (let i = 0; i < suits.length; i += 1) {
    const currentSuit = suits[i];
    for (let j = 1; j <= 13; j += 1) {
      let cardName = `${j}`;
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: j,
      };
      newDeck.push(card);
    }
  }
  return newDeck;
};

/**
 * Function that prints an output message
 *
 */
const printGameMessage = (message) => { messageInterface.innerText = message; };

/*
 * ========================================================
 * ========================================================
 *
 *        Button Callback Functions
 *
 * ========================================================
 * ========================================================
 */

const handlePlayer1Click = () => {
  player1Card = deck.pop();
  playersTurn = 2;
};

const handlePlayer2Click = () => {
  player2Card = deck.pop();
  playersTurn = 1;

  if (player1Card.rank > player2Card.rank) {
    printGameMessage('player 1 wins');
  } else if (player1Card.rank < player2Card.rank) {
    printGameMessage('player 2 wins');
  } else { printGameMessage('it\'s a tie'); }
};

/*
 * ========================================================
 * ========================================================
 *
 *        Game Function
 *
 * ========================================================
 * ========================================================
 */
const initGame = () => {
  deck = shuffleCards(makeDeck());

  document.body.append(messageInterface, gameInterface, buttonContainer);
  buttonContainer.append(player1Button, player2Button);
  player1Button.addEventListener('click', handlePlayer1Click);
  player2Button.addEventListener('click', handlePlayer2Click);

  messageInterface.innerText = 'It\'s player 1\'s turn. Click to draw a card!';
};

/*
 * ========================================================
 * ========================================================
 *
 *        Sandbox
 *
 * ========================================================
 * ========================================================
 */
const form = document.createElement('form');
document.body.appendChild(form);

const button = document.createElement('button');
button.value = 'index';
button.innerText = 'click me!';
button.className = 'demo';
button.addEventListener('click', (event) => console.log(form.value));
form.appendChild(button);
