// global variable record if round recently ended
let endRound = false;

// default card count to play with
let cardCount = 2;

// arrays to store card objects for players
let player1Cards = [];
let player2Cards = [];

// a general container
const container = document.createElement('div');

// a table with one row and two columns to contain cards
const cardTable = document.createElement('table');
const cardRow = document.createElement('tr');
const cardColOne = document.createElement('td');
const cardColTwo = document.createElement('td');

// a container to hold player buttons and input field
const buttonAndFieldContainer = document.createElement('div');
// create two buttons and input field
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const cardCountField = document.createElement('input');

// a container to hold game info
const infoContainer = document.createElement('div');
const gameInfo = document.createElement('p');

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

// Make a deck of cards
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    let currentSymbol = '';
    if (suitIndex === 0) {
      currentSymbol = '♥';
    } else if (suitIndex === 1) {
      currentSymbol = '♦';
    } else if (suitIndex === 2) {
      currentSymbol = '♣';
    } else if (suitIndex === 3) {
      currentSymbol = '♠';
    }

    let currentColor = '';
    if (suitIndex === 0 || suitIndex === 1) {
      currentColor = 'red';
    } else if (suitIndex === 2 || suitIndex === 3) {
      currentColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name and short name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // and set shortName to the abbreviation of ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      // and suit symbol, display name and color
      const card = {
        suitSymbol: currentSymbol,
        name: cardName,
        suit: currentSuit,
        displayName: shortName,
        color: currentColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// call makedeck then shufflecards and store in global variable deck
const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

// function to consume a cardObject and produce a card element
const makeCard = (cardObject) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const name = document.createElement('div');
  name.classList.add('name', cardObject.color);
  name.innerText = cardObject.displayName;
  card.appendChild(name);

  const suit = document.createElement('div');
  suit.classList.add('suit', cardObject.color);
  suit.innerText = cardObject.suitSymbol;
  card.appendChild(suit);

  return card;
};

// function to calculate the difference between the highest card
// and the lowest card in a hand
const calcDifference = (hand) => {
  const handRanks = [];
  for (let i = 0; i < hand.length; i += 1) {
    handRanks.push(hand[i].rank);
  }
  const handMax = Math.max(...handRanks);
  const handMin = Math.min(...handRanks);
  const handDif = handMax - handMin;
  return handDif;
};

// function to disable the input field
const disableCardCountField = () => {
  cardCountField.disabled = true;
  cardCount = Number(cardCountField.value);
};

// function to pop an object from deck and
// store in correct player
const drawCardObject = (player) => {
  let currentPlayer;
  if (player === 1) {
    currentPlayer = player1Cards;
  } else if (player === 2) {
    currentPlayer = player2Cards;
  }
  if (currentPlayer.length < cardCount) {
    currentPlayer.push(deck.pop());
  }
};

// function to disable correct player button
// when player has drawn max cards for round
const disablePlayerButton = (player) => {
  let currentPlayer;
  let currentButton;
  if (player === 1) {
    currentPlayer = player1Cards;
    currentButton = player1Button;
  } else if (player === 2) {
    currentPlayer = player2Cards;
    currentButton = player2Button;
  }
  if (currentPlayer.length === cardCount) {
    currentButton.disabled = true;
  }
};

// function to sort unshift and render all card elements of a player
const renderCardElements = (player) => {
  let currentPlayer;
  let currentCol;
  if (player === 1) {
    currentPlayer = player1Cards;
    currentCol = cardColOne;
  } else if (player === 2) {
    currentPlayer = player2Cards;
    currentCol = cardColTwo;
  }
  currentPlayer.sort((firstItem, secondItem) => firstItem.rank - secondItem.rank);
  currentPlayer.unshift(currentPlayer.pop());
  for (let i = 0; i < currentPlayer.length; i += 1) {
    const cardElement = makeCard(currentPlayer[i]);
    currentCol.appendChild(cardElement);
  }
};

// function to empty elements at end of round
const emptyRoundEnd = (player) => {
  let currentCol;
  if (player === 1) {
    currentCol = cardColTwo;
  } else if (player === 2) {
    currentCol = cardColOne;
  }
  if (endRound) {
    currentCol.innerText = '';
    gameInfo.innerText = '';
    endRound = false;
  }
};

// function to empty player elements to
// prevent duplicate render
const refreshCardCol = (player) => {
  let currentCol;
  if (player === 1) {
    currentCol = cardColOne;
  } else if (player === 2) {
    currentCol = cardColTwo;
  }
  currentCol.innerText = '';
};

// function to determine winner and reset for next round
const meetWinningConditions = () => {
  if (player2Cards.length === cardCount && player1Cards.length === cardCount) {
    if (calcDifference(player1Cards) > calcDifference(player2Cards)) {
      output(`Player 1 has a difference of ${calcDifference(player1Cards)} between their highest and lowest rank cards.<br>Player 2 has a difference of ${calcDifference(player2Cards)} between their highest and lowest rank cards.<br><br>Player 1 Wins!<br>Start a new round by choosing the number of cards and pressing a draw button.`);
    } else if (calcDifference(player1Cards) < calcDifference(player2Cards)) {
      output(`Player 1 has a difference of ${calcDifference(player1Cards)} between their highest and lowest rank cards.<br>Player 2 has a difference of ${calcDifference(player2Cards)} between their highest and lowest rank cards.<br><br>Player 2 Wins!<br>Start a new round by choosing the number of cards and pressing a draw button.`);
    } else {
      output(`Player 1 has a difference of ${calcDifference(player1Cards)} between their highest and lowest rank cards.<br>Player 2 has a difference of ${calcDifference(player2Cards)} between their highest and lowest rank cards.<br><br>It's a tie!<br>Start a new round by choosing the number of cards and pressing a draw button.`);
    }
    player1Cards = [];
    player2Cards = [];
    player1Button.disabled = false;
    player2Button.disabled = false;
    cardCountField.disabled = false;
    endRound = true;
  }
};

// function containing all functions called when player clicks
const callPlayerFunctions = (player) => {
  disableCardCountField();
  refreshCardCol(player);
  emptyRoundEnd(player);
  drawCardObject(player);
  renderCardElements(player);
  disablePlayerButton(player);
  meetWinningConditions();
};

// player 1's button function
const player1Click = () => {
  const player = 1;
  callPlayerFunctions(player);
};

// player 2's button function
const player2Click = () => {
  const player = 2;
  callPlayerFunctions(player);
};

// function to initialise game
const initGame = () => {
  container.id = 'container';
  document.body.appendChild(container);

  container.appendChild(cardTable);

  cardRow.id = 'card-container';
  cardTable.appendChild(cardRow);

  cardColOne.id = 'player-one';
  cardRow.appendChild(cardColOne);
  cardColTwo.id = 'player-two';
  cardRow.appendChild(cardColTwo);

  buttonAndFieldContainer.id = 'button-field-container';
  document.body.appendChild(buttonAndFieldContainer);

  player1Button.id = 'button-one';
  player1Button.classList.add('button');
  player1Button.innerText = 'Player 1 Draw';
  buttonAndFieldContainer.appendChild(player1Button);

  cardCountField.id = 'input-field';
  cardCountField.type = 'number';
  cardCountField.value = '2';
  cardCountField.min = '2';
  cardCountField.max = '6';
  buttonAndFieldContainer.appendChild(cardCountField);

  player2Button.id = 'button-two';
  player2Button.classList.add('button');
  player2Button.innerText = 'Player 2 Draw';
  buttonAndFieldContainer.appendChild(player2Button);

  infoContainer.id = 'info-container';
  document.body.appendChild(infoContainer);

  gameInfo.id = 'game-info';
  infoContainer.appendChild(gameInfo);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

// call to initialise game
initGame();
