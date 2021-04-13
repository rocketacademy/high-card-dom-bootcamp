/* ====================== GLOBAL============================= */
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");
const player1Container = document.querySelector(".player-1-container ");
const player2Container = document.querySelector(".player-2-container ");
const player1CardPlacement = document.querySelector(".player-1-card");
const player2CardPlacement = document.querySelector(".player-2-card");
const player1Scoreboard = document.querySelector(".player-1-score");
const player2Scoreboard = document.querySelector(".player-2-score");
let cardContainer = document.querySelector(".card-container");
let cardsLeft = document.querySelector(".cardsLeft");
let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;
let player1Score = 0;
let player2Score = 0;

/* ================== HELPER FUNCTIONS======================= */
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
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let cardSuitSymbol = "";
    // if hearts or diamonds
    if (["hearts", "diamonds"].includes(currentSuit)) {
      cardColor = "red";
      if (currentSuit === "hearts") {
        cardSuitSymbol = "❤";
      } else {
        cardSuitSymbol = "♦";
      }
    } else {
      cardColor = "black";
      if (currentSuit === "clubs") {
        cardSuitSymbol = "♣";
      } else {
        cardSuitSymbol = "♠";
      }
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        cardDisplay = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        cardDisplay = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        cardDisplay = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        cardDisplay = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: cardSuitSymbol,
        display: cardDisplay,
        color: cardColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const showPlayerTurn = (player) => {
  const cardsLeftInDeck = deck.length;
  cardsLeft.innerHTML = `Cards left: ${cardsLeftInDeck}`;
  if (player === 1) {
    playersTurn = 1;
    player2Container.classList.remove("player-turn");
    player1Container.classList.add("player-turn");
    player2Button.classList.add("hidden");
    player1Button.classList.remove("hidden");
    output("Its player 1's turn. Click to draw a card!");
  } else {
    playersTurn = 2;
    player1Container.classList.remove("player-turn");
    player2Container.classList.add("player-turn");
    player1Button.classList.add("hidden");
    player2Button.classList.remove("hidden");
    output("Its player 2's turn. Click to draw a card!");
  }
};

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add(cardInfo.color);
  name.innerText = cardInfo.display;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

//PLAYER ACTION CALL BACKS
const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    const cardElement = createCard(player1Card);
    console.log(cardElement);
    // in case this is not the 1st time in the entire app empty the card container
    player1CardPlacement.innerHTML = "";
    //display card
    player1CardPlacement.appendChild(cardElement);
    //switch players
    showPlayerTurn(2);
  }
};
const player2Click = () => {
  if (playersTurn === 2) {
    player2Card = deck.pop();
    const cardElement = createCard(player2Card);
    console.log(cardElement);
    // in case this is not the 1st time in the entire app empty the card container
    player2CardPlacement.innerHTML = "";
    //display card
    player2CardPlacement.appendChild(cardElement);
    //switch players
    showPlayerTurn(1);

    if (player1Card.rank > player2Card.rank) {
      output("Player 1 wins");
      player1Score += 1;
      player1Scoreboard.innerHTML = `Score: ${player1Score}`;
    } else if (player1Card.rank < player2Card.rank) {
      output("Player 2 wins");
      player2Score += 1;
      player2Scoreboard.innerHTML = `Score: ${player2Score}`;
    } else {
      output("Tie");
    }
  }
};

// Game init
const deck = shuffleCards(makeDeck());
const initGame = () => {
  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  player1Button.classList.add("btn-draw-card", "player-1-draw");
  document.querySelector(".player-1-container").appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  player2Button.classList.add("btn-draw-card", "player-2-draw", "hidden");
  document.querySelector(".player-2-container").appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1's turn. Click to draw a card!";
  gameInfo.classList.add("gameInfo");
  document.querySelector(".main-container").appendChild(gameInfo);
};

initGame();
