const HashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
const MaxHashtags = 5;
const MaxCommentLength = 140;

const errorMessages = {
  invalidCharacters: 'Вы используете недопсутимые символы. Хэштег должен начинаться с # и быть не длиннее 20 символов.',
  tooMuchHashtags: 'Разрешено использовать не более 5 хэштегов',
  duplicatesHashtags: 'Есть повторяющиеся хештеги',
  longCommentText: 'Максимальная длинна комментария 140 символов'
};

const closeImgEditorKey = 'Escape';

const uploadImgForm = document.querySelector('.img-upload__form');
const imgEditor = document.querySelector('.img-upload__overlay');
const closeImgEditorButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentText = document.querySelector('.text__description');

const onPopupEditorKeydown = (event) => {
  if (event.key === closeImgEditorKey) {
    event.preventDefault();
    if (document.activeElement === hashtagsInput || document.activeElement === commentText) {
      event.stopPropagation();
    } else {
      closeImgEditorPopup();
    }
  }
};

const openImgEditorPopup = () => {
  document.body.classList.add('modal-open');
  imgEditor.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEditorKeydown);
  closeImgEditorButton.addEventListener('click', closeImgEditorPopup);

};

const uploadImageForm = () => uploadImgForm.addEventListener('change', openImgEditorPopup);

const splitHashtags = (value) => value.toLowerCase().split(' ').filter(Boolean);

const checkHashtagSymbols = (value) => splitHashtags(value).every((hashtag) => HashtagRegex.test(hashtag));
const checkHashtagCount = (value) => splitHashtags(value).length <= MaxHashtags;

const hashtagHasDuplicates = (value) => {
  const hashtags = splitHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const checkCommentLenght = (value) => value.length <= MaxCommentLength;

const pristine = new Pristine(uploadImgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

pristine.addValidator(hashtagsInput, checkHashtagSymbols,errorMessages.invalidCharacters);
pristine.addValidator(hashtagsInput, checkHashtagCount,errorMessages.tooMuchHashtags);
pristine.addValidator(hashtagsInput, hashtagHasDuplicates,errorMessages.duplicatesHashtags);

pristine.addValidator(commentText, checkCommentLenght, errorMessages.longCommentText);

uploadImgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    uploadImgForm.submit();
  }
});

function closeImgEditorPopup () {
  document.body.classList.remove('modal-open');
  imgEditor.classList.add('hidden');

  uploadImgForm.reset();
  pristine.reset();

  document.removeEventListener('keydown', onPopupEditorKeydown);
}

export {uploadImageForm};
