

//High Card DOM

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
  const suits = ['♥️', '♦️', '♣', '♠️'];

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

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;

// create two buttons
const player1Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
player1Button.addEventListener('click', () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    playersTurn = 2;
  }
    console.log(player1Card);
    console.log(playersTurn);
    
});

// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
player2Button.addEventListener('click', () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
});

// //to create player UI for player 1
let player1Hand = (e) =>{
  let player = document.createElement('div')
  let box = document.createElement('div');
  
  //css styling
  player.className = 'player'
  box.className ='card'

  for (let i = 0; i<1; i+=1){
    let cardName = document.createElement('div');
    let cardSuit = document.createElement('div');
    cardName.className = 'name'
    cardSuit.className = 'suit'
    cardName.innerText = player1Card.name;
    cardSuit.innerText = player1Card.suit;
    box.appendChild(cardName);
    box.appendChild(cardSuit);
  }
  player.appendChild(box)
  document.body.appendChild(player);

};
 player1Button.addEventListener('click',player1Hand);

 


// let createPlayerUI = () =>{
//   for (let i = 0; i<2; i+=1){
//   let div_player = document.createElement('div');
//   let div_card = document.createElement('div')
//   let div_cardName = document.createElement('div');
//   let div_cardSuit = document.createElement('div');
//   let div_points = document.createElement('div');

//   //css styling
//   div_player.className = 'player';
//   div_card = 'card';
//   div_cardName = 'name';
//   div_cardSuit = 'suit';
//   div_points.className = 'points';

//   //assign values
//   // div_cardName = player1Card.name;
//   // div_cardSuit = player1Card.suit;
//   // div_points = player1Card.rank;

//   div_player.appendChild(div_card);
//   div_player.appendChild(div_cardName);
//   div_player.appendChild(div_cardSuit);
//   div_player.appendChild(div_points);
//   document.body.appendChild(div_player);
//   }
// };
// document.addEventListener ('click',createPlayerUI());

