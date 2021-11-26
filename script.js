
let playersTurn = 1; // matches with starting instructions
let player1Card;
let cardContainer;
let canClick = true;

const gameInfo = document.createElement('h2');
gameInfo.classList.add('game-message')
document.body.appendChild(gameInfo)
// fill game info div with starting instructions
gameInfo.innerText = "It's player 1's turn. Click to draw a card!";
document.body.appendChild(gameInfo);

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
  const suits = ['❤', '♦', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      
      if (currentSuit === '❤' || currentSuit ==='♦'){
        var color = 'red';
      } else if (currentSuit === '♠' || currentSuit === '♣'){
        var color = 'black'
      }

      
      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardColor: color
      };
      

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());


const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit',cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;
  const card = document.createElement('div');
  card.classList.add('card');
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

const createCard2 = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit',cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;
  const card = document.createElement('div');
  card.classList.add('card2');
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

const output =(message) => {
  gameInfo.innerText = message;
}

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      player1Card = deck.pop();
      const cardElement = createCard(player1Card);
      // in case this is not the 1st time
      // in the entire app,
      // empty the card container
      cardContainer.appendChild(cardElement);
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      const player2Card = deck.pop();
      const cardElement = createCard2(player2Card);
      cardContainer.appendChild(cardElement);
      canClick = true;
      if (player1Card.rank > player2Card.rank) {
        output('player 1 wins');
      } else if (player1Card.rank < player2Card.rank) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }, 2000);
  }
};
const initGame = () => {
for (i=0;i<1;i++){
  
const player1Button = document.createElement('button');
player1Button.classList.add('p1button')
document.body.appendChild(player1Button)

const player1EndButton = document.createElement('button');
player1EndButton.classList.add('p1endbutton')
document.body.appendChild(player1EndButton)

const player2Button = document.createElement('button');
player2Button.classList.add('p2button')
document.body.appendChild(player2Button)
player2Button.disabled= true;

const player2EndButton = document.createElement('button');
player2EndButton.classList.add('p2endbutton')
document.body.appendChild(player2EndButton)
player2EndButton.disabled= true;


  // initialize button functionality
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

player1EndButton.innerText = 'Player 1 End'
document.body.appendChild(player1EndButton);

player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

player2EndButton.innerText = 'Player 2 End'
document.body.appendChild(player2EndButton);
  
cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);


player1Button.addEventListener('click', player1Click);
player2Button.addEventListener('click', player2Click);
player1EndButton.addEventListener('click', function(){ 
    playersTurn = 2
    player2Button.disabled= false;
    player2EndButton.disabled= false;
    player1Button.disabled= true;
    player1EndButton.disabled= true;
  
  });
player2EndButton.addEventListener('click', function(){ 
    playersTurn = 1
    player2Button.disabled= true;
    player2EndButton.disabled= true;
    player1Button.disabled= false;
    player1EndButton.disabled= false;
  });
}
};

initGame();





// Please implement exercise logic here
