// CSS class name
const CLASS_ROOT_TAG = `high-playing-area`;

const CLASS_MAT = `high-mat`;

const CLASS_SEAT_ROW = `high-seat-row`;
const CLASS_SEAT = `high-seat`;

const CLASS_CARD = `high-card`;
const CLASS_CARD_SUIT = `high-card`;
const CLASS_CARD_VALUE = `high-card`;

const CLASS_BANNER = `high-banner`;

const CLASS_BUTTON_ROW = `high-button-row`;

/** CARDS */
const SUITS = ["hearts", "diamonds", "clubs", "spades"];

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
        cardName = "ace";
      } else if (rankCounter === 11) {
        cardName = "jack";
      } else if (rankCounter === 12) {
        cardName = "queen";
      } else if (rankCounter === 13) {
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

/** LOGIC HELPERS */

/**
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
        draw: { element: null },
        card: { element: null, value: null },
      },
    };
  }, {});
};

const createRootTag = () => {
  const element = document.createElement(`div`);
  element.className += ` ${CLASS_ROOT_TAG}`;
  return element;
};

const drawCard = (cards) => cards.pop();

/** UI HELPERS */

const newElementCard = (cardValue) => {
  const elementCard = document.createElement(`div`);
  elementCard.className += ` ${CLASS_CARD}`;
  const { suit, name } = cardValue;

  const elementCardSuit = document.createElement(`div`);
  elementCardSuit.innerText = `${suit[0].toUpperCase()}`;

  const elementCardName = document.createElement(`div`);
  elementCardName.innerText = `${name}`;
  elementCard.replaceChildren(elementCardSuit, elementCardName);

  return elementCard;
};

const startGame = (rootTag, playerNames, cards) => {
  const playerCount = playerNames.length;
  const players = createPlayers(playerNames);

  const state = { drawCount: 0, currentPlayerIndex: 0 };
  // if cards less than players, wash a new deck
  cards = !cards || cards.length <= playerCount ? makeShuffledDeck() : cards;

  const elementMat = document.createElement(`div`);
  elementMat.className += ` ${CLASS_MAT}`;

  const elementSeatRow = document.createElement(`div`);
  elementSeatRow.className += ` ${CLASS_SEAT_ROW}`;

  const elementButtonRow = document.createElement(`div`);
  elementSeatRow.className += ` ${CLASS_BUTTON_ROW}`;

  const elementButtonRestart = document.createElement(`button`);
  elementButtonRestart.addEventListener(`click`, () =>
    startGame(rootTag, playerNames)
  );
  const elementButtonRestartDesc = document.createTextNode(`restart`);
  elementButtonRestart.appendChild(elementButtonRestartDesc);

  const elementBanner = document.createElement(`div`);
  elementBanner.className += ` ${CLASS_BANNER}`;

  const settle = (playerNames) => {
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
        ? `Multiple winners, more the merrier! ${maxNames}`
        : `Winner ${maxNames}`;

    // show restart button
    elementButtonRow.replaceChildren(elementButtonRestart);
  };

  const drawButtonPressed = (playerName) => {
    const { card } = players[playerName];

    // orderly play
    if (playerNames[state.currentPlayerIndex] !== playerName) {
      elementBanner.innerText = `Hi ${playerName}, Please wait for your turn :)`;
      return;
    }
    // one card per player
    if (card.value) {
      // !card.value && !card.element;
      elementBanner.innerText = `Hi ${playerName}, You've already drawn a card ~`;
      return;
    } else {
      const {
        seat: { element: elementSeat },
      } = players[playerName];
      // !!seat.element;

      const cardValue = drawCard(cards);

      const elementCard = newElementCard(cardValue);

      // set card element first character of suit and card name
      elementSeat.appendChild(elementCard);

      card.element = elementCard;
      card.value = cardValue;

      state.drawCount += 1;
      state.currentPlayerIndex += 1;

      if (state.drawCount === playerCount) {
        settle(playerNames);
      }

      return;
    }

    // !!
  };

  for (const name of playerNames) {
    const elementSeat = document.createElement(`div`);
    elementSeat.classList.add(CLASS_SEAT);
    players[name].seat.element = elementSeat;
    elementSeatRow.appendChild(elementSeat);

    const elementDrawButton = document.createElement(`button`);
    const elementDrawDesc = document.createTextNode(`${name} Draw`);
    elementDrawButton.appendChild(elementDrawDesc);
    elementDrawButton.addEventListener(`click`, () =>
      drawButtonPressed(name, elementBanner)
    );
    players[name].draw.element = elementDrawButton;
    elementButtonRow.appendChild(elementDrawButton);
  }

  elementMat.replaceChildren(elementSeatRow, elementBanner);
  rootTag.replaceChildren(elementMat, elementButtonRow);
};

// <--- HIGH CARD ---->

// Flow

// PLAYER TURN: A player has a "seat" with a button, waiting to draw
// END OF TURN: Next player, or settlement phase.

// SETTLEMENT PHASE: show winner and restart button

// ACTIONS: DRAW

// Ui

/**
 *  [MAT]:
 *        [SEAT]      [SEAT]
 *            [BANNER]
 */

/*
 *  [PLAYING AREA (ROOT)]:
 *
 *               [MAT]
 *        [BUTTON]  [BUTTON]
 */

/*
 *  [document.body]:
 *               [PLAYING AREA (ROOT)]
 */

// <--- START ---->

const ELEMENT_ROOT = createRootTag();
document.body.appendChild(ELEMENT_ROOT); // !!

const PLAYER_NAMES = [`Player 1`, `Player 2`];
startGame(ELEMENT_ROOT, PLAYER_NAMES);
