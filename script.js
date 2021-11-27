
let playersTurn = 1; // matches with starting instructions
let player1Card; 
let player2Card;
let player1CardHand =[]; // array created to store the full card display of player 1's hand
let player2CardHand =[]; // array created to store the full card display of player 2's hand
let container1; // container for player 1's innercontainer. doing this to separate between player 1 buttons' group and player 2 buttons' group
let innerContainer1; // container for player 1's buttons
let container2; // container for player 2's innercontainer
let innerContainer2; // container for player 2's buttons
let player1HandRank =[]; // array created to store the card ranks of player 1's hand
let player2HandRank =[]; // array created to store the card ranks of player 2's hand
let canClick = true; // for setTimeOut
let difference1 = 0; // for getting difference for player 1's highest and lowest cards
let difference2 = 0; // for getting difference for player 2's highest and lowest cards

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

// Sorting of array in descending order
const sortArray = (array) => { 
  console.log("bananas" ,array)
  array.sort((a,b) =>b.rank - a.rank);
};

//Only displays the highest card and the lowest card 
const highLowCardDisplay = (array) =>{
console.log("apples" ,array)
sortArray(array);
return [array[0],array[array.length-1]]
}

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

// for displaying output message
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
      player1CardHand.push(player1Card) // for displaying sorted full display cards
      player1HandRank.push(player1Card.rank) // for comparing sorted cards rank
      let cardElement = createCard(player1Card);
      
      container1.appendChild(cardElement) 
      canClick = true;
    }, 500);
  } 
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      const player2Card = deck.pop();
      player2CardHand.push(player2Card) // for displaying sorted full display cards
      player2HandRank.push(player2Card.rank) // for displaying sorted card's ranks only
      let cardElement = createCard2(player2Card);
      container2.appendChild(cardElement) 
      
    canClick = true;
    }, 500);
  }
};


const initGame = () => {
for (i=0;i<1;i++){

container1= document.createElement('div');
container1.classList.add('p1container') 
document.body.appendChild(container1)

innerContainer1=document.createElement('div')

const player1Button = document.createElement('button');
player1Button.classList.add('p1button')
player1Button.innerText = 'Player 1 Draw';
innerContainer1.appendChild(player1Button)
container1.appendChild(innerContainer1)

const player1EndButton = document.createElement('button');
player1EndButton.classList.add('p1button')
player1EndButton.innerText = 'Player 1 End'
innerContainer1.appendChild(player1EndButton)
container1.appendChild(innerContainer1)

container2=document.createElement('div')
container2.classList.add('p2container')
document.body.appendChild(container2)

innerContainer2=document.createElement('div')

const player2Button = document.createElement('button');
player2Button.classList.add('p2button')
player2Button.innerText = 'Player 2 Draw';
innerContainer2.appendChild(player2Button)
container2.appendChild(innerContainer2)
player2Button.disabled= true;

const player2EndButton = document.createElement('button');
player2EndButton.classList.add('p2button')
player2EndButton.innerText = 'Player 2 End'
innerContainer2.appendChild(player2EndButton)
container2.appendChild(innerContainer2)
player2EndButton.disabled= true;

player1Button.addEventListener('click', player1Click);
player2Button.addEventListener('click', player2Click);
player1EndButton.addEventListener('click', function(){ 
    playersTurn = 2 // Once end, go to P2's turn
    player2Button.disabled= false; // disabling of P2's button is false now
    player2EndButton.disabled= false;
    player1Button.disabled= true; // disabling of P1's button is now true
    player1EndButton.disabled= true;
  
    let player1HighestLowest = highLowCardDisplay(player1CardHand) // to retrieve only the highest and lowest card for player 1
    let player1Biggest = createCard(player1HighestLowest[0]) // create the biggest card for display later
    let player1Smallest = createCard(player1HighestLowest[1]) // create the smallest card for display later
    difference1 = player1HighestLowest[0].rank - player1HighestLowest[1].rank // get the difference between the highest and lowest in terms of their ranks
    container1.innerText = "Player 1"
    container1.appendChild(player1Biggest) // append the biggest and lowest cards right after
    container1.appendChild(player1Smallest)
    gameInfo.innerText = "It's Player 2's turn now. Click to draw a card!"
  
  });
player2EndButton.addEventListener('click', function(){ 
    playersTurn = 1
    player2Button.disabled= true; // disabling of P2's button is now true
    player2EndButton.disabled= true;
    player1Button.disabled= false; // disabling of P1's button is now false
    player1EndButton.disabled= false;

    let player2HighestLowest = highLowCardDisplay(player2CardHand) // to retrieve only the highest and lowest card for player 2
    let player2Biggest = createCard2(player2HighestLowest[0]) // create the biggest card for display later
    let player2Smallest = createCard2(player2HighestLowest[1]) // create the smallest card for display later
    difference2 = player2HighestLowest[0].rank - player2HighestLowest[1].rank // get the difference between the highest and lowest in terms of their ranks
    container2.innerText ='Player 2';
    container2.appendChild(player2Biggest)
    container2.appendChild(player2Smallest)
    // Comparing the difference and printing the results
    if (difference1 > difference2){
      gameInfo.innerText = 'Player 1 wins!';
      } else if (difference1 < difference2){
      gameInfo.innerText = 'Player 2 wins!';
      } else if ( difference1 == difference2){
      gameInfo.innerText = "It's a tie!";
      }
    
  });
}
};

initGame();