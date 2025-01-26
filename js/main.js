import { getPhoto } from './data.js';
import { renderPhotos } from './picture.js';
import { openPopUp } from './picture-popup.js';

const PHOTOS_MAX = 25;

const photos = Array.from({ length: PHOTOS_MAX }, getPhoto);
renderPhotos(photos);

export {photos};

const pictures = document.querySelectorAll('.picture');

pictures.forEach((picture) => {
  picture.addEventListener('click', openPopUp);
});
