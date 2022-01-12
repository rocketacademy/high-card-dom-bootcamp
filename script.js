// Please implement exercise logic here

//HELPER FUNCTIONS
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
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const symbols = ['♥', '♦', '♣', '♠']

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const suitSymbol = symbols[suitIndex]
    let colour = "black"
    if(suitIndex <= 1){
      colour = "red"
    } 
    

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      displayName = rankCounter

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A'
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J'
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q'
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K'
      } 

      const cardInfo = {
        suitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName,
        colour,
        rank: rankCounter,
      };

      //PARAMETERISE CARD ATTRIBUTES
      

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

//SETUP
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement('button');
player1Button.classList.add('player1')

const player2Button = document.createElement('button');
player2Button.classList.add('player2')

const gameInfo = document.createElement('div');

const resultButton = document.createElement('button');
resultButton.classList.add('result')

let canClick = true;
let cardContainer;
let results

//GAME INIT
const initGame = () => {
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  results = document.createElement('div')
  results.classList.add('results')
  document.body.appendChild(results)
  
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  results.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  results.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // add result button
  resultButton.innerText = 'Click for Result';
  results.appendChild(resultButton)
  resultButton.addEventListener('click', showResult);
  
  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  gameInfo.id = "message"
  document.body.append(gameInfo);
};
//PLAYER ACTION CALLBACK
let multiCards = true

let player1Cards = []
let player2Cards = []

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false
    setTimeout(() => {
    // Pop player 1's card metadata from the deck
      player1Card = deck.pop();
      
      // Create card element from card metadata
      const cardElement = createCard(player1Card);
      cardElement.classList.add("player1")
      cardElement.classList.add("card"+player1Cards.length)
      // Empty cardContainer in case this is not the 1st round of gameplay
      if (multiCards === false){
        cardContainer.innerHTML = '';
        multiCards = true
      }
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
      player1Cards.push(player1Card.rank)
      console.log(player1Cards)
      
      // Switch to player 2's turn
      playersTurn = 2;
      canClick = true
      output(`Its player 2's turn to draw a card`)
  }, 500);
}
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false

    setTimeout(()=>{
    // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    
    // Create card element from card metadata
    const cardElement = createCard(player2Card);   
    cardElement.classList.add("player2") 
    cardElement.classList.add("card"+player2Cards.length)
    // Append card element to card container
    cardContainer.appendChild(cardElement);
    player2Cards.push(player2Card.rank)
    console.log(player2Cards)
    
    // Switch to player 1's turn
    if(player2Cards.length < 3){
      playersTurn = 1;
      output('Player 1, click to continue drawing \nor click for the game result')
      canClick = true
    } else {
      output('Maximum of 3 cards reached. Click for result.')
    }
    
    // Determine and output winner
  }, 500)    
  console.log(deck.length)
}
};

const showResult = () => {
  const player1Max = Math.max(...player1Cards)
  const player2Max = Math.max(...player2Cards)

  if (player1Max > player2Max) {
        output('player 1 wins');
      } else if (player1Max < player2Max) {
        output('player 2 wins');
      } else if (player1Max = player2Max) {
        output('tie');
      }
  multiCards = false
  playersTurn = 1
  canClick = true
  player1Cards = []
  player2Cards = []
  // const deck = shuffleCards(makeDeck()); - how to reset deck
}

window.addEventListener('load', initGame)