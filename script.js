//************HELPER FUNCTIONS****************************** */

//to shuffle deck and get a shuffled deck 

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
  const suitsPic = ["❤️", "♦️", "♣", "♠"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitPic = suitsPic[suitIndex]

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
        suitPic:currentSuitPic
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/***************GLOBAL SETUP *******************************/
const deck = shuffleCards(makeDeck());

let playersTurn = 0; // matches with starting instructions
let player1Card;
let player2Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const playBtn = document.querySelector("span>button")


let outputDiv = document.querySelector(".output")

const body = document.querySelector("body")

const playerResultsDiv = document.createElement("div")

playerResultsDiv.classList.add("player-results")

let cardDiv = ""

const messageDiv = document.createElement("div")
const player1Div = document.createElement("div")
 const player2Div = document.createElement("div")

 let canClick = true;
/********************************************************************/

//this function will generate a card div with name,suit and corresponding innertext
const makeCard = (playerCard) => {
const card = document.createElement('div');
  card.classList.add('card');
  console.log(card)

  //next create suit div& corresponding suit 
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = playerCard.suitPic;

  console.log(suit.innerText)

  //then create suit name
  const name = document.createElement('div');
    name.innerText = playerCard.name
  //if playerCard deck suit is hearts/diamonds, assign class red and class name 
  if (playerCard.suit === "hearts" || playerCard.suit ==="diamonds"){
  name.classList.add('name', 'red');

  }
  else {name.classList.add('name','black')
};

  console.log(name)
  card.appendChild(name);
  card.appendChild(suit);

  cardDiv = card
}

/***********************PLAYER ACTION CALLBACKS*************************************/

//when play button is clicked, player1 button and player 2 button appears 

const playClick = () => {
  if(playersTurn === 0){
    
player1Button.setAttribute("type","submit")
player2Button.setAttribute("type","submit")
console.log(player1Button)
player1Button.innerHTML ="Player 1 Play"
player2Button.innerHTML="Player 2 Play"
const btnDiv = document.createElement("div")

btnDiv.classList.add("buttons-to-play")

btnDiv.appendChild(player1Button)
btnDiv.appendChild(player2Button)

player1Div.classList.add("player1-output")
player2Div.classList.add("player2-output")

outputDiv.innerHTML=""
outputDiv.appendChild(btnDiv)
//player to key in the number of cards to take


  }
  playersTurn = 1
}


const player1Click = () => {
   if (playersTurn === 1 && canClick === true) {
     canClick = false;
     player1Div.innerHTML=""
     player2Div.innerHTML=""

     setTimeout(()=>{
    player1Card = deck.pop();
  playersTurn = 2;
console.log(player1Card)

// card is made
makeCard(player1Card)

//append card to player1output div 
player1Div.appendChild(cardDiv)

playerResultsDiv.appendChild(player1Div)
playerResultsDiv.appendChild(player2Div)

console.log(outputDiv)
outputDiv.appendChild(playerResultsDiv)

messageDiv.innerHTML= `Player 1's card is ${player1Card.name} of ${player1Card.suit}. Now it's player's 2 turn`
messageDiv.classList.add ("message")
canClick = true;

body.appendChild(messageDiv)},1000)}
}


// when player 2 clicks button, new div created,  random card is shown. 
// random card is drawn,then player state is ==2, so results is shown 
const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
   
   setTimeout(()=>{
    const player2Card = deck.pop();
    playersTurn = 0;

makeCard(player2Card)

//append card to player1output div 
player2Div.appendChild(cardDiv)

messageDiv.innerHTML = ""

let outputMsg = `Player 1's card is ${player1Card.name} of ${player1Card.suit}. Player 2's card is ${player2Card.name} of ${player2Card.suit}`
if (player1Card.rank>player2Card.rank){
  messageDiv.innerHTML= `Player 1's card is higher than player 1's card. <br> Player 1 won! <br>${outputMsg}`
}
else messageDiv.innerHTML=`Player 1's card is lower than player 2's card.<br> Player 2 won!<br> ${outputMsg} `
  
  playersTurn =1
},1000)
}
}


player1Button.addEventListener('click',player1Click)

player2Button.addEventListener('click',player2Click)

playBtn.addEventListener('click',playClick)

/********************** ADDITIONAL FUNCTIONS********************** */

