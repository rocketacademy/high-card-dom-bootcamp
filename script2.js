// Global set up
let shuffledDeck = [];
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");
const scoreBoard = document.createElement("div");

//player scores
let player1score = 0;
let player2score = 0;

//playerinfo objects
let player1_Info = {
  cards: [],
  highLowScore: 0,
  wins: 0,
};

let player2_Info = {
  cards: [],
  highLowScore: 0,
  wins: 0,
};

let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;

let countDraws1 = 0;
let countDraws2 = 0;

// global boolean to represent whether player has clicked
let canClick1 = true;
let canClick2 = true;

// //mainContainer DOM element as a global variable
let mainContainer;
mainContainer = document.createElement("div");
mainContainer.classList.add("container");
document.body.appendChild(mainContainer);

// // cardContainer DOM element as a global variable
// let cardContainer;
// cardContainer = document.createElement("div");
// cardContainer.classList.add("card-container");
// // append cardContainer to mainContainer
// document.body.appendChild(cardContainer);

// cardContainer1 DOM for player1card
let cardContainer1;
cardContainer1 = document.createElement("div");
cardContainer1.classList.add("card-container1");
//append cardContiner1 to cardContainer
mainContainer.appendChild(cardContainer1);

// cardContainer2 DOM for player1card
let cardContainer2;
cardContainer2 = document.createElement("div");
cardContainer2.classList.add("card-container2");
//append cardContiner2 to cardContainer
mainContainer.appendChild(cardContainer2);

// card information
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const symbols = ["♥", "♦", "♣", "♠"];

// Helper functions
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

const makeCard = (cardSuit, cardRank) => {
  let cardName = "";
  let cardDisplay = "";

  if (cardRank == 1) {
    cardName = "Ace";
    cardDisplay = "A";
  } else if (cardRank == 11) {
    cardName = "Jack";
    cardDisplay = "J";
  } else if (cardRank == 12) {
    cardName = "Queen";
    cardDisplay = "Q";
  } else if (cardRank == 13) {
    cardName = "King";
    cardDisplay = "K";
  } else {
    //Default:
    cardName = cardRank;
    cardDisplay = cardRank;
  }

  //create cardInfo object
  const cardInfo = {
    suitSymbol: symbols[cardSuit],
    suit: suits[cardSuit],
    name: cardName,
    displayName: cardDisplay,
    colour: "red",
    rank: cardRank,
  };

  console.log(cardInfo);

  //return cardInfo object
  return cardInfo;
};

const makeDeck = () => {
  let newDeck = [];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Loop over 13 ranks
    for (let rankIndex = 0; rankIndex < 13; rankIndex++) {
      const cardInfo = makeCard(suitIndex, rankIndex + 1);
      console.log(
        `getting card info for suitIndex ${suitIndex} and rankIndex ${rankIndex}`
      );

      // Add the new card object to the deck
      newDeck.push(cardInfo);
    }
  }
  // Return the completed card deck (i.e. an array of card DOM objects)
  return newDeck;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const scoreboardOutput = (score1, score2) => {
  scoreBoard.innerText = `Scoreboard: Player 1: ${score1}  Player 2: ${score2}`;
};

const highLowScore = (playerInfo) => {
  //get the cards array from playerInfo object
  let cardsArray = playerInfo.cards;
  console.log(cardsArray);
  // New variable to store card with highest rank
  let highestCard = "";
  // New variable to store card with lowest rank
  let lowestCard = "";
  let currentCard = "";
  //sort cards by rank
  let highestRank = 0;
  let lowestRank = 13;
  for (i = 0; i < cardsArray.length; i++) {
    currentCard = cardsArray[i];
    console.log("current card:");
    console.log(currentCard);
    if (currentCard.rank > highestRank) {
      highestRank = currentCard.rank;
    }
    if (currentCard.rank < lowestRank) {
      lowestRank = currentCard.rank;
    }
  }
  const highLowScore = highestRank - lowestRank;
  return highLowScore;
};

