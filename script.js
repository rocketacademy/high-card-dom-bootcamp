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
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    //create new card symbol based on suits
    let cardSymbol;

    if (currentSuit == 'hearts'){
        cardSymbol = '♥️';
    }   else if (currentSuit == 'diamonds'){
            cardSymbol = '♦️';
        } else if (currentSuit == 'club'){
            cardSymbol = '♣️';
            } else { 
                cardSymbol ='♠️';
            }

    //create new card color based on suits       
    let cardColor;

    if (cardSymbol == '♣️' || cardSymbol == '♠️'){
        cardColor = 'black';
    } else {
        cardColor = 'red'
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortName = 'A'
      } else if (cardName === '11') {
        cardName = 'jack';
        shortName = 'J'
      } else if (cardName === '12') {
        cardName = 'queen';
        shortName = 'Q'
      } else if (cardName === '13') {
        cardName = 'king';
        shortName = 'K'
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
    const suit = document.createElement('div');
    suit.classList.add('suit', cardInfo.color);
    suit.innerText = cardInfo.suitSymbol;
      
    const name = document.createElement('div');
    name.classList.add(cardInfo.displayName, cardInfo.color);
    name.innerText = cardInfo.displayName;
      
    const card = document.createElement('div');
    card.classList.add('card');
      
    card.appendChild(name);
    card.appendChild(suit);

    return card;
  }

/*************************************
 ***GLOBAL Variables & new function***
 *************************************/
const deck = shuffleCards(makeDeck());

//Initialize gamemode with player1 turn and player1card
let playersTurn = 1;
let player1Card;

// Initialize cardContainer & displayContainer Variable;
let cardContainer 
let displayContainer

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
    gameInfo.innerText = message;
  };

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// create two buttons for player1 & player2 to draw cards
const player1Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
player2Button.innerText = 'Player 2 Draw';
document.body.appendChild(player2Button);



/**********************
 *PLAYER ACTION CALLBACK
 **********************/
 const player1Click = () => {
    if (playersTurn === 1) {
      player1Card = deck.pop();
      
      //create card display by calling on the function
      const cardElement = makeCardDisplay(player1Card);
      // Empty cardContainer in case this is not the 1st round of gameplay
      cardContainer.innerHTML = '';
      // Append card element to card container for display in screen
      cardContainer.appendChild(cardElement)
      playersTurn = 2;
    }
  };
  
  const player2Click = () => {
    if (playersTurn === 2) {
      const player2Card = deck.pop();

        //create card display by calling on the function
        const cardElement = makeCardDisplay(player2Card);
        
        // Append card element to card container for display in screen
        cardContainer.appendChild(cardElement)
        playersTurn = 1;
  
      if (player1Card.rank > player2Card.rank) {
        output('Player 1 wins');
      } else if (player1Card.rank < player2Card.rank) {
        output('Player 2 wins');
      } else {
        output('Tie');
      }
    }
  };

/**********************
 ****** GAME INIT *****
 **********************/
 const initGame = () => {
    //add cardContainer as a div with class ID and append to document body
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    document.body.appendChild(cardContainer);

    //create a input box container to display text
    displayContainer = document.createElement('div');
    displayContainer.classList.add('textContainer');
    document.body.appendChild(displayContainer);

    // initialize button functionality
    player1Button.innerText = 'Player 1 Draw';
    document.body.appendChild(player1Button);
  
    player2Button.innerText = 'Player 2 Draw';
    document.body.appendChild(player2Button);
  
    player1Button.addEventListener('click', player1Click);
    player2Button.addEventListener('click', player2Click);
  
    // fill game info div with starting instructions
    gameInfo.innerText = 'Its Player 1 turn. Click to draw a card!';
    displayContainer.appendChild(gameInfo);
  };

//run function initgame to initialise
initGame();