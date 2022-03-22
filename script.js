/*===============================================================
=========================HELPER FUNCTIONS========================
=================================================================*/

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

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === "hearts") {
      currentSymbol = "♥️";
    } else if (currentSuit === "spades") {
      currentSymbol = "♠️";
    } else if (currentSuit === "clubs") {
      currentSymbol = "♣️";
    } else {
      currentSymbol = "♦️";
    }

    // set the color of the card (used later to determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === "♥️" || currentSymbol === "♦️") {
      cardColor = "red";
    } else {
      cardColor = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
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
  return newDeck;
};

// build the card display
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add("name", cardInfo.color);
  name.innerText = cardInfo.name;

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

//function for user to input on number of cards to be used by players
const NumberOfCardsDrawn = () => {
  NumberOfCards.length = document.getElementById("input").value;
  console.log(`${NumberOfCards.length} cards for each player`);
};

//create function to compare the highest and lowest card in players hand.
const rankComparison = (cards) => {
  let maxRank = 100;
  let minRank = 0;
  for (i = 0; i < cards.length; i += 1) {
    if (cards[i].rank > minRank) {
      minRank = cards[i].rank;
    }
    if (cards[i].rank < maxRank) {
      maxRank = cards[i].rank;
    }
  }
  let rankDifference = Math.abs(maxRank - minRank);
  return rankDifference;
};

/*===============================================================
=========================GLOBAL VARIABLES========================
=================================================================*/
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions

let cardContainer;

//arrays to keep track of how many cards in players hand as per user input

const player1Card = [];
const player2Card = [];

//array to store the user input desired number of cards
const NumberOfCards = [];

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");

/*===============================================================
=====================PLAYER CALLBACK FUNCTIONS===================
=================================================================*/

const player1Click = () => {
  if (playersTurn === 1) {
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = "";
    setTimeout(() => {
      // loop
      for (let i = 0; i < NumberOfCards.length; i += 1) {
        // setTimeout for player 1 to draw cards

        // get player 1 cards
        player1Card[i] = deck.pop();
        player1Card.push(player1Card[i]);

        // Create card
        const cardElement = [];
        cardElement[i] = createCard(player1Card[i]);

        // Append the card element
        cardContainer.appendChild(cardElement[i]);
      }

      // Switch to player 2's turn
      playersTurn = 2;
    }, 200);
  }
  output(`Player 2 turn to draw cards`);
};

const player2Click = () => {
  if (playersTurn === 2) {
    setTimeout(() => {
      // loop
      for (let i = 0; i < NumberOfCards.length; i += 1) {
        // setTimeout for player1 to draw the cards

        // get player 2 cards
        player2Card[i] = deck.pop();
        player2Card.push(player2Card[i]);

        // Create card
        const cardElement = [];
        cardElement[i] = createCard(player2Card[i]);

        // Append the card element
        cardContainer.appendChild(cardElement[i]);
      }

      // Switch to player 1 turn
      playersTurn = 1;

      //outcome
      if (rankComparison(player1Card) > rankComparison(player2Card)) {
        output("player 1 wins");
        console.log(`Player 1 Rank: ${rankComparison(player1Card)}`);
        console.log(`Player 2 Rank: ${rankComparison(player2Card)}`);
      } else if (rankComparison(player1Card) < rankComparison(player2Card)) {
        output("player 2 wins");
        console.log(`Player 1 Rank: ${rankComparison(player1Card)}`);
        console.log(`Player 2 Rank: ${rankComparison(player2Card)}`);
      } else {
        output("tie");
        console.log(`Player 1 Rank: ${rankComparison(player1Card)}`);
        console.log(`Player 2 Rank: ${rankComparison(player2Card)}`);
      }
    }, 200);
  }
};

/*===============================================================
=====================GAME INITIALISATION=========================
=================================================================*/
const initGame = () => {
  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);

  //create a text field for user to input how many cards players are to have
  const cardNumberInput = document.createElement("input");
  cardNumberInput.setAttribute("id", "input");
  document.body.appendChild(cardNumberInput);
  cardNumberInput.placeholder = "input no. of cards to draw";

  // create a submit option for user to confirm no. of cards to draw
  const submitButton = document.createElement("button");
  submitButton.innerText = "submit";
  submitButton.setAttribute("id", "submit");
  document.body.appendChild(submitButton);
  submitButton.addEventListener("click", NumberOfCardsDrawn);
};

// call the function that will initialise gameplay
initGame();
