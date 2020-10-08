import { default as images } from "./gallery-items.js";

const body = document.querySelector(`body`);
const gallery = document.querySelector(`.js-gallery`);
const ligthBox = document.querySelector(`.js-lightbox`);
const btnCloseLigthBox = document.querySelector(
  `button[ data-action="close-lightbox"]`
);
const lightboxImage = ligthBox.querySelector(`img`);
const overlay = ligthBox.querySelector(`.lightbox__overlay`);

gallery.addEventListener(`click`, openModalWindow);
btnCloseLigthBox.addEventListener(`click`, closeOverLay);
overlay.addEventListener(`click`, closeOverLay);
window.addEventListener(`keydown`, closeOverLayKey);
window.addEventListener(`keydown`, scrollGallaryImages);

const MakeItemGallery = (option, index) => {
  const { preview, original, description } = option;
  return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="#"
    >
        <img
            loading="lazy"
            class="gallery__image lazyload"
        
            data-source="${original}"
            alt="${description}"
            data-index="${index}"
            data-src = "${preview}"
        />
    </a>
</li> `;
};
const makeItemsGalleryMarkup = images.map(MakeItemGallery);
gallery.insertAdjacentHTML("beforeend", makeItemsGalleryMarkup.join(""));

const galleryImages = document.querySelectorAll(`.js-gallery img`);

function openModalWindow(event) {
  if (event.target.nodeName !== `IMG`) {
    return;
  }
  openOverLay();

  setAtributesImages(event.target);

  scrollGallaryImages();
}

function openOverLay() {
  ligthBox.classList.add(`is-open`);
  body.classList.add(`block_scroll`);
}

function scrollGallaryImages() {
  let imageIndex = Number(lightboxImage.dataset.index);
  if (event.code === `ArrowRight`) {
    let filterIndex =
      imageIndex >= galleryImages.length - 1
        ? galleryImages[0]
        : galleryImages[imageIndex + 1];

    setAtributesImages(filterIndex);
  }
  if (event.code === `ArrowLeft`) {
    let filterIndex =
      imageIndex > 0
        ? galleryImages[imageIndex - 1]
        : galleryImages[galleryImages.length - 1];

    setAtributesImages(filterIndex);
  }
}

function closeOverLay() {
  lightboxImage.removeAttribute(`src`);
  lightboxImage.removeAttribute(`alt`);
  lightboxImage.removeAttribute(`data-index`);

  ligthBox.classList.remove(`is-open`);
  body.classList.remove(`block_scroll`);
}
function closeOverLayKey(event) {
  if (event.code !== `Escape`) {
    return;
  }
  closeOverLay();
}

function setAtributesImages(name) {
  lightboxImage.setAttribute("src", name.dataset.source);
  lightboxImage.setAttribute("alt", name.alt);
  lightboxImage.setAttribute("data-index", name.dataset.index);
}

if (`loading` in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll(`img[loading="lazy"]`);

  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement("script");
  script.src = `https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js`;
  script.integrity = `sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==`;
  script.crossorigin = `anonymous`;

  document.body.appendChild(script);
}
