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
            if (cardName === "1") {
                cardName = "ace";
            } else if (cardName === "11") {
                cardName = "jack";
            } else if (cardName === "12") {
                cardName = "queen";
            } else if (cardName === "13") {
                cardName = "king";
            }

            // checks the cardName of each card and assigns their respective displayNames
            let displayName;
            switch (cardName) {
                case "ace":
                    displayName = "A";
                    break;
                case "jack":
                    displayName = "J";
                    break;
                case "queen":
                    displayName = "Q";
                    break;
                case "king":
                    displayName = "K";
                    break;
                default:
                    displayName = cardName;
                    break;
            }

            // checks the suits of each card and assigns their respective emoji suit
            let suitSymbol;
            switch (currentSuit) {
                case "diamonds":
                    suitSymbol = "♦️";
                    break;
                case "clubs":
                    suitSymbol = "♣️";
                    break;
                case "spades":
                    suitSymbol = "♠️";
                    break;
                case "hearts":
                    suitSymbol = "♥️";
                    break;
                default:
                    console.log("weird");
            }

            let color;
            if (currentSuit === "diamonds" || currentSuit === "hearts") {
                color = "red";
            } else {
                color = "black";
            }

            // Create a new card with the current name, suit, and rank
            const card = {
                name: cardName,
                suit: currentSuit,
                rank: rankCounter,
                displayName,
                suitSymbol,
                color,
            };

            // Add the new card to the deck
            newDeck.push(card);
        }
    }

    // Return the completed card deck
    return newDeck;
};

const deck = shuffleCards(makeDeck());

let player1Cards = [];
let player2Cards = [];
let gameRestarted = false

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");

const playerContainer1 = document.createElement("div")
const playerContainer2 = document.createElement("div")

const cardContainer1 = document.createElement("div");
const cardContainer2 = document.createElement("div");

const createCard = (cardInfo) => {
    console.log(cardInfo);
    const suit = document.createElement("div");
    suit.classList.add("suit");
    suit.innerText = cardInfo.suitSymbol;

    const name = document.createElement("div");
    name.classList.add(cardInfo.displayName, cardInfo.color);
    name.innerText = cardInfo.displayName;

    const card = document.createElement("div");
    card.classList.add("card");

    card.appendChild(name);
    card.appendChild(suit);

    return card;
};

const clearContainers = () => {
    cardContainer1.innerHTML = ""
    cardContainer2.innerHTML = ""
    gameRestarted = false
}


const player1Click = () => {
    if (gameRestarted){
        clearContainers()
    }
    if (player1Cards.length < numberOfCardsToDraw) {
        // Pop player 1's card metadata from the deck
        const newCard = deck.pop();
        player1Cards.push(newCard);
        // Create card element from card metadata
        const cardElement = createCard(newCard);

        // Append the card element to the card container
        cardContainer1.appendChild(cardElement);
    }

    checkForWinner();
};

const calculateScoreOfHand = (hand) => {
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
        score += parseInt(hand[i].rank);
    }
    return score;
};

const resetGame = () => {
    gameRestarted = true
    player1Cards = []
    player2Cards = []
}

const checkForWinner = () => {
    const player1CardsLeft = numberOfCardsToDraw - player1Cards.length;
    const player2CardsLeft = numberOfCardsToDraw - player2Cards.length;
    console.log(player2CardsLeft);
    console.log(player1CardsLeft);
    if (player1CardsLeft === 0 && player2CardsLeft === 0) {
        const player1Score = calculateScoreOfHand(player1Cards);
        const player2Score = calculateScoreOfHand(player2Cards);

        // Determine and output winner
        if (player1Score > player2Score) {
            output("player 1 wins, click any button to play again.");
        } else if (player1Score < player2Score) {
            output("player 2 wins, click any button to play again.");
        } else {
            output("tie, click any button to play again.");
        }
        // reset game
        resetGame()
    } else {
        output(
            `Player 1 draw ${player1CardsLeft} more cards. Player 2 draw ${player2CardsLeft} more cards.`
        );
    }
};

const player2Click = () => {
    if (gameRestarted){
        clearContainers()
    }
    if (player2Cards.length < numberOfCardsToDraw) {
        // Pop player 2's card metadata from the deck
        const newCard = deck.pop();
        player2Cards.push(newCard);

        // Create card element from card metadata
        const cardElement = createCard(newCard);
        // Append card element to card container
        cardContainer2.appendChild(cardElement);
        // Switch to player 1's turn
        checkForWinner();
    }
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
    gameInfo.innerText = message;
};

let numberOfCardsToDraw;

const createPlayerButtons = () => {
    // initialize button functionality
    player1Button.innerText = "Player 1 Draw";
    document.body.appendChild(player1Button);

    player2Button.innerText = "Player 2 Draw";
    document.body.appendChild(player2Button);

    player1Button.addEventListener("click", player1Click);
    player2Button.addEventListener("click", player2Click);

    playerContainer1.innerHTML = "Player 1"
    document.body.appendChild(playerContainer1)

    playerContainer2.innerHTML = "Player 2"
    document.body.appendChild(playerContainer2)

    cardContainer1.classList.add("card-container");
    playerContainer1.appendChild(cardContainer1);

    cardContainer2.classList.add("card-container");
    playerContainer2.appendChild(cardContainer2);
};


const initGame = () => {
    // fill game info div with starting instructions
    document.body.appendChild(gameInfo);
    output("Enter the number of card each player should draw");
    const numberInput = document.createElement("input");
    numberInput.placeholder = "Press ENTER to submit";
    numberInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            //do something
            const formattedCardsToDraw = parseInt(e.target.value);
            if (typeof formattedCardsToDraw === "number") {
                numberOfCardsToDraw = formattedCardsToDraw;
                //continue
                // remove input and start game
                numberInput.remove();
                output(
                    `${numberOfCardsToDraw} cards are drawn per player. Player 1 please draw.`
                );
                createPlayerButtons();
            } else {
                output("Please enter a valid number");
                numberInput.value = "";
            }
        }
    });
    document.body.appendChild(numberInput);
};

initGame();
