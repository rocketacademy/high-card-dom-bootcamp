// ================= CODE TO MAKE DECK, SHUFFLE, AND CREATE SHUFFLED DECK ==============

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbol = ['♥', '◈', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbol[suitIndex];

    // Code to create colour for the cards, based on the suits

    let cardColour = "";
    // Create a variable for the colour, based on the suits
    if (currentSuit === 'hearts' || currentSuit === 'diamonds'){
      cardColour = "red";
    } else if (currentSuit === 'clubs' || currentSuit === 'spades'){
      cardColour = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayNameText = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayNameText = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayNameText = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayNameText = 'Q'
      } else if (cardName === '13') {
        cardName = 'king';
        displayNameText = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: displayNameText,
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

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;
let player2Card;
let player1Hand = [];
let player2Hand = [];
let cardsDrawn = 0;

// Create all the elements on the page first

const cardContainerPlayer1 = document.createElement("div");
cardContainerPlayer1.classList.add('card-container')

const cardContainerPlayer2 = document.createElement("div");
cardContainerPlayer2.classList.add('card-container')

const resultsContainer = document.createElement("div");
resultsContainer.classList.add('card-container');

const paperCard = document.createElement("div");
paperCard.classList.add('card')

const cardName = document.createElement("div");
cardName.classList.add('name')

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const dealButton = document.createElement('button');

const gameInfo = document.createElement('div');

// Function to create card body

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};


const player1Click = () => {
  if (playersTurn === 1){
        player1Card = deck.pop();
        player1Hand.push(player1Card);
    
  // Create the body of card from card metadata
  const cardElement = createCard(player1Card);
  // cardContainer.innerHTML = "";
  cardContainerPlayer1.appendChild(cardElement)
playersTurn = 2;
}
output (`It is player 2's turn. Click to draw a card.`)
}

const player2Click = () => {
  if (playersTurn === 2) {
    // Pop player 2's card metadata from the deck
    player2Card = deck.pop();
    player2Hand.push(player2Card);
    
    // Create card element from card metadata
    const cardElement = createCard(player2Card);    
    // Append card element to card container
    cardContainerPlayer2.appendChild(cardElement);
    
    // Switch to player 1's turn
    playersTurn = 1;
    
    // Add num of cards drawn
    cardsDrawn += 1;

    // // Determine player with the greatest difference in highest and lowest cards in hand
    // let player1Difference = calcDifference(player1Hand);
    // let player2Difference = calcDifference(player2Hand);

    // // Determine and output winner based on difference
    // if (player1Difference > player2Difference){
    //   output ('player 1 wins!');
    // } else if (player2Difference > player1Difference){
    //   output ('player 2 wins!');
    // } else {
    //   output('tie');
    // }

    // Determine and output winner
    // if (player1Card.rank > player2Card.rank) {
    //   output('player 1 wins');
    // } else if (player1Card.rank < player2Card.rank) {
    //   output('player 2 wins');
    // } else {
    //   output('tie');
    }
    output (`It is player 1's turn. Click to draw a card.`)
  }
const calcDifference = (playersHand) => {
  let lowestCard;
  let highestCard;
  let cardDifference;

  for (let i = 0; i < playersHand.length; i += 1) {
    let currentRank = playersHand[i].rank;
    for (let j = 0; j < 13; j += 1){
      if (j == currentRank){
        lowestCard = currentRank;
        console.log('lowest card num: ', lowestCard);
      }
    }
    for (j = 13; j > 0; j -= 1){
      if (j == currentRank){
        highestCard = currentRank;
        console.log('highest card num: ', highestCard);
      }
    }
  }
  cardDifference = highestCard - lowestCard;

return cardDifference;
}

const determineWinner = () => {
  if (cardsDrawn >= 2){
  // push each players' arrays into calcDifference function
  let player1Difference = calcDifference(player1Hand);
  let player2Difference = calcDifference(player2Hand);

    // Determine and output winner based on difference
    if (player1Difference > player2Difference){
      output ('player 1 wins!');
    } else if (player2Difference > player1Difference){
      output ('player 2 wins!');
    } else {
      output('tie');
    }
  }
}

const initGame = () => {
  
  cardContainerPlayer1.innerHTML = "Player 1's Drawn Cards<br><br>";
  cardContainerPlayer2.innerHTML = "Player 2's Drawn Cards<BR><BR>";
  resultsContainer.innerHTML = "Results: "
  document.body.appendChild(cardContainerPlayer1);
  document.body.appendChild(cardContainerPlayer2);
  document.body.appendChild(resultsContainer);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  dealButton.innerText = 'Deal';
  document.body.appendChild(dealButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  dealButton.addEventListener('click', determineWinner);

  // fill game info div with starting instructions
  gameInfo.innerText = 'It is player 1 turn. Click to draw a card!';
  resultsContainer.appendChild(gameInfo);
};

initGame();


// ============= COMFORTABLE PSEUDO CODE =====================
// ============= HIGH / LOW CARD ==================================

// Create arrays and push the cards drawn into those
// Create game stages, where game stage 1 would prompt players to click once for their first card, game stage 2 = click again to compare differences
// Create a for loop that would reflect the cards into cardContainer everytime "Player1Click" / "Player2Click" is activated
// Create another loop that analyses the difference between the highest and lowest card in the hand, to determine the winner 


// High / Low Card
// The players can draw multiple cards each. The winner is the player who has the greatest difference in rank between the highest and lowest cards in his hand.
// (DONE) Change the CSS of the game so that each players' cards are displayed in a row. 