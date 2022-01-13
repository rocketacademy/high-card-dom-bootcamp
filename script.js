
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
    // newDeck array to contain cards
    const newDeck = [];
  
    // outer loop. four suits; suit symbols; suit colors
    const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
    const suitSymbols = ['♦️', '♣️', '♥️', '♠️'];
  
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
      const currentSuit = suits[suitIndex];
      const currentSymbol = suitSymbols[suitIndex];
  
      let suitColor = '';
      if (currentSuit === 'diamonds' || currentSuit === 'hearts') {
        suitColor = 'red';
      } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
        suitColor = 'black';
      }
      // inner loop. 1 to 13 ranks;
      for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
        // Define card names
        let cardName = `${rankCounter}`;
        let shortName = `${rankCounter}`;
        // Define exceptions for card name
        if (cardName === '1') {
          cardName = 'ace';
        } else if (cardName === '11') {
          cardName = 'jack';
        } else if (cardName === '12') {
          cardName = 'queen';
        } else if (cardName === '13') {
          cardName = 'king';
        }
  
        // Define exceptions for display name
        if (shortName === '1') {
          shortName = 'A';
        } else if (shortName === '11') {
          shortName = 'J';
        } else if (shortName === '12') {
          shortName = 'Q';
        } else if (shortName === '13') {
          shortName = 'K';
        }
  
        // Create Card
        const card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
          symbol: currentSymbol,
          color: suitColor,
          displayName: shortName,
        };
  
        // add card to deck through push function.
        newDeck.push(card);
      }
    }
  
    return newDeck;
  };




const deck = shuffleCards(makeDeck());
let cardContainer;

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");


// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const createCard = (cardData) => {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardName = document.createElement('div');
    cardName.classList.add(cardData.name, cardData.color);
    cardName.innerText = cardData.displayName;
  
    const suit = document.createElement('div');
    suit.classList.add(cardData.suit, cardData.color);
    suit.innerText = cardData.symbol;
  
    card.appendChild(cardName);
    card.appendChild(suit);
  
    return card;
  };

const player1Click = () => {
    if (playersTurn === 1) {
      // Pop player 1's card metadata from the deck
      player1Card = deck.pop();
      
      // Create card element from card metadata
      const cardElement = createCard(player1Card);
      // Empty cardContainer in case this is not the 1st round of gameplay
      cardContainer.innerHTML = '';
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
      
      // Switch to player 2's turn
      playersTurn = 2;
    }
  };
  
  const player2Click = () => {
    if (playersTurn === 2) {
      // Pop player 2's card metadata from the deck
      const player2Card = deck.pop();
      
      // Create card element from card metadata
      const cardElement = createCard(player2Card);    
      // Append card element to card container
      cardContainer.appendChild(cardElement);
      
      // Switch to player 1's turn
      playersTurn = 1;
      
      // Determine and output winner
      if (player1Card.rank > player2Card.rank) {
        output('player 1 wins');
      } else if (player1Card.rank < player2Card.rank) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }
  };
//   const makeCard = () => {
//     const suit = document.createElement("div");
//     suit.classList.add("suit");
//     suit.innerText = "♥️";
  
//     const name = document.createElement("div");
//     name.classList.add("name", "red");
//     name.innerText = "3";
  
//     const card = document.createElement("div");
//     card.classList.add("card");
  
//     card.appendChild(name);
//     card.appendChild(suit);
//   };

const initGame = () => {
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

  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
};


initGame();