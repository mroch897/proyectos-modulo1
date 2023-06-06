import { IMAGES } from "./constants";
import "./style.css";

//Setup
const appElement = document.querySelector("#app");

const getCarouselTemplate = () =>
  `<div id='thepower-carousel' class='thepower-carousel'>
    <ul class='scrollable-set'></ul>
    <div class='image-preview'></div>
    </div>`;
appElement.innerHTML += getCarouselTemplate();

//Logic

const scrollableset = document.querySelector(".scrollable-set");
const imagePrevElement = document.querySelector(".image-preview");

const getScrollableElementTemplate = (image, index) =>
  `
<li role="button" class="clickable">
<img id="image-${index}"src="${image.src}" alt="${image.alt}" />
</li>

`;

const setupScrollableSet = () => {
  IMAGES.forEach((image, index) => {
    const template = getScrollableElementTemplate(image, index);
    scrollableset.innerHTML += template;
  });
};

const setupImagePreviews = (src) => {
  imagePrevElement.style.backgroundImage = `url(${src})`;
};

const handleChangePreview=(event)=> {
  console.log(event.target);
  const image=event.target.children[0];
  setupImagePreviews(image.src);
  
}

const addScrollableListeners = () => {
  const scrollables = document.querySelectorAll("li.clickable");
  scrollables.forEach((scrollable) =>
    scrollable.addEventListener("click", handleChangePreview)
  );
};



setupScrollableSet();
setupImagePreviews(IMAGES[0].src);
addScrollableListeners();
