import { photos } from './main.js';

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

function closePopUp() {
  picturePopUp.classList.add('hidden');
  body.classList.remove('modal-open');
}

function openPopUp(evt) {

  const regexpToFindUniqId = /photos.*/;
  const photoId = regexpToFindUniqId.exec(evt.target.src)[0];

  const photo = photos.find((search) => search.url === photoId);

  bigPictureUrl.firstElementChild.src = photo.url;
  pictureLikes.textContent = photo.likes;
  description.textContent = photo.description;

  // Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
  // Я не понял где взять это кол-во, поэтому пока вывожу все комментарии, которы есть

  shownComments.textContent = photo.comments.length;
  totalComments.textContent = photo.comments.length;

  clearComments();

  photo.comments.forEach((data) => {
    const newComment = comment.cloneNode(true);
    const avatar = newComment.querySelector('.social__picture');
    avatar.src = data.avatar;
    avatar.alt = data.name;
    newComment.querySelector('.social__text').textContent = data.message;
    comments.appendChild(newComment);
  });


  picturePopUp.classList.remove('hidden');
  body.classList.add('modal-open');

  // Почему в задании просят "После открытия окна спрячьте блоки счётчика комментариев", ведь по идее легче до рендера это сделать, чем два раза перерендерить?

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  closeButtonPopUp.addEventListener('click', closePopUp);

  //обьявляью evt вначале функции и тут снова он нужен, переименовывать или как обычно принято?
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePopUp();
    }
  });

}
export {openPopUp};
