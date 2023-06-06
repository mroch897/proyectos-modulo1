import { DOCUMENTATION } from "./constants";

import "./style.css";
const toggleButton=document.querySelector("#menu-toggle");
const inputSearch = document.querySelector("#menu-search");
const menuContentElement=document.querySelector("#menu-content");
const favoritesListElement = document.querySelector("#menu-content>.favorites");
const searchBlockElement = document.querySelector("#menu-content>.search");

const getDocumentationTemplate = (title, url) => {
  return `
    <li class="favorite-element">
    <a href="${url}" target="__blank">${title}</a>
    </li>
    `;
};

const generateList = (listId, elements) => {
  const ulElement = document.createElement("ul");
  ulElement.id=listId;

  elements.forEach((element) => {
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });

  return ulElement;
};

const setUpfavortitesList = () => {
  const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
  const favoritesUl = generateList("favorites-list", favorites);
  favoritesListElement.append(favoritesUl);
};

const normalizeText = (text) => text.trim().toLowerCase();

const handleSearch = (event) => {
  const { value } = event.target;
  const normalizedValue = normalizeText(value);

  const filteredDocumentation = DOCUMENTATION.filter((doc) => {
    const normalizedTitle = normalizeText(doc.title);
    return normalizedTitle.includes(normalizedValue);
  });

  const searchUl= generateList("search-ul", filteredDocumentation);

  const previousUl = document.querySelector("#search-ul"); // Borramos la linea anterior
  if (previousUl) {
    previousUl.remove();
  }

  searchBlockElement.append(searchUl);
};

const toggleOpenMenu=()=> {
  menuContentElement.classList.toggle("menu-content--open");

}
toggleButton.addEventListener('click', toggleOpenMenu);
inputSearch.addEventListener("input", handleSearch);

setUpfavortitesList();
