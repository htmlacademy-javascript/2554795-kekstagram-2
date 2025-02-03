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
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

function clearComments() {
  comments.innerHTML = '';
}

function addComments (allComments) {
  allComments.forEach((data) => {
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

}


function fillPopupData(url, desc, likes, allComments) {

  bigPictureUrl.firstElementChild.src = url;
  pictureLikes.textContent = likes;
  description.textContent = desc;

  shownComments.textContent = allComments.length;
  totalComments.textContent = allComments.length;

  clearComments();
  addComments(allComments);
}

function openPopup(url, desc, likes, allComments) {
  fillPopupData(url, desc, likes, allComments);

  picturePopUp.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  closeButtonPopUp.addEventListener('click', closePopup);

  document.addEventListener('keydown', onPopupKeydown);

}

export {openPopup};
