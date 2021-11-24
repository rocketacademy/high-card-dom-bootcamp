/*####################
## GLOBAL VARIABLES that store game-wide data or DOM elements ##
####################*/

let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;
let player1CardElement = [];
let player2CardElement = [];
let player1Hand = [];
let player1Handcopy = [];
let player2Hand = [];
let player2Handcopy = [];
const buttonWrapper = document.createElement("div");
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");
let cardContainer1;
let cardContainer2;
let noOfCards;

//create user input field for number of cards
const inputWrapper = document.createElement("div");
const inputField = document.createElement("input");
const inputButton = document.createElement("button");

/*####################
## HELPER FUNCTIONS ##
####################*/
//auto generate 52 cards deck
const makeDeck = () => {
  let cardDeck = [];

  // Initialise an array of the 4 suit in our deck. We will loop over this array.
  const suit = [
    { suitsShape: "hearts", suitsSymbol: "♥️", suitsColour: "red" },
    { suitsShape: "diamond", suitsSymbol: "♦️", suitsColour: "red" },
    { suitsShape: "clubs", suitsSymbol: "♣️", suitsColour: "black" },
    { suitsShape: "spades", suitsSymbol: "♠️", suitsColour: "black" },
  ];

  // Loop over the suit array
  for (let value of suit) {
    // Store the current suit in a variable
    let currentSuit = value.suitsShape;
    let currentSymbol = value.suitsSymbol;
    let currentColour = value.suitsColour;

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      let displayName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name, set cardValue to 10 (for jack, queen, king) or 11 (for ace)
      if (rankCounter == 1) {
        cardName = "ace";
        displayName = "A";
      } else if (rankCounter == 11) {
        cardName = "jack";
        displayName = "J";
      } else if (rankCounter == 12) {
        cardName = "queen";
        displayName = "Q";
      } else if (rankCounter == 13) {
        cardName = "king";
        displayName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        display: displayName,
        colour: currentColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffleCards = (anArray) => {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < anArray.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(anArray.length);
    // Select the card that corresponds to randomIndex
    let randomCard = anArray[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = anArray[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    anArray[currentIndex] = randomCard;
    anArray[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return anArray;
};

const output = (message) => {
  gameInfo.innerText = message;
};

// get the greatest difference in rank between the highest and lowest card ranks in player hand.
const getGreatestDifference = (playerHand) => {
  return playerHand[0].rank - playerHand[noOfCards - 1].rank;
};

//execute make deck and shuffle
let deck = shuffleCards(makeDeck());

// sorting array
const sortArray = (anArray) => {
  anArray.sort(function (a, b) {
    return parseFloat(b.rank) - parseFloat(a.rank);
  });
};

// display card elements
const displayCard = (playerHand, cardContainer, playerCardElement) => {
  // Create card element from card metadata
  playerHand.forEach((playerCard) => {
    const cardElement = createCard(playerCard);
    playerCardElement.push(cardElement);
  });
  // Append the card element to the card container
  playerCardElement.forEach((element) => {
    cardContainer.appendChild(element);
  });

  return playerCardElement;
};

/*####################
## PLAYER ACTIONS CALLBACK ##
####################*/

const player1Click = () => {
  if (playersTurn === 1) {
    if (player1Handcopy.length < noOfCards) {
      // Pop player 1's card metadata from the deck
      player1Card = deck.pop();
      player1Hand.push(player1Card);
      player1Handcopy.push(player1Hand);
      displayCard(player1Hand, cardContainer1, player1CardElement);
      //clear playerHand and Element
      player1Hand = [];
      player1CardElement = [];
      // Switch to player 2's turn
      playersTurn = 2;
      output("Now it's player 2 turn");
    }
  }
};
const player2Click = () => {
  if (playersTurn === 2) {
    if (player2Handcopy.length < noOfCards) {
      // Pop player 2's card metadata from the deck
      player2Card = deck.pop();
      player2Hand.push(player2Card);
      player2Handcopy.push(player2Hand);
      displayCard(player2Hand, cardContainer2, player2CardElement);
      //clear playerHand and Element
      player2Hand = [];
      player2CardElement = [];
      // Switch to player 1's turn
      playersTurn = 1;
      output("Now it's player 1 turn");
    }
    if (player2Handcopy.length == noOfCards) {
      //clear container for the sorted display
      cardContainer1.innerHTML = "";
      cardContainer2.innerHTML = "";
      //flatten arrays
      player1Handcopy = player1Handcopy.flatMap((x) => x);
      player2Handcopy = player2Handcopy.flatMap((x) => x);
      //sort the array
      sortArray(player1Handcopy);
      sortArray(player2Handcopy);
      displayCard(player1Handcopy, cardContainer1, player1CardElement);
      displayCard(player2Handcopy, cardContainer2, player2CardElement);
      // Determine and output winner
      if (
        getGreatestDifference(player1Handcopy) >
        getGreatestDifference(player2Handcopy)
      ) {
        output("player 1 wins");
      } else if (
        getGreatestDifference(player1Handcopy) <
        getGreatestDifference(player2Handcopy)
      ) {
        output("player 2 wins");
      } else {
        output("tie");
      }
    }
  }
};

const clickLetsPlay = () => {
  noOfCards = inputField.value;
  inputField.value = "";
  gameInfo.innerText = `${noOfCards} cards \n\ Player 1 please start`;
  resetGame();
  return noOfCards;
};

/*####################
## GAME INITIALISATION ##
####################*/
const resetGame = () => {
  deck = shuffleCards(makeDeck());
  cardContainer1.innerHTML = "";
  cardContainer2.innerHTML = "";
  playersTurn = 1; // matches with starting instructions
  player1CardElement = [];
  player2CardElement = [];
  player1Hand = [];
  player1Handcopy = [];
  player2Hand = [];
  player2Handcopy = [];
};

const initGame = () => {
  // fill game info div with starting instructions
  gameInfo.classList.add("game-info");
  gameInfo.innerText = "Please enter the number of cards before starting game";
  document.body.appendChild(gameInfo);

  //initialize input field
  inputWrapper.classList.add("wrapper");
  inputField.classList.add("input-field");
  inputField.setAttribute("type", "number");
  inputField.setAttribute("max", 10);
  inputField.setAttribute("min", 1);
  inputButton.classList.add("button");
  inputField.placeholder = "Enter no of cards (max 10)";
  inputButton.innerText = "Let's play";
  document.body.appendChild(inputWrapper);
  inputWrapper.appendChild(inputField);
  inputWrapper.appendChild(inputButton);
  inputButton.addEventListener("click", clickLetsPlay);

  // Create card container element
  cardContainer1 = document.createElement("div");
  cardContainer1.classList.add("card-container");
  cardContainer1.innerText = "Player 1";
  cardContainer2 = document.createElement("div");
  cardContainer2.classList.add("card-container");
  cardContainer2.innerText = "Player 2";
  document.body.appendChild(buttonWrapper);
  document.body.insertBefore(cardContainer1, buttonWrapper);
  document.body.insertBefore(cardContainer2, buttonWrapper);
  // initialize button functionality
  buttonWrapper.classList.add("wrapper");
  player1Button.classList.add("button");
  player1Button.innerText = "Player 1 Draw";
  buttonWrapper.appendChild(player1Button);
  player2Button.classList.add("button");
  player2Button.innerText = "Player 2 Draw";
  buttonWrapper.appendChild(player2Button);
  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);
};

initGame();

// create the cards element
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suitSymbol;

  const cardName = document.createElement("div");
  cardName.setAttribute("id", "card");
  cardName.classList.add(cardInfo.display, cardInfo.colour);
  cardName.innerText = cardInfo.display;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(cardName);
  card.appendChild(suit);

  return card;
};
