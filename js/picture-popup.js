const closePopupButton = 'Escape';

const body = document.querySelector('body');
const picturePopUp = document.querySelector('.big-picture');
const closeButtonPopUp = document.querySelector('.big-picture__cancel');
const bigPictureUrl = document.querySelector('.big-picture__img');
const pictureLikes = document.querySelector('.likes-count');
const shownComments = document.querySelector('.social__comment-shown-count');
const totalComments = document.querySelector('.social__comment-total-count');
const description = document.querySelector('.social__caption');
const comments = document.querySelector('.social__comments');
const comment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

const countCommentsToShow = 5;
let currentComments = [];
let startIndex = 0;


function showCommentLoader() {
  if (currentComments.length <= 5) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', addComments);
  }
}

function clearComments() {
  comments.innerHTML = '';
}

function addComments () {

  const endIndex = Math.min(startIndex + countCommentsToShow, currentComments.length);
  shownComments.textContent = endIndex;

  const toShow = currentComments.slice(startIndex, endIndex);

  startIndex += countCommentsToShow;

  if (startIndex >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }

  toShow.forEach((data) => {
    const newComment = comment.cloneNode(true);
    const avatar = newComment.querySelector('.social__picture');
    avatar.src = data.avatar;
    avatar.alt = data.name;
    newComment.querySelector('.social__text').textContent = data.message;
    comments.appendChild(newComment);
  });

}

const onPopupKeydown = (event) => {
  if (event.key === closePopupButton) {
    event.preventDefault();
    closePopup();
  }
};

function closePopup() {
  picturePopUp.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupKeydown);
  commentsLoader.removeEventListener('click', addComments);
}

function fillPopupData(url, desc, likes, allComments) {

  bigPictureUrl.firstElementChild.src = url;
  pictureLikes.textContent = likes;
  description.textContent = desc;

  totalComments.textContent = allComments.length;

  currentComments = allComments;
  startIndex = 0;
  clearComments();
  addComments();
}


function openPopup(url, desc, likes, allComments) {
  fillPopupData(url, desc, likes, allComments);

  picturePopUp.classList.remove('hidden');
  body.classList.add('modal-open');

  showCommentLoader();

  closeButtonPopUp.addEventListener('click', closePopup);

  document.addEventListener('keydown', onPopupKeydown);

}

export {openPopup};
