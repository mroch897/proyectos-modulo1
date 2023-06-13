import "./style.css";

import { TECHNOLOGIES_URL } from "./constants";

//SETUP

const appElement = document.querySelector("#app");

const getModalTemplate = () => `
<div class="thepower-modal" id="thepower-modal">
<div class="modal-header">
<h2 id="modal-title"></h2>
<button id="modal-close">❌</button>

</div>
<div class="body"></div>



</div>`;

getModalTemplate();

const getContainerTemplate = () =>
  `<div class="thepower-gallery" id="thepower-gallery">
    <h1>Loading...🕢</h1>
  </div>`;

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();
//LOGIC
const modalElement = document.querySelector("#thepower-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector(".modal-body");
const galleryElement = document.querySelector("#thepower-gallery");
const loadingElement = document.querySelector("#thepower-gallery > h1");

let cards;

const setupStars = (score) => {
  if (!score) {
    return `<p class="no-rating">No rating</p>`;
  }
  let starContainer = [];
  for (let i = 0; i < score; i++) {
    starContainer.push(`<span class="star">⭐️</span>`);
  }

  return starContainer.join("");
};

const getCardTemplate = (card) => `
  
  <div class="card" role="button" id="${card._id}"> 
  <h3>${card.name}</h3>
  <div class="image-container">
  <img src="${card.logo}" alt="${card.name}" />
  </div>
  <span>${card.score.toFixed(2)}</span>
  <div class="score-container">${setupStars(card.score)}</div></div>
  `;

// Ponemos esto para encontrar el id el $ {card._id}
const setupCards = () => {
  loadingElement.remove();
  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

// Aqui ahora hacemos request a la api con fetch LO bueno es que puedes concatenar mucos

// fetch(TECHNOLOGIES_URL)
//   .then((res) => res.json())
//   .then((cardData) => {
//     cards=cardData
//     setupCards();

//   });

const setupModalData = (cardData) => {
  modalTitle.innerText = cardData.name;

};

const handleOpenModal = (event) => {
  const cardID = event.target.id;
  console.log(cards);
  const cardData = cards.find((card) => card._id === cardID);
 
  setupModalData(cardData);
  modalElement.style.display = "block";
};

const addCardListeners = () => {
  const cards = document.querySelectorAll("#thepower-gallery .card");
  cards.forEach((card) => card.addEventListener("click", handleOpenModal));
};

const getTechnologies = async () => {
  try {
    const res = await fetch(TECHNOLOGIES_URL);
    const cardData = await res.json();

    cards = cardData;
    setupCards();
    addCardListeners();
  } catch (err) {
    loadingElement.innerText = "Error cargando información";
  }
};

const addModalListeners = () => {
  const closeButton = document.querySelector("#thepower-modal #modal-close");
  closeButton.addEventListener("click", () => {
    modalElement.style.display = "none";
  });
};

getTechnologies();

addModalListeners();
