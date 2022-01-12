// CSS class name
const CLASS_ROOT_TAG = `high-playing-area`;

const CLASS_MAT = `high-mat`;

const CLASS_SEAT_ROW = `high-seat-row`;
const CLASS_SEAT = `high-seat`;

const CLASS_CARD = `high-card`;
const CLASS_CARD_SUIT = `high-card-suit`;
const CLASS_CARD_NAME = `high-card-name`;

const CLASS_BANNER = `high-banner`;

const CLASS_BUTTON_ROW = `high-button-row`;

const DRAW_LATENCY_MS = 500;

/** CARDS */
const SUITS = ["❤️", "💎", "♣️", "♠️"];

const shuffleCards = (cards) => {
  const length = cards.length;
  for (let i = 0; i < length; i += 1) {
    const j = Math.floor(Math.random() * (length - i)) + i;
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const makeShuffledDeck = () => {
  // make
  const cards = [];
  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex += 1) {
    const currentSuit = SUITS[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = ``;
      if (rankCounter === 1) {
        cardName = `A`;
      } else if (rankCounter === 11) {
        cardName = `J`;
      } else if (rankCounter === 12) {
        cardName = `👸`;
      } else if (rankCounter === 13) {
        cardName = `👑`;
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

/** LOGIC HELPERS */

/**
 * game registration. 
 * @returns a set of players with its associated playing objects. Example : {
 *                                                                            PLAYER_1 : {
                                                                                name: PLAYER_1,
                                                                                seat: { element: null, value: null },
                                                                                draw: { element: null },
                                                                                card: { element: null, value: null },
                                                                              },
                                                                              PLAYER_2: {
                                                                                name: PLAYER_2,
                                                                                seat: { element: null, value: null },
                                                                                draw: { element: null },
                                                                                card: { element: null, value: null },
                                                                              },}
 */
const createPlayers = (names) => {
  return names.reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        name: name,
        seat: { element: null, value: null },
        drawClicker: { element: null },
        card: { element: null, value: null },
      },
    };
  }, {});
};

const drawCard = (cards) => cards.pop();

/** UI HELPERS */
const newElementRoot = () => {
  const element = document.createElement(`div`);
  element.className += ` ${CLASS_ROOT_TAG}`;
  return element;
};
const newElementCard = (cardValue) => {
  const elementCard = document.createElement(`div`);
  elementCard.className += ` ${CLASS_CARD}`;
  const { suit, name } = cardValue;

  const elementCardSuit = document.createElement(`div`);
  elementCardSuit.innerText = `${suit}`;
  elementCardSuit.className += ` ${CLASS_CARD_SUIT}`;
  const elementCardName = document.createElement(`div`);
  elementCardName.innerText = `${name}`;
  elementCardName.className += ` ${CLASS_CARD_NAME}`;

  elementCard.replaceChildren(elementCardSuit, elementCardName);

  return elementCard;
};

const newElementButtonRow = () => {
  const element = document.createElement(`div`);
  element.className += ` ${CLASS_BUTTON_ROW}`;
  return element;
};

const newElementSeatRow = () => {
  const element = document.createElement(`div`);
  element.className += ` ${CLASS_SEAT_ROW}`;
  return element;
};
const newElementSeat = () => {
  const element = document.createElement(`div`);
  element.className += ` ${CLASS_SEAT}`;
  return element;
};

const newElementMat = () => {
  const element = document.createElement(`div`);
  element.className += ` ${CLASS_MAT}`;
  return element;
};

const newElementButtonRestartDesc = () => document.createTextNode(`restart`);
const newElementDrawDesc = (playerName) =>
  document.createTextNode(`${playerName} Draw`);

const startGame = (rootTag, playerNames, cards) => {
  const playerCount = playerNames.length;
  const players = createPlayers(playerNames);

  const state = { drawCount: 0, drawing: false, currentPlayerIndex: 0 };
  // if cards less than players, wash a new deck
  cards = !cards || cards.length <= playerCount ? makeShuffledDeck() : cards;

  const elementMat = newElementMat();

  const elementSeatRow = newElementSeatRow();

  const elementButtonRow = newElementButtonRow();

  const elementButtonRestart = document.createElement(`button`);
  elementButtonRestart.addEventListener(`click`, () =>
    startGame(rootTag, playerNames)
  );

  const elementButtonRestartDesc = newElementButtonRestartDesc();
  elementButtonRestart.appendChild(elementButtonRestartDesc);

  const elementBanner = document.createElement(`div`);
  elementBanner.className += ` ${CLASS_BANNER}`;

  const _settle = (playerNames) => {
    // gather the winners

    let maxNames = [];
    let maxRank = -1;

    for (const name of playerNames) {
      const {
        card: {
          value: { rank },
        },
      } = players[name]; // get rank
      if (rank > maxRank) {
        maxRank = rank;
        maxNames = [name];
      } else if (rank === maxRank) {
        maxNames.push(name);
      }
    }
    // show in banner
    elementBanner.innerText =
      maxNames > 1
        ? `Winner ${maxNames}`
        : `Multiple winners, more the merrier! ${maxNames}`;

    // show restart button
    elementButtonRow.replaceChildren(elementButtonRestart);
  };

  // player attempts to draw
  const _drawButtonPressed = (playerName) => {
    const { card } = players[playerName];

    if (card.value) {
      // should have at most one card per player
      // !card.value && !card.element;
      elementBanner.innerText = `Hi ${playerName}, You've already drawn a card ~`;
    }

    if (playerNames[state.currentPlayerIndex] !== playerName) {
      // play should be orderly
      elementBanner.innerText = `Hi ${playerName}, Please wait for your turn :)`;
      return;
    }

    const {
      seat: { element: elementSeat },
    } = players[playerName];
    // !!seat.element;

    const elementParentOfButtonRow = elementButtonRow.parentNode;
    elementParentOfButtonRow.removeChild(elementButtonRow);
    elementBanner.innerText = `Drawing card . . . . . . . .`;
    setTimeout(() => {
      const cardValue = drawCard(cards);
      const elementCard = newElementCard(cardValue);

      // set card element
      elementSeat.appendChild(elementCard);

      // record player card info
      card.element = elementCard;
      card.value = cardValue;

      // update game state
      state.drawCount += 1;
      state.currentPlayerIndex += 1;
      elementParentOfButtonRow.appendChild(elementButtonRow);
      elementBanner.innerText = ``;

      // if all players drew one card
      if (state.drawCount === playerCount) {
        // state.currentPlayerIndex === playerCount
        _settle(playerNames);
      }
    }, DRAW_LATENCY_MS);
  };

  for (const name of playerNames) {
    const elementSeat = newElementSeat();

    const elementDrawButton = document.createElement(`button`);
    elementDrawButton.addEventListener(`click`, () =>
      _drawButtonPressed(name, elementBanner)
    );

    const elementDrawDesc = newElementDrawDesc(name);

    // record player info

    players[name].seat.element = elementSeat;
    players[name].drawClicker.element = elementDrawButton;

    elementSeatRow.appendChild(elementSeat);

    elementDrawButton.appendChild(elementDrawDesc);
    elementButtonRow.appendChild(elementDrawButton);
  }

  elementMat.replaceChildren(elementSeatRow, elementBanner);
  rootTag.replaceChildren(elementMat, elementButtonRow);
};

// <--- HIGH CARD ---->

// 1. ---- Flow

// PLAYER TURN: A player has a "seat" with a button, waiting to draw
// END OF TURN: Next player, or settlement phase.

// SETTLEMENT PHASE: show winner and restart button

// ACTIONS: DRAW

// 2. ---- Ui

/**
 *  [MAT]:
 *        [SEAT]      [SEAT]
 *            [BANNER]
 */

/*
 *  [PLAYING AREA (ROOT)]:
 *
 *               [MAT]
 *          ...[BUTTON]
 */

/*
 *  [document.body]:
 *               [PLAYING AREA (ROOT)]
 */

// <--- START ---->

const ELEMENT_ROOT = newElementRoot();
document.body.appendChild(ELEMENT_ROOT); // !!

const PLAYER_NAMES = [`Player 1`, `Player 2`];
startGame(ELEMENT_ROOT, PLAYER_NAMES);
