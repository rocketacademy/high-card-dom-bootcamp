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

let cardContainer;

//global variable to keep track of whether new round
let isNewRound = true;

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    //set suitSymbol and color
    let symbol = "";
    let cardColour = "blue";
    if (currentSuit === "hearts") {
      symbol = "♥️";
      cardColour = "red";
    } else if (currentSuit === "diamonds") {
      symbol = "♦️";
      cardColour = "red";
    } else if (currentSuit === "clubs") {
      symbol = "♣️";
      cardColour = "black";
    } else if (currentSuit === "spades") {
      symbol = "♠️";
      cardColour = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        cardDisplayName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        cardDisplayName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        cardDisplayName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        cardDisplayName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const cardInfo = {
        suitSymbol: symbol,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Player 1 starts first
//let playersTurn = 1;

// Use let for playerCard object because playerCard will be reassigned
let player1Card;
let player2Card;

//keep track of the number of cards player will draw
let numOfCards = 0;

//arrays to store players cards
let player1CardArr = [];
let player2CardArr = [];


// create two buttons
const player1Button = document.createElement("button");
player1Button.innerText = "Player 1 Draw";
document.body.appendChild(player1Button);

const player2Button = document.createElement("button");
player2Button.innerText = "Player 2 Draw";
document.body.appendChild(player2Button);

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement("div");
gameInfo.innerText = "";
document.body.appendChild(gameInfo);

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

//function to display all cards
const displayCards = () => {
  
    //sort arrays from lowest to highest rank
  player1CardArr.sort((a,b) => {
    return a.rank - b.rank;
  });

  player2CardArr.sort((a,b) => {
    return a.rank - b.rank;
  });

   //swop the position of the highest card to the second position
  if (player1CardArr.length >2){
  [player1CardArr[1], player1CardArr[player1CardArr.length -1]] = [player1CardArr[player1CardArr.length -1], player1CardArr[1]];
  }

  if (player2CardArr.length >2){
  [player2CardArr[1], player2CardArr[player2CardArr.length -1]] = [player2CardArr[player2CardArr.length -1], player2CardArr[1]];
    }

    // Create card element from card metadata
    for (let i=0; i<player1CardArr.length; i+=1){
      const cardElement = createCard(player1CardArr[i]);
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
    }
  
    cardContainer.innerHTML += '<br>';

    for (let i=0; i<player2CardArr.length; i+=1){
      const cardElement = createCard(player2CardArr[i]);
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
    }
}

//function to determine the winner
const result = () => {
  let outputDisplay = '';
  
  let player1Diff = player1CardArr[1].rank - player1CardArr[0].rank;
  let player2Diff = player2CardArr[1].rank - player2CardArr[0].rank;

  if (player1CardArr.length == 1 || player2CardArr.length == 1) {
    outputDisplay = `Players need to have ${numOfCards} cards`;
  } else if (player1Diff > player2Diff){
    outputDisplay = 'Player 1 wins';
  } else if (player2Diff > player1Diff){
    outputDisplay = 'Player 2 wins';
  } else {
    outputDisplay = 'tie';
  }

  return outputDisplay;
}

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
const player1Click = () => {
  //if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    player1CardArr.push(player1Card);

    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = "";

    //call function to display all cards
    displayCards();
    
    // Switch to player 2's turn
    //playersTurn = 2;
 // }

    if (player1CardArr.length === numOfCards && player2CardArr.length === numOfCards){
    // Determine and output winner
    output(result());
    }
};

// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
const player2Click = () => {
  //if (playersTurn === 2) {
    // Pop player 2's card metadata from the deck
    player2Card = deck.pop();
    player2CardArr.push(player2Card);

    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = "";

    //call function to display all cards
    displayCards();

    // Switch to player 1's turn
    playersTurn = 1;

    if (player1CardArr.length === numOfCards && player2CardArr.length === numOfCards){
    // Determine and output winner
    output(result());
    }
  //}
};

//JS to build the card element
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add(cardInfo.suit, cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add(cardInfo.displayName);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

//process the input of the user to be the number of cards player draw
const acceptInput = () => {
  numOfCards = Number(inputField.value);
  const output = document.createElement("p");
  output.innerHTML = `Each player will have to draw ${numOfCards} cards`;
  document.body.appendChild(output);
}

//create input
const inputField = document.createElement("input");


//centralise our game initialisation into a single function called initGame
const initGame = () => {
  //create submit button
  const button = document.createElement("button");
  button.addEventListener("click", acceptInput);

  button.innerText = "submit";
  button.classList.add("button");

  document.body.appendChild(inputField);
  document.body.appendChild(button);

  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);

  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "";
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
  
};

initGame();
