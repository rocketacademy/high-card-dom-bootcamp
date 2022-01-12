// ----- Helper Functions ----------------------------------------------------

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Create deck
const makeDeck = () => {
	const newDeck = [];
	const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];
	const cardName = [
		'A',
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
	const cardRank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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

// Add message to Game info div
const clearMsg = () => {
	gameInfo.innerHTML = ``;
};
const addMsg = (msg) => {
	gameInfo.appendChild(msg);
};

// Create card container with card info
const makeCard = (cardInfo) => {
	// create a div with the classes 'card' and card.color
	const card = document.createElement('div');
	card.classList.add('card', cardInfo.color);

	// create a div for card name & set innerHTML to card's name
	const cardName = document.createElement('div');
	cardName.setAttribute('class', 'card-name');
	cardName.innerHTML = cardInfo.name;

	// create a div for card symbol & set innerHTML to card's symbol
	const cardSymbol = document.createElement('div');
	cardSymbol.setAttribute('class', 'card-symbol');
	cardSymbol.innerHTML = cardInfo.symbol;

	// append card name & card symbol to card div
	card.appendChild(cardName);
	card.appendChild(cardSymbol);

	return card;
};

// ----- Global variables ----------------------------------------------------

// Deck
const deck = shuffleCards(makeDeck());

// Divs
const gameInfo = document.createElement('div');
const btnDiv = document.createElement('div');
const cardContainer = document.createElement('div');

// Buttons
const player1Btn = document.createElement('button');
const player2Btn = document.createElement('button');

// Player turn
let playerTurn = 1;
let player1Card;

// ------ Callback functions ----------------------------------------------------
const player1Click = () => {
	if (playerTurn === 1) {
		// Reset the game-info div
		clearMsg();
		cardContainer.innerHTML = ``;

		// Draw a card for player 1
		player1Card = deck.pop();
		console.log('Player 1', player1Card);

		// Create a card div & append it to card-container div
		const player1CardDiv = makeCard(player1Card);
		cardContainer.appendChild(player1CardDiv);
		addMsg(cardContainer);

		// Add game info: player 1's card and next player's turn
		const player1DrawnCard = document.createElement('p');
		player1DrawnCard.innerHTML = `Player 1 drew ${player1Card.name}${player1Card.symbol}.`;

		const nextTurn = document.createElement('p');
		nextTurn.innerHTML = `Player 2, your turn.`;
		addMsg(player1DrawnCard);
		addMsg(nextTurn);

		// Next player's turn
		playerTurn = 2;
	}
};

const player2Click = () => {
	// Clear game-info div
	clearMsg();

	// Draw card for player 2
	let player2Card = deck.pop();
	console.log('Player 2', player2Card);

	// Create card div & append it to card-container div
	const player2CardDiv = makeCard(player2Card);
	cardContainer.appendChild(player2CardDiv);
	addMsg(cardContainer);

	// Add game info: players' cards and outcome of game
	const drawnCards = document.createElement('p');
	drawnCards.innerHTML = `Player 1 drew ${player1Card.name}${player1Card.symbol}.<br>
  Player 2 drew ${player2Card.name}${player2Card.symbol}.`;

	const outcome = document.createElement('p');
	if (player1Card.rank === player2Card.rank) {
		// addMsg(`It's a draw!`);
		outcome.innerText += `It's a draw!`;
	} else if (player1Card.rank > player2Card.rank) {
		// addMsg(`Player 1 wins!`);
		outcome.innerText += `Player 1 wins!`;
	} else {
		// addMsg(`Player 2 wins!`);
		outcome.innerText += `Player 2 wins!`;
	}

	addMsg(drawnCards);
	addMsg(outcome);

	// Reset player turn
	playerTurn = 1;
};

// ----- Game initialisation ----------------------------------------------------
const initGame = () => {
	// Set attributes for divs
	gameInfo.setAttribute('id', 'game-info');
	btnDiv.setAttribute('class', 'btn-container');
	cardContainer.setAttribute('class', 'card-container');

	// Add game info: starting game message
	gameInfo.innerHTML = `Let's play a game! Player 1, draw a card.`;
	document.body.appendChild(gameInfo);

	// Set text of buttons & append to btnDiv & body
	player1Btn.innerText = 'Player 1 Draw';
	player2Btn.innerText = 'Player 2 Draw';

	btnDiv.appendChild(player1Btn);
	btnDiv.appendChild(player2Btn);
	document.body.appendChild(btnDiv);

	// Add event listeners to buttons
	player1Btn.addEventListener('click', player1Click);
	player2Btn.addEventListener('click', player2Click);
};

initGame();
