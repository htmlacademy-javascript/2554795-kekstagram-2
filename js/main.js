const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Олег', 'Ольга', 'Александр', 'Сергей', 'Петр', 'Геннадий', 'Эдуард', 'Аглая '];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getCommentMessage () {
  const howMuchComments = getRandomInteger(1,2);
  if (howMuchComments === 1) {
    const commentNum = getRandomInteger(0, MESSAGES.length - 1);
    return MESSAGES[commentNum];
  }
  const commentNum1 = getRandomInteger(0, MESSAGES.length - 1);
  let commentNum2 = getRandomInteger(0, MESSAGES.length - 1);
  while (commentNum1 === commentNum2) {
    commentNum2 = getRandomInteger(0, MESSAGES.length - 1);
  }
  const commentMessage = MESSAGES[commentNum1] + MESSAGES[commentNum2];
  return commentMessage;
}

const uniqId = createRandomIdFromRangeGenerator(1,25);
const uniqPhotoId = createRandomIdFromRangeGenerator(1,25);
const uniqCommentId = createRandomIdFromRangeGenerator(1,10000);

const getComment = () => ({
  id : uniqCommentId(),
  avatar : 'avatar-' + getRandomInteger(1,6) + '.svg',
  message : getCommentMessage(),
  name : NAMES[getRandomInteger(0, NAMES.length - 1)]
}
);

const getPhotos = () =>(
  {
    id : uniqId(),
    url : 'photos/' + uniqPhotoId() + '.jpg',
    description : 'Самое красивое фото',
    likes : getRandomInteger(15,200),
    comments: Array.from({length: getRandomInteger(0,30)}, getComment)
  });

const photos = Array.from({length: 25}, getPhotos);


