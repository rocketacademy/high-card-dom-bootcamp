// CSS class name
const CLASS_ROOT_TAG = `high-playing-area`;
const CLASS_MAT = `high-mat`;
const CLASS_SEAT_ROW = `high-seat-row`;
const CLASS_SEAT = `high-seat`;
const CLASS_BANNER = `high-banner`;
const CLASS_BUTTON_ROW = `high-button-row`;
const CLASS_CARD = `high-card`;

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

/**
 * @returns a set of players with its associated playing objects. Example : {
 *                                                                            PLAYER_1 : {
                                                                                name: PLAYER_1,
                                                                                seat: { html: null, value: null },
                                                                                draw: { html: null },
                                                                                card: { html: null, value: null },
                                                                              },
                                                                              PLAYER_2: {
                                                                                name: PLAYER_2,
                                                                                seat: { html: null, value: null },
                                                                                draw: { html: null },
                                                                                card: { html: null, value: null },
                                                                              },}
 */
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

const main = (rootTag, playerNames, cards) => {
  const playerCount = playerNames.length;
  const players = createPlayers(playerNames);
  const state = { drawCount: 0, currentPlayerIndex: 0 };
  // if cards less than players, wash a new deck
  cards = !cards || cards.length <= playerCount ? makeShuffledDeck() : cards;

  const htmlMat = document.createElement(`div`);
  htmlMat.className += ` ${CLASS_MAT}`;

  const htmlSeatRow = document.createElement(`div`);
  htmlSeatRow.className += ` ${CLASS_SEAT_ROW}`;

  const htmlButtonRow = document.createElement(`div`);
  htmlSeatRow.className += ` ${CLASS_BUTTON_ROW}`;

  const htmlButtonRestart = document.createElement(`button`);
  htmlButtonRestart.addEventListener(`click`, () => main(rootTag, playerNames));
  const htmlButtonRestartDesc = document.createTextNode(`restart`);
  htmlButtonRestart.appendChild(htmlButtonRestartDesc);

  const htmlBanner = document.createElement(`div`);
  htmlBanner.className += ` ${CLASS_BANNER}`;

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
    htmlBanner.innerText =
      maxNames > 1
        ? `Multiple winners, more the merrier! ${maxNames}`
        : `Winner ${maxNames}`;

    // show restart button
    htmlButtonRow.replaceChildren(htmlButtonRestart);
  };

  const drawButtonPressed = (playerName) => {
    const { card } = players[playerName];

    if (playerNames[state.currentPlayerIndex] !== playerName) {
      htmlBanner.innerText = `Hi ${playerName}, Please wait for your turn :)`;
      return;
    }
    if (card.value) {
      // one card per player
      // !card.value && !card.html;
      htmlBanner.innerText = `Hi ${playerName}, You've already drawn a card ~`;
      return;
    } else {
      const {
        seat: { html: htmlSeat },
      } = players[playerName];
      // !!seat.html;

      const cardValue = drawCard(cards);
      const cardHtml = document.createElement(`div`);
      cardHtml.className += ` ${CLASS_CARD}`;
      const { suit, name: cardName } = cardValue;

      // set card html first character of suit and card name
      cardHtml.innerText = `${suit[0].toUpperCase()} | ${cardName}`;
      htmlSeat.appendChild(cardHtml);

      card.html = cardHtml;
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

  htmlMat.replaceChildren(htmlSeatRow, htmlBanner);
  rootTag.replaceChildren(htmlMat, htmlButtonRow);
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

const ROOT_TAG = document.createElement(`div`);
ROOT_TAG.className += ` ${CLASS_ROOT_TAG}`;
document.body.appendChild(ROOT_TAG); // !!

const PLAYER_NAMES = [`Player 1`, `Player 2`];

main(ROOT_TAG, PLAYER_NAMES);
