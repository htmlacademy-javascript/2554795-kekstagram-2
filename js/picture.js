import { openPopup } from './picture-popup.js';

function pictureOnClick (evt) {
  openPopup(evt.target);
}

function renderPhotos (photos) {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }, index) => {
    const picture = pictureTemplate.cloneNode(true);
    const newPicture = picture.querySelector('.picture__img');
    newPicture.src = url;
    newPicture.alt = description;
    newPicture.dataset.id = index + 1;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.append(picture);
    picture.addEventListener('click', pictureOnClick);
  });

  picturesContainer.append(picturesFragment);

}

export {renderPhotos};
