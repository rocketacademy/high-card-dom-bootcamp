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
const addMsg = (msg) => {
	gameInfo.innerHTML = msg;
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

// ----- Gameplay Logic -----------------------------------------------------

// Get game results
const determineResults = () => {
	let player1RankDiff;
	let player2RankDiff;

	if (player2Cards.length < 2) {
		player1RankDiff = player1Cards[0].rank;
		player2RankDiff = player2Cards[0].rank;
	}

	// If there are 2 or more cards per hand
	else {
		// Sort players' cards from lowest to highest
		player1Cards.sort(function (a, b) {
			return a.rank - b.rank;
		});
		player2Cards.sort(function (a, b) {
			return a.rank - b.rank;
		});

		// Find the difference between highest and lowest cards
		player1RankDiff =
			player1Cards[player1Cards.length - 1].rank - player1Cards[0].rank;
		player2RankDiff =
			player2Cards[player2Cards.length - 1].rank - player2Cards[0].rank;
	}

	console.log(player1RankDiff, player2RankDiff);

	// Winner is the one with greatest difference
	let winner = `It's a draw!`;
	if (player1RankDiff > player2RankDiff) {
		winner = `Player 1 wins!`;
	} else if (player1RankDiff < player2RankDiff) {
		winner = `Player 2 wins!`;
	}

	player1Btn.disabled = true;
	player2Btn.disabled = true;
	getResultsBtn.disabled = true;

	addMsg(winner);
};

// ----- Global variables ----------------------------------------------------

// Deck
let deck;

// Divs
const gameInfo = document.createElement('div');
const btnDiv = document.createElement('div');
const cardContainer = document.createElement('div');
const player1CardContainer = document.createElement('div');
const player2CardContainer = document.createElement('div');

// Buttons
const player1Btn = document.createElement('button');
const player2Btn = document.createElement('button');
const getResultsBtn = document.createElement('button');
const resetGameBtn = document.createElement('button');

// Player turn
let playerTurn = 1;
const player1Cards = [];
const player2Cards = [];

// ------ Callback functions ----------------------------------------------------
const player1Click = () => {
	if (playerTurn === 1) {
		console.log(`Please wait. Drawing Player 1's card...`);

		// Draw a card for player 1
		player1Cards.push(deck.pop());
		console.log('Player 1', player1Cards[player1Cards.length - 1]);

		// Create a card div
		const player1NewCard = makeCard(player1Cards[player1Cards.length - 1]);
		player1CardContainer.appendChild(player1NewCard);

		addMsg(`Player 2, your turn.`);

		// Next player's turn
		player1Btn.disabled = true;
		player2Btn.disabled = false;
		getResultsBtn.disabled = true;
		playerTurn = 2;
	}
};

const player2Click = () => {
	if (playerTurn === 2) {
		console.log(`Please wait. Drawing player 2's card...`);

		getResultsBtn.disabled = false;
		// Draw card for player 2
		player2Cards.push(deck.pop());
		console.log('Player 2', player2Cards[player2Cards.length - 1]);

		// Create card div & append it to card-container div
		const player2NewCard = makeCard(player2Cards[player2Cards.length - 1]);
		player2CardContainer.appendChild(player2NewCard);

		addMsg(`Player 1, your turn.`);

		if (player2Cards.length === 5) {
			determineResults();
			return;
		}

		// Reset player turn
		player1Btn.disabled = false;
		player2Btn.disabled = true;
		playerTurn = 1;
	}
};

// Reset game
const resetGame = () => {
	// New deck
	deck = shuffleCards(makeDeck());
	// Reset player turn & players' hands
	playerTurn = 1;
	player1Cards.length = 0;
	player2Cards.length = 0;

	gameInfo.innerHTML = `Let's play a game! Player 1, draw a card.`;
	player1CardContainer.innerHTML = `<p>Player 1's cards</p>`;
	player2CardContainer.innerHTML = `<p>Player 2's cards</p>`;

	player1Btn.disabled = false;
	player2Btn.disabled = true;
};

// ----- Game initialisation ----------------------------------------------------
const initGame = () => {
	// Create deck
	deck = shuffleCards(makeDeck());

	// Set attributes for divs
	gameInfo.setAttribute('id', 'game-info');
	btnDiv.classList.add('btn-container');
	cardContainer.classList.add('card-container');
	player1CardContainer.setAttribute('id', 'player1-container');
	player2CardContainer.setAttribute('id', 'player2-container');

	player1CardContainer.innerHTML = `<p>Player 1's cards</p>`;
	player2CardContainer.innerHTML = `<p>Player 2's cards</p>`;

	// Add game instructions
	const instructions = document.createElement('div');
	instructions.setAttribute('id', 'instructions');
	instructions.innerHTML = `There are 2 ways to win:
	<ol>
	<li>If both players have 1 card each, you win if your card has the higher rank.</li>
	<li>For multiple cards (up to 5), you win if the difference between your highest and lowest card ranks is greater than your opponent's.</li>
	</ol>`;
	document.body.appendChild(instructions);

	// Add game info: starting game message
	gameInfo.innerHTML = `Let's play a game! Player 1, draw a card.`;
	document.body.appendChild(gameInfo);

	// Set text of buttons & append to btnDiv & body
	player1Btn.innerText = 'Player 1 Draw';
	player2Btn.innerText = 'Player 2 Draw';
	player2Btn.disabled = true;
	getResultsBtn.innerText = 'Get results';
	getResultsBtn.disabled = true;
	resetGameBtn.innerText = 'Reset';

	btnDiv.appendChild(player1Btn);
	btnDiv.appendChild(player2Btn);
	btnDiv.appendChild(getResultsBtn);
	btnDiv.appendChild(resetGameBtn);
	document.body.appendChild(btnDiv);

	cardContainer.appendChild(player1CardContainer);
	cardContainer.appendChild(player2CardContainer);
	document.body.appendChild(cardContainer);

	// Add event listeners to buttons
	player1Btn.addEventListener('click', player1Click);
	player2Btn.addEventListener('click', player2Click);
	getResultsBtn.addEventListener('click', determineResults);
	resetGameBtn.addEventListener('click', resetGame);
};

initGame();
