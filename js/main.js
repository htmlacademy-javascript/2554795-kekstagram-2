import {getPhoto} from './data.js';

const PHOTOS_MAX = 25;

const photos = Array.from({length: PHOTOS_MAX}, getPhoto);
