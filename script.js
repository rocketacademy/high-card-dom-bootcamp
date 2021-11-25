/**
 * Create a card element
 * @param {*} cardInfo Metadata of a card
 * @returns Card element
 */
const createCard = (cardInfo) => {
  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const player1CardList = document.createElement('div');
const player2CardList = document.createElement('div');
const playerInputBox = document.createElement('input');

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Shuffle an array of cards
 * @param {*} cards Deck of cards
 * @returns Shuffled cards
 */
const shuffleCards = (cards) => {
  const shuffledCards = cards;

  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    shuffledCards[currentIndex] = randomCard;
    shuffledCards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return shuffledCards;
};

/**
 * Make a new card deck
 * @returns An array of cards
 */
const createDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitsSymbol = ['♥️', '♦️', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplayName = 'K';
      }

      let cardColour = 'black';
      if ((suits[suitIndex] === 'hearts') || (suits[suitIndex] === 'diamonds')) {
        cardColour = 'red';
      }

      // Create a new card info with the suit symbol ('♦️'), suit ('diamond'),
      // name ('queen'), display name ('Q'), colour ('red'), and rank (12).
      const card = {
        suitSymbol: suitsSymbol[suitIndex],
        suit: suits[suitIndex],
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

let deck = shuffleCards(createDeck());

const player1Cards = [];
const player2Cards = [];

const player1Button = document.createElement('button');
const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');

// Default number of cards per player
let playerNumOfCards = 1;

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/**
 * Print out results
 * @param {*} player1Score Score for player 1
 * @param {*} player2Score Score for player 2
 */
const printResult = (player1Score, player2Score) => {
  if (player1Score > player2Score) {
    output('Player 1 Wins!');
  } else if (player1Score < player2Score) {
    output('Player 2 Wins!');
  } else {
    output('Tie!');
  }

  // Print players' scores
  document.getElementById('player-1-card-list-title').innerText += ` (Score: ${player1Score})`;
  document.getElementById('player-2-card-list-title').innerText += ` (Score: ${player2Score})`;
};

/**
 * Function to sort array by card rank
 * @param {*} a First number
 * @param {*} b Second number
 * @returns Compare function
 */
const compareNumbers = (a, b) => a.rank - b.rank;

/**
 * Determine winner between the players
 */
const determineWinner = () => {
  let player1Score = 0;
  let player2Score = 0;

  // Get player's scores
  if (playerNumOfCards === 1) {
    player1Score = player1Cards[0].rank;
    player2Score = player2Cards[0].rank;
  } else {
    player1Cards.sort(compareNumbers);
    player1Score = player1Cards[player1Cards.length - 1].rank - player1Cards[0].rank;

    player2Cards.sort(compareNumbers);
    player2Score = player2Cards[player2Cards.length - 1].rank - player2Cards[0].rank;
  }

  printResult(player1Score, player2Score);
};

/**
 * Add card in to player's card list
 * @param {*} playerNum Number of the player who draws a card
 * @param {*} playerCard New card
 */
const addCardOnList = (playerNum, playerCard) => {
  // Create card element from card metadata
  const cardElement = createCard(playerCard);

  // Get card list for player
  const cardListContainer = document.getElementById(`player-${playerNum}-card-list`);

  // Add card to the end of player's card list
  cardListContainer.appendChild(cardElement);
};

/**
 * Arrange displayed cards for players
 * @param {*} playerNum Number of the player
 */
const arrangeCardsDisplay = (playerNum) => {
  // Copy cards into another array in preparation for sorting
  const sortedCards = (playerNum === 1) ? player1Cards.slice() : player2Cards.slice();

  if (playerNum === 1) {
    // Only need to do rearranging of cards when there are more than 2 cards
    if (player1Cards.length > 2) {
      player1CardList.innerHTML = '';

      // Sort the cards to get high/low rank cards easier
      sortedCards.sort(compareNumbers);

      // Print out the highest and lowest rank cards
      addCardOnList(playerNum, sortedCards[0]);
      addCardOnList(playerNum, sortedCards[sortedCards.length - 1]);

      // Print out the rest of the cards
      for (let i = 1; i < sortedCards.length - 1; i += 1) {
        addCardOnList(1, sortedCards[i]);
      }
    } else {
      addCardOnList(playerNum, player1Cards[player1Cards.length - 1]);
    }
  } else if (player2Cards.length > 2) {
    player2CardList.innerHTML = '';

    // Sort the cards to get high/low rank cards easier
    sortedCards.sort(compareNumbers);

    // Print out the highest and lowest rank cards
    addCardOnList(playerNum, sortedCards[0]);
    addCardOnList(playerNum, sortedCards[sortedCards.length - 1]);

    // Print out the rest of the cards
    for (let j = 1; j < sortedCards.length - 1; j += 1) {
      addCardOnList(playerNum, sortedCards[j]);
    }
  } else {
    addCardOnList(playerNum, player2Cards[player2Cards.length - 1]);
  }
};

/**
 * Deal card from the deck to the player
 * @param {*} playerNum Number of the player to deal the card to
 */
const dealCardToPlayer = (playerNum) => {
  // Pop player's card metadata from the deck
  const playerCard = deck.pop();

  // Push dealt card to player card array
  if (playerNum === 1) player1Cards.push(playerCard);
  else player2Cards.push(playerCard);
};

/**
 * Is it start of the game?
 * @returns True, if it's start of game. False, otherwise.
 */
const isStartOfGame = () => ((player1Cards.length === 0)
  && (player2Cards.length === 0));

/**
 * Is it end of the game?
 * @returns True, if it's end of game. False, otherwise.
 */
const isEndOfGame = () => ((player1Cards.length === playerNumOfCards)
  && (player2Cards.length === playerNumOfCards));

/**
 * Do preparation at the start of the game
 */
const prepareGame = () => {
  playerInputBox.disabled = true;

  // Set number of cards
  const numOfCardsElement = document.getElementById('numOfCards');
  if (numOfCardsElement.value === '') playerInputBox.value = playerNumOfCards;
  playerNumOfCards = parseInt(numOfCardsElement.value, 10);

  // Automatically change number of cards if input is out of range
  if (playerNumOfCards < 1) {
    playerNumOfCards = 1;
  } else if (playerNumOfCards > 5) {
    playerNumOfCards = 5;
  }

  // Re-set number of cards after parsing
  document.getElementById('numOfCards').value = playerNumOfCards;

  // Reset deck and shuffle again
  deck = shuffleCards(createDeck());
};

/**
 * Reset screen to beginning of the game
 */
const resetScreen = () => {
  player1CardList.innerHTML = '';
  player2CardList.innerHTML = '';

  output('Draw a card!');

  document.getElementById('player-1-card-list-title').innerText = 'Player 1 Cards';
  document.getElementById('player-2-card-list-title').innerText = 'Player 2 Cards';
};

/**
 * Handle players' draw button click
 * @param {*} playerNum Number of the player who clicks the draw button
 */
const playerClick = (playerNum) => {
  if (isStartOfGame()) {
    prepareGame();
    resetScreen();
  }

  // Check if player 1 has all the cards
  if ((playerNum === 1) && (player1Cards.length === playerNumOfCards)) {
    output(`Player ${playerNum} already has ${playerNumOfCards} card(s)!`);
    return;
  }

  // Check if player 2 has all the cards
  if ((playerNum === 2) && (player2Cards.length === playerNumOfCards)) {
    output(`Player ${playerNum} already has ${playerNumOfCards} card(s)!`);
    return;
  }

  dealCardToPlayer(playerNum);
  arrangeCardsDisplay(playerNum);

  if (isEndOfGame()) {
    determineWinner();

    playerInputBox.disabled = false;
    player1Cards.length = 0;
    player2Cards.length = 0;
  }
};

/**
 * Initialize the game at the very beginning
 */
const initalizeGame = () => {
  // Prepare game box area
  const gameBoxDiv = document.createElement('div');
  gameBoxDiv.classList.add('game-box-div');

  // Initialize player 1 card list area
  player1CardList.setAttribute('id', 'player-1-card-list');
  player1CardList.classList.add('card-container');

  // Set player 1 card list area title
  const player1CardListTitle = document.createElement('div');
  player1CardListTitle.setAttribute('id', 'player-1-card-list-title');
  player1CardListTitle.classList.add('card-container-title');
  player1CardListTitle.innerText = 'Player 1 Cards';

  // Add player 1 card list area to body
  gameBoxDiv.appendChild(player1CardListTitle);
  gameBoxDiv.appendChild(player1CardList);

  // Initialize player 2 card list area
  player2CardList.setAttribute('id', 'player-2-card-list');
  player2CardList.classList.add('card-container');

  // Set player 2 card list area title
  const player2CardListTitle = document.createElement('div');
  player2CardListTitle.setAttribute('id', 'player-2-card-list-title');
  player2CardListTitle.classList.add('card-container-title');
  player2CardListTitle.innerText = 'Player 2 Cards';

  // Add player 2 card list area to body
  gameBoxDiv.appendChild(player2CardListTitle);
  gameBoxDiv.appendChild(player2CardList);

  // Fill game info div with starting instructions
  gameInfo.innerText = 'Draw a card!';
  gameInfo.classList.add('game-info');
  gameBoxDiv.appendChild(gameInfo);

  document.body.appendChild(gameBoxDiv);

  // Prepare input box area
  const inputDiv = document.createElement('div');
  inputDiv.classList.add('input-div');

  // Initialize input box to get how many cards per player
  playerInputBox.setAttribute('id', 'numOfCards');
  playerInputBox.setAttribute('placeholder', 'How many cards? (1-5)');
  playerInputBox.classList.add('input');
  inputDiv.appendChild(playerInputBox);
  document.body.appendChild(inputDiv);

  // Prepare buttons box area
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons-div');

  // Initialize draw button for player 1
  player1Button.innerText = 'Player 1 Draw';
  player1Button.classList.add('button');
  player1Button.addEventListener('click', () => playerClick(1));
  buttonsDiv.appendChild(player1Button);

  // Initialize draw button for player 2
  player2Button.innerText = 'Player 2 Draw';
  player2Button.classList.add('button');
  player2Button.addEventListener('click', () => playerClick(2));
  buttonsDiv.appendChild(player2Button);

  document.body.appendChild(buttonsDiv);
};
initalizeGame();
