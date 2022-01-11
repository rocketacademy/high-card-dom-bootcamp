// Please implement exercise logic here

///  BOILER

// Get a random index ranging from 0 (inclusive) to max (exclusive).

// Shuffle an array of cards
const shuffleCards = (cards) => {
  const length = cards.length;
  for (let i = 0; i < length; i += 1) {
    const j = Math.floor(Math.random() * (length - i)) + i;
    [cards[i], cards[j]] = [cards[j], cards[i]];
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

// CSS class name
const CLASS_ROOT_TAG = `high-playing-area`;
const CLASS_MAT = `high-mat`;
const CLASS_SEAT_ROW = `high-seat-row`;
const CLASS_SEAT = `high-seat`;
const CLASS_BANNER = `high-banner`;
const CLASS_BUTTON_ROW = `high-button-row`;

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
const drawCard = (cards) => cards.pop();

const main = (rootTag, playerNames) => {
  const playerCount = playerNames.length;
  const players = createPlayers(playerNames);

  const cards = makeShuffledDeck();

  const mat = document.createElement(`div`);
  mat.classList.add(CLASS_MAT);

  const htmlSeatRow = document.createElement(`div`);
  htmlSeatRow.classList.add(CLASS_SEAT_ROW);

  const htmlButtonRow = document.createElement(`div`);
  htmlButtonRow.classList.add(CLASS_BUTTON_ROW);

  const htmlButtonRestart = document.createElement(`button`);
  htmlButtonRestart.addEventListener(`click`, () => main(rootTag, playerNames));
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
      } = players[name];
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
    const { card } = players[playerName];

    if (card.value || card.html) {
      !card.value && !card.html;
      htmlBanner.innerText = `Hi ${playerName}, You've already drawn a card . . . `;
      return;
    } else {
      const { seat } = players[playerName];
      !!seat.html;
      const cardValue = drawCard(cards);
      card.html = document.createElement(`div`);
      card.value = cardValue;
      const { suit, name: CardName } = card.value;
      card.html.innerText = `${suit[0].toUpperCase()} | ${CardName}`;
      seat.html.appendChild(card.html);
      drawCount += 1;
      if (drawCount === playerCount) {
        settle(playerNames);
      }
    }
  };

  for (const name of playerNames) {
    const htmlSeat = document.createElement(`div`);
    htmlSeat.classList.add(CLASS_SEAT);
    players[name].seat.html = htmlSeat;
    htmlSeatRow.appendChild(htmlSeat);

    const htmlDrawButton = document.createElement(`button`);
    const htmlDrawDesc = document.createTextNode(`${name} Draw`);
    htmlDrawButton.appendChild(htmlDrawDesc);
    htmlDrawButton.addEventListener(`click`, () =>
      drawButtonPressed(name, htmlBanner)
    );
    players[name].draw.html = htmlDrawButton;
    htmlButtonRow.appendChild(htmlDrawButton);
  }

  mat.replaceChildren(htmlSeatRow, htmlBanner);
  rootTag.replaceChildren(mat, htmlButtonRow);
};

const ROOT_TAG = document.createElement(`div`);
ROOT_TAG.classList.add(CLASS_ROOT_TAG);
document.body.appendChild(ROOT_TAG);
const PLAYER_NAMES = [`Player 1`, `Player 2`];

main(ROOT_TAG, PLAYER_NAMES);

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
