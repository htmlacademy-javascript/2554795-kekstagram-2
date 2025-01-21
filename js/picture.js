function renderPhotos (photos) {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const picture = pictureTemplate.cloneNode(true);
    const newPicture = picture.querySelector('.picture__img');
    newPicture.src = url;
    newPicture.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
}

export {renderPhotos};
