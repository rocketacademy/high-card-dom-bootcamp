// ----- Helper Functions -----

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Create deck
const makeDeck = () => {
	const newDeck = [];
	const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];
	const cardName = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
	];
	const cardRank = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
	];

	// Loop over the suits array
	for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
		// Store the current suit in a variable
		const currentSuit = suits[suitIndex];

		for (let i = 0; i < 13; i += 1) {
			// Set suit color
			let suitColor = 'black';
			if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
				suitColor = 'red';
			}

			// Create a new card with the current name, suit, and rank
			const card = {
				name: cardName[i],
				suit: currentSuit,
				symbol: suitSymbols[suitIndex],
				color: suitColor,
				rank: cardRank[i],
			};

			// Add the new card to the deck
			newDeck.push(card);
		}
	}

	// Return the completed card deck
	return newDeck;
};

// Shuffle cards
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

const clearMsg = () => {
	gameInfo.innerHTML = ``;
};
const addMsg = (msg) => {
	gameInfo.innerHTML += msg;
};

// ----- Global variables -----

// Deck
const deck = shuffleCards(makeDeck());

// Divs
const gameInfo = document.createElement('div');

// Buttons
const player1Btn = document.createElement('button');
const player2Btn = document.createElement('button');

// Player turn
let playerTurn = 1;
let player1Card;

// ------ Callback functions -----
const player1Click = () => {
	if (playerTurn === 1) {
		player1Card = deck.pop();
		clearMsg();
		addMsg(`Player 2, your turn.`);
		playerTurn = 2;
	}
};

const player2Click = () => {
	let player2Card = deck.pop();
	playerTurn = 1;
	clearMsg();
	addMsg(`Player 1 drew ${player1Card.name}${player1Card.symbol}.<br>
  Player 2 drew ${player2Card.name}${player2Card.symbol}.<br>
  `);

	if (player1Card === player2Card) {
		addMsg(`It's a draw!`);
	} else if (player1Card.rank > player2Card.rank) {
		addMsg(`Player 1 wins!`);
	} else {
		addMsg(`Player 2 wins!`);
	}
};

// ----- Game initialisation -----
const initGame = () => {
	gameInfo.innerHTML = `Let's play a game! Player 1, draw a card.`;
	document.body.appendChild(gameInfo);

	player1Btn.innerText = 'Player 1 Draw';
	player1Btn.addEventListener('click', player1Click);
	document.body.appendChild(player1Btn);

	player2Btn.innerText = 'Player 2 Draw';
	player2Btn.addEventListener('click', player2Click);
	document.body.appendChild(player2Btn);
};

initGame();
