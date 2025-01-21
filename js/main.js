import {getPhoto} from './data.js';
import {renderPhotos} from './picture.js';

const PHOTOS_MAX = 25;

const photos = Array.from({length: PHOTOS_MAX}, getPhoto);
renderPhotos(photos);
