// Please implement exercise logic here

const ROOT_TAG = document.body;

const PLAYER_NAMES = [`Player 1`, `Player 2`];

const resetPlayers = (names) => {
  return names.reduce((acc, name) => {
    return {
      ...acc,
      [name]: { name: name, htmlSeat: null, htmlDrawButton: null },
    };
  }, {});
};

const PLAYER = resetPlayers(PLAYER_NAMES);
const PLAYER_COUNT = PLAYER.length;

const CLASS_MAT = `high-mat`;
const CLASS_SEAT_ROW = `high-seat-row`;
const CLASS_SEAT = `high-seat`;
const CLASS_BANNER = `high-banner`;
const CLASS_DRAW_BUTTON_ROW = `high-button-draw-row`;

const drawButtonPressed = (name) => {
  console.log(`${name} pressed draw`);
};
const mat = document.createElement(`div`);
mat.classList.add(CLASS_MAT);

const htmlSeatRow = document.createElement(`div`);
htmlSeatRow.classList.add(CLASS_SEAT_ROW);

const htmlDrawButtonRow = document.createElement(`div`);
htmlDrawButtonRow.classList.add(CLASS_DRAW_BUTTON_ROW);

for (const name of PLAYER_NAMES) {
  const htmlSeat = document.createElement(`div`);
  htmlSeat.classList.add(CLASS_SEAT);
  PLAYER[name].htmlSeat = htmlSeat;
  htmlSeatRow.appendChild(htmlSeat);

  const htmlDrawButton = document.createElement(`button`);
  htmlDrawButton.addEventListener(`click`, () => drawButtonPressed(name));
  PLAYER[name].htmlDrawButton = htmlDrawButton;
  htmlDrawButtonRow.appendChild(htmlDrawButton);
}

const htmlBanner = document.createElement(`div`);
htmlBanner.classList.add(CLASS_BANNER);
mat.appendChild(htmlSeatRow);
mat.appendChild(htmlBanner);
ROOT_TAG.appendChild(mat);
ROOT_TAG.appendChild(htmlDrawButtonRow);

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
