import {getRandomInteger, createId} from './util.js';

const MIN_VALUE = 1;
const MAX_ID = 25;
const MIN_COMMENT = 1;
const MAX_COMMENT = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;
const MAX_LINES_IN_COMMENT = 2;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Олег', 'Ольга', 'Александр', 'Сергей', 'Петр', 'Геннадий', 'Эдуард', 'Аглая '];

const DESCRIPTION = 'Самое красивое фото';

function getCommentMessage (maxLines) {
  const commentCount = getRandomInteger(1,maxLines);
  let commentsmessage = '';
  for (let i = 1; i <= commentCount; i++) {
    const commentNum = getRandomInteger(0, MESSAGES.length - 1);
    commentsmessage += MESSAGES[commentNum];
  }
  return commentsmessage;
}

const getId = createId(MIN_VALUE,MAX_ID);
const getPhotoId = createId(MIN_VALUE,MAX_ID);
const getCommentId = createId(MIN_COMMENT_ID,MAX_COMMENT_ID);

const getComment = () => ({
  id : getCommentId(),
  avatar : `avatar${getRandomInteger(MIN_AVATAR,MAX_AVATAR)}.svg`,
  message : getCommentMessage(MAX_LINES_IN_COMMENT),
  name : NAMES[getRandomInteger(0, NAMES.length - 1)]
}
);

const getPhoto = () =>(
  {
    id : getId(),
    url :  `photos/${getPhotoId()}.jpg`,
    description : DESCRIPTION,
    likes : getRandomInteger(MIN_LIKES,MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COMMENT,MAX_COMMENT)}, getComment)
  });

export {getPhoto};
