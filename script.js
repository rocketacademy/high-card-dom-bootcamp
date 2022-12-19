// cardContainer DOM element as a global variable
let cardContainer;
cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
document.body.appendChild(cardContainer);

const cardInfo = {
  suitSymbol: "♦️",
  suit: "diamond",
  name: "queen",
  displayName: "Q",
  colour: "red",
  rank: 12,
};

const makeCard = (cardRank, suit) => {
  //

  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suitSymbol;

  const cardName = document.createElement("div");
  cardName.classList.add(cardInfo.displayName, cardInfo.colour);
  cardName.innerText = cardInfo.rank;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(cardName);
  card.appendChild(suit);
  return card;
};

//Add the container element
const container = document.createElement("div");
container.classList.add("container");
const card = makeCard();
container.appendChild(card);

document.body.appendChild(container);
