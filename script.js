// Please implement exercise logic here


let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;
let playersHands = [[],[]];
let maxCards = 0

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");

let cardContainer;

cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
document.body.appendChild(cardContainer);

let cardContainer2;

cardContainer2 = document.createElement("div");
cardContainer2.classList.add("card-container2");
document.body.appendChild(cardContainer2);

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
  const suitsSymbol = ["♥️", "♦️", "♣️", "♠️"];
  const suitsColour = ["red", "red", "black", "black"];


  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitsSymbol[suitIndex];
    const currentColour = suitsColour[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let display = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        display = "A"
      } else if (cardName === "11") {
        cardName = "jack";
        display= "J"
      } else if (cardName === "12") {
        cardName = "queen";
        display  = "Q"
      } else if (cardName === "13") {
        cardName = "king";
        display = "K"
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitsSymbol: currentSymbol,
        colour: currentColour,
        displayName: display,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (maxCards===0){
    output('Please submit max cards')
  }else {
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    console.log(player1Card);
    playersHands[0].push(player1Card);
    playersHands[0].sort((a,b)=>((b.rank -a.rank)));
    
    cardContainer.innerHTML = "";

    for (let i=0;i<playersHands[0].length;i+=1){
     // Create card element from card metadata
      const cardElement = createCard(playersHands[0][i]);
    
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
    }
    winCheck();


    
  }
};

const player2Click = () => {
  if(maxCards===0){
    output('Please submit max cards')
  }else {
    // Pop player 2's card metadata from the deck
    player2Card = deck.pop();
    playersHands[1].push(player2Card);
    playersHands[1].sort((a,b)=>((b.rank -a.rank)));
    cardContainer2.innerHTML = "";
    for (let i=0;i<playersHands[1].length;i+=1){
     // Create card element from card metadata
      const cardElement = createCard(playersHands[1][i]);
    
      // Append the card element to the card container
      cardContainer2.appendChild(cardElement);
    }
    winCheck();


    // Switch to player 1's turn
    playersTurn = 1;

    //oneCard();


  }
};

//Function to determine the one card game
const oneCard = () => {
  console.log(player1Card);
  console.log(player2Card);
      // Determine and output winner
    if (player1Card.rank > player2Card.rank) {
      output("player 1 wins,player 1 click to start again");
    } else if (player1Card.rank < player2Card.rank) {
      output("player 2 wins,player 1 click to start again");
    } else {
      output("tie");
    }
}

const initGame = () => {
  // initialize max card submission field and button
  const inputField = document.createElement('input');
  const submitButton = document.createElement('button');
  submitButton.innerText= 'Submit Max Cards'
  document.body.appendChild(inputField);
  document.body.appendChild(submitButton);

  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  // fill game info div with starting instructions
  gameInfo.innerText = "Submit maximum number of cards to play";
  document.body.appendChild(gameInfo);
  const setMaxCards = () =>{
  maxCards = parseInt(inputField.value);
  
}
  
  submitButton.addEventListener('click',setMaxCards);
  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  

  
};

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit",cardInfo.colour);
  suit.innerText = cardInfo.suitsSymbol;

  const name = document.createElement("div");
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const winCheck =()=>{
  if (playersHands[0].length === maxCards && playersHands[1] === maxCards){
    output('game over');
  }
}



const deck = shuffleCards(makeDeck());
initGame()