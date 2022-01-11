// Please implement exercise logic here

///  BOILER

// Get a random index ranging from 0 (inclusive) to max (exclusive).

// Shuffle an array of cards
const shuffleCards = (cards) => {
  const length = cards.length;
  for (let currentIndex = 0; currentIndex < length; currentIndex += 1) {
    const randomIndex =
      Math.floor(Math.random() * (length - currentIndex)) + currentIndex;
    console.log(`----`);
    console.log(randomIndex);
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];

    console.log(cards[currentIndex]);
  }
  return cards;
};
const SUITS = ["hearts", "diamonds", "clubs", "spades"];
const makeShuffledDeck = () => {
  // make
  const cards = [];
  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex += 1) {
    const currentSuit = SUITS[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let name = ``;
      if (rankCounter === "1") {
        cardName = "ace";
      } else if (rankCounter === "11") {
        cardName = "jack";
      } else if (rankCounter === "12") {
        cardName = "queen";
      } else if (rankCounter === "13") {
        cardName = "king";
      } else {
        cardName = `${rankCounter}`;
      }
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cards.push(card);
    }
  }
  // shuffle
  shuffleCards(cards);
  return cards;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/// END BOILER
// CSS class name
const CLASS_ROOT_TAG = `playing-area`;
const CLASS_MAT = `high-mat`;
const CLASS_SEAT_ROW = `high-seat-row`;
const CLASS_SEAT = `high-seat`;
const CLASS_BANNER = `high-banner`;
const CLASS_BUTTON_ROW = `high-button-row`;

const ROOT_TAG = document.createElement(`div`);
ROOT_TAG.classList.add();
document.body.appendChild(ROOT_TAG);
const PLAYER_NAMES = [`Player 1`, `Player 2`];

const createPlayers = (names) => {
  return names.reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        name: name,
        seat: { html: null, value: null },
        draw: { html: null },
        card: { html: null, value: null },
      },
    };
  }, {});
};

const CARDS = makeShuffledDeck();
const PLAYERS = createPlayers(PLAYER_NAMES);
const PLAYER_COUNT = PLAYER_NAMES.length;

const drawCard = (cards) => cards.pop();

const mat = document.createElement(`div`);
mat.classList.add(CLASS_MAT);

const htmlSeatRow = document.createElement(`div`);
htmlSeatRow.classList.add(CLASS_SEAT_ROW);

const htmlButtonRow = document.createElement(`div`);
htmlButtonRow.classList.add(CLASS_BUTTON_ROW);

const htmlButtonRestart = document.createElement(`button`);
const htmlButtonRestartDesc = document.createTextNode(`restart`);
htmlButtonRestart.appendChild(htmlButtonRestartDesc);

const htmlBanner = document.createElement(`div`);
htmlBanner.classList.add(CLASS_BANNER);

const settle = (playerNames) => {
  let maxNames = [];
  let maxRank = -1;

  for (const name of playerNames) {
    const {
      card: {
        value: { rank },
      },
    } = PLAYERS[name];
    console.log(rank);
    if (rank > maxRank) {
      maxRank = rank;
      maxNames = [name];
    } else if (rank === maxRank) {
      maxNames.push(name);
    }
  }
  htmlBanner.innerText = `Winner${maxNames > 1 ? `s` : ``}: ${maxNames}`;
  htmlButtonRow.replaceChildren(htmlButtonRestart);
};

let drawCount = 0;
const drawButtonPressed = (playerName) => {
  console.log(`${playerName} pressed draw`);
  const { card } = PLAYERS[playerName];

  if (card.value || card.html) {
    !card.value && !card.html;
    htmlBanner.innerText = `Hi ${playerName}, You've already drawn a card . . . `;
    return;
  } else {
    const { seat } = PLAYERS[playerName];
    !!seat.html;
    const cardValue = drawCard(CARDS);
    card.html = document.createElement(`div`);
    card.value = cardValue;
    const { suit, name: CardName } = card.value;
    card.html.innerText = `${suit[0].toUpperCase()} | ${CardName}`;
    seat.html.appendChild(card.html);
    drawCount += 1;
    console.log(`draw c ${drawCount} plc ${PLAYER_COUNT}`);
    if (drawCount === PLAYER_COUNT) {
      settle(PLAYER_NAMES);
    }
  }
};
for (const name of PLAYER_NAMES) {
  const htmlSeat = document.createElement(`div`);
  htmlSeat.classList.add(CLASS_SEAT);
  PLAYERS[name].seat.html = htmlSeat;
  htmlSeatRow.appendChild(htmlSeat);

  const htmlDrawButton = document.createElement(`button`);
  const htmlDrawDesc = document.createTextNode(`${name} Draw`);
  htmlDrawButton.appendChild(htmlDrawDesc);
  htmlDrawButton.addEventListener(`click`, () =>
    drawButtonPressed(name, htmlBanner)
  );
  PLAYERS[name].draw.html = htmlDrawButton;
  htmlButtonRow.appendChild(htmlDrawButton);
}

mat.appendChild(htmlSeatRow);
mat.appendChild(htmlBanner);
ROOT_TAG.appendChild(mat);
ROOT_TAG.appendChild(htmlButtonRow);

// Flow

// TURN: A player has a "seat" with a button, waiting to draw
// END OF TURN: Next player, or settlement phase.

// ACTIONS: DRAW

// Ui

/**
 *
 *  [SEAT]      [SEAT]
 *  [BUTTON]  [BUTTON]
 */
