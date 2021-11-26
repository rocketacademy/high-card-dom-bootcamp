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
  const suitSymbols = ["♥", "♦", "♣", "♠"];
  const suitColours = ["red", "red", "black", "black"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const cardSymbol = suitSymbols[suitIndex];
    const cardColour = suitColours[suitIndex];

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

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: cardSymbol,
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: cardName,
        colour: cardColour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

const createCard = (cardInfo, playerNum, cardNum) => {
  const cardID = String(playerNum) + "-" + String(cardNum);
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;
  const name = document.createElement("div");
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;
  const card = document.createElement("div");
  card.className = "card";
  card.id = cardID;
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

const findPlayer1Result = () => {
  let lowRank = 14;
  let lowRankID = 0;
  let highRank = 0;
  let highRankID = 0;
  for (let i = 0; i < player1Hand.length; i += 1) {
    if (player1Hand[i].rank < lowRank) {
      lowRank = player1Hand[i].rank;
      lowRankID = i;
    }
    if (player1Hand[i].rank > highRank) {
      highRank = player1Hand[i].rank;
      highRankID = i;
    }
  }

  document.getElementById(`1-${lowRankID}`).className = "low-card";
  document.getElementById(`1-${highRankID}`).className = "high-card";
  return highRank - lowRank;
};

const findPlayer2Result = () => {
  let lowRank = 14;
  let lowRankID = 0;
  let highRank = 0;
  let highRankID = 0;
  for (let i = 0; i < player2Hand.length; i += 1) {
    if (player2Hand[i].rank < lowRank) {
      lowRank = player2Hand[i].rank;
      lowRankID = i;
    }
    if (player2Hand[i].rank > highRank) {
      highRank = player2Hand[i].rank;
      highRankID = i;
    }
  }

  document.getElementById(`2-${lowRankID}`).className = "low-card";
  document.getElementById(`2-${highRankID}`).className = "high-card";
  return highRank - lowRank;
};

const gameOutcome = () => {
  output(
    `Player 1's high and low cards have rank difference of ${player1RankDiff}
    Player 2's is ${player2RankDiff}
      It is a draw`
  );
  if (player1RankDiff > player2RankDiff) {
    output(
      `Player 1's high and low cards have rank difference of ${player1RankDiff} 
        Player 2's is ${player2RankDiff}
        Player 1 wins`
    );
  }
  if (player1RankDiff < player2RankDiff) {
    output(
      `Player 1's high and low cards have rank difference of ${player1RankDiff} 
        Player 2's is ${player2RankDiff}
        Player 2 wins`
    );
  }
};

let cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
document.body.appendChild(cardContainer);
let cardContainer2 = document.createElement("div");
cardContainer2.classList.add("card-container");
document.body.appendChild(cardContainer2);

let inputContainer = document.createElement("div");
const cbtn = document.createElement("BUTTON");
cbtn.innerHTML = "Submit";

let box = document.createElement("INPUT");
box.setAttribute("type", "text");
inputContainer.appendChild(box);
inputContainer.appendChild(cbtn);
document.body.appendChild(inputContainer);

let cardsNum = 0;
cbtn.addEventListener("click", function () {
  cardsNum = box.value;
  gameInfo.innerText = `Hi Players, please draw ${cardsNum} cards (Card takes 2 seconds to load)`;
  inputContainer.style.display = "none";
  drawButtonsContainer.style.display = "block";
});

// create two buttons
let drawButtonsContainer = document.createElement("div");
let player1Button = document.createElement("button");
player1Button.innerText = "Player 1 Draw";
drawButtonsContainer.appendChild(player1Button);

let player2Button = document.createElement("button");
player2Button.innerText = "Player 2 Draw";
drawButtonsContainer.appendChild(player2Button);
document.body.appendChild(drawButtonsContainer);
drawButtonsContainer.style.display = "none";

let gameInfo = document.createElement("div");
gameInfo.innerText = "How many cards to draw in this round?";
gameInfo.className = "game-info";
document.body.appendChild(gameInfo);

const output = (message) => {
  gameInfo.innerText = message;
};

let player1Card;
let player2Card;

let player1Drawn = 0;
let player2Drawn = 0;
let player1Hand = [];
let player2Hand = [];
let player1RankDiff;
let player2RankDiff;
let canClick = true;

player1Button.addEventListener("click", () => {
  if (canClick === true) {
    canClick = false;
    setTimeout(() => {
      if (player1Drawn < cardsNum) {
        // Pop player 1's card metadata from the deck
        player1Card = deck.pop();
        player1Hand.push(player1Card);

        // Create card element from card metadata
        const cardElement = createCard(player1Card, 1, player1Drawn);
        cardContainer.appendChild(cardElement);
        player1Drawn += 1;
      }

      if (player1Drawn == cardsNum) {
        player1RankDiff = findPlayer1Result();
      }
      if (player2Drawn == cardsNum && player1Drawn == cardsNum) {
        gameOutcome();
      }
      canClick = true;
    }, 2000);
  }
});

// Add event listener on player 2's button to draw card and determine winner
player2Button.addEventListener("click", () => {
  if (canClick === true) {
    canClick = false;

    setTimeout(() => {
      if (player2Drawn < cardsNum) {
        // Pop player 2's card metadata from the deck
        player2Card = deck.pop();
        player2Hand.push(player2Card);
        // Create card element from card metadata
        const cardElement = createCard(player2Card, 2, player2Drawn);

        cardContainer2.appendChild(cardElement);
        player2Drawn += 1;
      }
      if (player2Drawn == cardsNum) {
        player2RankDiff = findPlayer2Result();
      }
      if (player2Drawn == cardsNum && player1Drawn == cardsNum) {
        gameOutcome();
      }
      canClick = true;
    }, 2000);
  }
});
