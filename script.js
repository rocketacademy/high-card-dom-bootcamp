// Please implement exercise logic here

/*************************
 **** HELPER FUNCTIONS*****
 ***************************/

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

    //create new card symbol based on suits
    let cardSymbol;

    if (currentSuit == "hearts") {
      cardSymbol = "♥️";
    } else if (currentSuit == "diamonds") {
      cardSymbol = "♦️";
    } else if (currentSuit == "club") {
      cardSymbol = "♣️";
    } else {
      cardSymbol = "♠️";
    }

    //create new card color based on suits
    let cardColor;

    if (cardSymbol == "♣️" || cardSymbol == "♠️") {
      cardColor = "black";
    } else {
      cardColor = "red";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        shortName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        shortName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        shortName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        shortName = "K";
      }

      // Create a new card with the current name, suit, rank, suit symbol, color
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: cardSymbol,
        color: cardColor,
        displayName: shortName,
      };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }
  // Return the completed card deck
  return newDeck;
};

// Generate card display based on linkages to CSS
const makeCardDisplay = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add(cardInfo.displayName, cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

/*************************************
 ***GLOBAL Variables & new function***
 *************************************/
const deck = shuffleCards(makeDeck());

let player1Cards = [];
let player2Cards = [];
let NumSelection;

//Initialize gamemode with player1 turn and player1card
let playersTurn = 1;
let player1Card;

// Initialize cardContainer & displayContainer Variable;
let cardContainer;
let displayContainer;

// Initialize boolean variable to see if user has recently clicked
let canClick = true;

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement("div");
gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
document.body.appendChild(gameInfo);

// create two buttons for player1 & player2 to draw cards
const player1Button = document.createElement("button");
player1Button.innerText = "Player 1 Draw";
document.body.appendChild(player1Button);

const player2Button = document.createElement("button");
player2Button.innerText = "Player 2 Draw";
document.body.appendChild(player2Button);

/**********************
 *PLAYER ACTION CALLBACK
 **********************/
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    console.log(NumSelection);
    canClick = false;
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = "";
    setTimeout(() => {
      for (i = 0; i < NumSelection; i += 1) {
        player1Cards[i] = deck.pop();
      }
      playersTurn = 2;
      canClick = true;

      //sort card array before printing card display
      player1Cards.sort((a, b) => a.rank - b.rank);
      for (i = 0; i < NumSelection; i += 1) {
        //create card display by calling on the function
        const cardElement = makeCardDisplay(player1Cards[i]);

        // Append card element to card container for display in screen
        player1Container.appendChild(cardElement);
      }
    }, 1);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      for (i = 0; i < NumSelection; i += 1) {
        player2Cards[i] = deck.pop();
        console.log(player2Cards);
      }
      //sort card array before printing card display
      player2Cards.sort((a, b) => a.rank - b.rank);
      console.log(player2Cards);
      for (i = 0; i < NumSelection; i += 1) {
        //create card display by calling on the function
        const cardElement = makeCardDisplay(player2Cards[i]);

        // Append card element to card container for display in screen
        player2Container.appendChild(cardElement);
      }
      playersTurn = 1;
      canClick = true;

      calculateWinner();
    }, 1);
  }
};

let calculateWinner = () => {
  if (player1Cards.length > 1) {
    let player1Distance =
      player1Cards[NumSelection - 1].rank - player1Cards[0].rank;

    let player2Distance =
      player2Cards[NumSelection - 1].rank - player2Cards[0].rank;

    if (player1Distance > player2Distance) {
      output(
        `Player 1 difference is ${player1Distance}. <br> Player 2 difference is ${player2Distance} <br> Player 1 wins`
      );
    } else if (player1Distance < player2Distance) {
      output(
        `Player 1 difference is ${player1Distance}.<br> Player 2 difference is ${player2Distance} <br> Player 2 wins`
      );
    } else {
      output(
        `Player 1 difference is ${player1Distance}.<br> Player 2 difference is ${player2Distance}<br> It's a Tie`
      );
    }
  } else {
    if (player1Cards[0].rank > player2Cards[0].rank) {
      output("Player 1 wins");
    } else if (player1Cards[0].rank < player2Cards[0].rank) {
      output("Player 2 wins");
    } else {
      output("Tie");
    }
  }
};

/**********************
 ****** GAME INIT *****
 **********************/
const initGame = () => {
  //add cardContainer as a div with class ID and append to document body
  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);

  //create a input box container to display player 1 cards
  player1Container = document.createElement("div");
  player1Container.classList.add("playerContainer");  
  document.body.appendChild(player1Container);

  let node1 = document.createTextNode ('Player 1 Cards')
  player1Container.appendChild(node1)

  //create a input box container to display player 2 cards
  player2Container = document.createElement("div");
  player2Container.classList.add("playerContainer");
  document.body.appendChild(player2Container);

  let node2 = document.createTextNode ('Player 2 Cards')
  player2Container.appendChild(node2)

  const linebreak = document.createElement("br");
  document.body.append(linebreak);

  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  //dropdown selection for number of cards
  //to move cardsSelection and cardDropDownContainer to global once working
  const cardsSelection = [0, 1, 2, 3, 4, 5];
  let cardDropDownContainer;
  cardDropDownContainer = document.createElement("select");
  cardDropDownContainer.setAttribute("id", "dropdown");
  document.body.appendChild(cardDropDownContainer);
  for (i = 0; i < cardsSelection.length; i++) {
    let option = document.createElement("option");
    option.value = cardsSelection[i];
    option.text = cardsSelection[i];
    cardDropDownContainer.appendChild(option);
  }

  //create a input box container to display text
  displayContainer = document.createElement("div");
  displayContainer.classList.add("textContainer");
  document.body.appendChild(displayContainer);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its Player 1 turn. Click to draw a card!";
  displayContainer.appendChild(gameInfo);
};

//run function initgame to initialise
initGame();

/**********************
 *Logic for comfortable*
 **********************/
// Obtain dropdown selection value to draw # of cards

let cardDropDownContainer = document.getElementById("dropdown");

cardDropDownContainer.onchange = function () {
  NumSelection = cardDropDownContainer.value;
  console.log(NumSelection);
  return NumSelection;
};