// Player action call backs
const player1Click = () => {
  if (playersTurn === 1 && canClick1 === true) {
    //switch back canClick to false
    canClick11 = false;

    // Set timeout

    setTimeout(() => {
      // Pop player 1's card metadata from the deck
      player1Card = shuffledDeck.pop();
      // If player already has 2 cards, empty cards aray from player1_info
      if (player1_Info.cards.length == 2) {
        player1_Info.cards = [];
      }
      // Otherwise, push new card into the cards array of player1_info
      player1_Info.cards.push(player1Card);

      // Create card element from card metadata: create card DOM object - create suit and cardName elements, and append them to card element
      const suit = document.createElement("div");
      suit.classList.add("suit");
      suit.innerText = player1Card.suitSymbol;

      const name = document.createElement("div");
      console.log(`display name of card: ${player1Card.displayName}`);
      console.log(`colour of card: ${player1Card.colour}`);
      name.classList.add("name", player1Card.colour);
      name.innerText = player1Card.displayName;

      const card = document.createElement("div");
      card.classList.add("card");

      card.appendChild(name);
      card.appendChild(suit);

      // If two cards are drawn already, empty cardContainer1
      if (countDraws1 == 2) {
        //empty cardContainer1
        cardContainer1.innerHTML = "";
        //reset countdraws1
        countDraws1 = 0;
      }

      // Increment countDraws1
      countDraws1 += 1;

      // If player1 has drawn two cards already, calculate highlowscore and assign it to highLowScore key in player1_Info
      if (countDraws1 == 2) {
        player1_Info.highLowScore = highLowScore(player1_Info);
      }

      // If player2 has drawn two cards already, empty cardContainer2
      if (countDraws2 == 2) {
        cardContainer2.innerHTML = "";
      }

      // display the card on cardcontainer1
      cardContainer1.appendChild(card);

      // Switch to player 2's turn
      playersTurn = 2;

      // Set canClick1 to true
      canClick1 = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick2 === true) {
    canClick2 = false;

    setTimeout(() => {
      player2Card = shuffledDeck.pop();
      playersTurn = 1;

      // If player already has 2 cards, empty cards aray from player1_info
      if (player2_Info.cards.length == 2) {
        player2_Info.cards = [];
      }
      // Otherwise, push new card into the cards array of player1_info
      player2_Info.cards.push(player2Card);

      // Create card element from card metadata: create card DOM object - create suit and cardName elements, and append them to card element
      const suit = document.createElement("div");
      suit.classList.add("suit");
      suit.innerText = player2Card.suitSymbol;

      const name = document.createElement("div");
      console.log(`display name of card: ${player2Card.displayName}`);
      console.log(`colour of card: ${player2Card.colour}`);
      name.classList.add("name", player2Card.colour);
      name.innerText = player2Card.displayName;

      const card = document.createElement("div");
      card.classList.add("card");

      card.appendChild(name);
      card.appendChild(suit);

      // If two cards are drawn already, empty cardContainer2
      if (countDraws2 == 2) {
        //empty cardContainer1
        cardContainer2.innerHTML = "";
        //reset countdraws1
        countDraws2 = 0;
      }

      // Increment countDraws2
      countDraws2 += 1;

      // If player2 has drawn two cards already, calculate highlowscore and assign it to highLowScore key in player1_Info
      if (countDraws2 == 2) {
        player2_Info.highLowScore = highLowScore(player2_Info);
      }

      // display the card
      cardContainer2.appendChild(card);

      // winning conditions
      // If player1card has a higher highlowscore, output that they win and increment score
      if (player1_Info.highLowScore > player2_Info.highLowScore) {
        output("player 1 wins");
        player1score += 1;
        //scoreboardOutput(player1score, player2score);
      } else if (player1_Info.highLowScore < player2_Info.highLowScore) {
        output("player 2 wins");
        player2score += 1;
        //scoreboardOutput(player1score, player2score);
      } else {
        output("tie");
      }
      //Update scoreboard output
      scoreboardOutput(player1score, player2score);

      // Set canClick2 to true
      canClick2 = true;
    }, 2000);
  }
};

// Game initialisation
const initGame = () => {
  // Make deck
  const newDeck = makeDeck();

  // Shuffle deck
  shuffledDeck = shuffleCards(newDeck);

  // initialize button functionality
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  mainContainer.appendChild(buttonContainer);

  player1Button.innerText = "Player 1 Draw";
  buttonContainer.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  buttonContainer.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1's turn. Click to draw a card!";
  gameInfo.classList.add("output");
  mainContainer.appendChild(gameInfo);

  // const buttonContainer2 = document.createElement("div");
  // buttonContainer2.classList.add("button-container");
  // cardContainer2.appendChild(buttonContainer2);
};

initGame();

// Output scoreboard
scoreBoard.classList.add("score-board");
mainContainer.appendChild(scoreBoard);
