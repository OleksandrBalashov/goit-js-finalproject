import { galleryItems } from './gallery-items.js';

const rootRef = document.querySelector('.gallery');
rootRef.addEventListener('click', handleItemClick);

let instance;

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

rootRef.insertAdjacentHTML('beforeend', markup);

function handleItemClick(event) {
  event.preventDefault();
  window.addEventListener('keydown', handlePressKeys);

  const { source } = event.target.dataset;

  instance = basicLightbox.create(`
    <img src="${source}" width="800" height="600" />
  `);

  instance.show();

  backdropHandler();
}

function handlePressKeys(event) {
  if (event.code === 'Escape') {
    closeGalleryModal();
  }
}

function closeGalleryModal() {
  instance.close();
  window.removeEventListener('keydown', handlePressKeys);
}

function backdropHandler() {
  const backdropRef = document.querySelector('.basicLightbox');
  backdropRef.addEventListener('click', () => {
    window.removeEventListener('keydown', handlePressKeys);
  });
}
