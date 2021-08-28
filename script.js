// Please implement exercise logic here
/* ####################
## HELPER FUNCTIONS ##
#################### */

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

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
    } else {
      currentSymbol = '♦️';
    }

    // set the color of the card (used later to determine the css
    // class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
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

      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  console.log('a newDeck was created with cardInfo symbol, suit, name, colour and rank');
  return newDeck;
};

// build the card display, comprising of suit, name and card classList items
// these are then appended to the card element
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/* ####################
## GLOBAL VARIABLES ##
#################### */
const deck = shuffleCards(makeDeck());

let canClick = true;

let playersTurn = 1; // matches with starting instructions, Player 1 begins first
// let player1Card; // we let player1card here because it will be re-assigned
// let player1CardAgain;
// let player2Card;
// let player1CardAgain;

let cardContainerPlayer1;
let cardContainerPlayer2;// this is what we'll use later for displaying cards. also will be constantly modified so we let this too.

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');
gameInfo.id = 'game-info';

/* ##########################
## PLAYER ACTION CALLBACKS ##
########################### */
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    output("let's keep you waiting for no real reason at all!");
    // arbitrary 5-second delay in dealing cards
    setTimeout(() => {
      // getting player 1's card
      player1Card = deck.pop();

      // Create card element from card metadata
      const cardElement = createCard(player1Card);
      // Empty cardContainer in case this is not the 1st round of gameplay
      cardContainerPlayer1.innerHTML = '';
      cardContainerPlayer2.innerHTML = '';
      // Append the card element to the card container
      cardContainerPlayer1.appendChild(cardElement);
      output('player 1 has drawn their card - player 2, time to draw!');
      playersTurn = 2;
      canClick = true; },
    2000);// actual 5-second delay
  }

  if (playersTurn === 3) {
    // getting player 1's 2nd card
    player1CardAgain = deck.pop();

    // Create card element from card metadata
    const cardElement = createCard(player1CardAgain);
    // Empty cardContainer in case this is not the 1st round of gameplay
    // cardContainer.innerHTML = '';
    // Append the card element to the card container
    cardContainerPlayer1.appendChild(cardElement);
    output('player 1 has drawn their last card! player 2, time to draw your last card too!');

    playersTurn = 4;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    player2Card = deck.pop();

    // Create card element from card metadata
    const cardElement = createCard(player2Card);
    // Append card element to card container
    cardContainerPlayer2.appendChild(cardElement);
    output('player 2 has drawn their 1st card - player 1, time to draw your last card!');
    // Switch to player 1's turn
    playersTurn = 3; }

  if (playersTurn === 4) {
    player2CardAgain = deck.pop();

    // Create card element from card metadata
    const cardElement = createCard(player2CardAgain);
    // Append card element to card container
    cardContainerPlayer2.appendChild(cardElement);

    const player1SumRank = Math.abs(player1CardAgain.rank - player1Card.rank);
    const player2SumRank = Math.abs(player2CardAgain.rank - player2Card.rank);

    if (player1SumRank > player2SumRank) {
      output(`
        all cards are out! Let's see who won:

          player 1's greatest difference: ${player1SumRank}
          player 2's greatest difference: ${player2SumRank}

        PLAYER 1 WINS!! Player 2 basks in your victorious aura. Another round?
      `);
    } else if (player1SumRank < player2SumRank) {
      output(`
        all cards are out! Let's see who won:

          player 1's greatest difference: ${player1SumRank}
          player 2's greatest difference: ${player2SumRank} 

        PLAYER 2 WINS!! Player 1 basks in your victorious aura. Another round?`);
    } else {
      output(`
        all cards are out! Let's see who won:

          player 1's greatest difference: ${player1SumRank}
          player 2's greatest difference: ${player2SumRank} 

        it's a tie! another round?`);
    }

    // Switch to player 1's turn
    playersTurn = 1;

  // }
  }
};

/* #######################
## GAME INITIALISATION ##
####################### */
const initGame = () => {
  cardContainer = document.createElement('div');

  // create row1, append to main card container
  const row1 = document.createElement('div');
  row1.setAttribute('class', 'row');
  row1.innerText = "Player 1's Cards";
  cardContainer.appendChild(row1);

  // create card container for player 1, append to row 1
  cardContainerPlayer1 = document.createElement('div');
  cardContainerPlayer1.classList.add('card-container-player-1');
  row1.appendChild(cardContainerPlayer1);

  // create row 2, append to main card container
  const row2 = document.createElement('div');
  row2.setAttribute('class', 'row');
  row2.innerText = "Player 2's Cards";
  cardContainer.appendChild(row2);

  // create card container just for player 2 on row 2
  cardContainerPlayer2 = document.createElement('div');
  cardContainerPlayer2.classList.add('card-container-player-2');
  row2.appendChild(cardContainerPlayer2);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  player1Button.setAttribute('class', 'button');
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  player2Button.setAttribute('class', 'button');
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // append all the containers, rows and sub-containers to the document
  document.body.appendChild(cardContainer);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1's turn. Click to draw a card!";
  document.querySelector('h1').appendChild(gameInfo);
};

// ############################################################

// call the function that will initialise gameplay
initGame();
