import { galleryItems } from './gallery-items.js';

const root = document.querySelector('.gallery');
root.addEventListener('click', handleItemClick);

let instance;

function handleItemClick(event) {
  event.preventDefault();
  window.addEventListener('keydown', handlePressKeys);

  const { source } = event.target.dataset;

  instance = basicLightbox.create(`
    <img src="${source}" width="800" height="600" />
  `);

  instance.show();
}

function closeGalleryModal() {
  instance.close();
  window.removeEventListener(handlePressKeys);
}

function handlePressKeys(event) {
  if (event.code === 'Escape') {
    closeGalleryModal();
  }
}

function renderGalleryList() {
  const markup = galleryItems
    .map(
      ({ preview, description, original }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join('');

  root.insertAdjacentHTML('beforeend', markup);
}

renderGalleryList();
