function checkingLength(string, chars) {
  return string.length === chars;
}

function palindromChecking(phrase) {

  phrase = phrase.toLowerCase();
  phrase = phrase.replaceAll(' ', '');
  const symbolCount = phrase.length;
  let phraseReverse = '';

  for (let i = 1; i <= symbolCount; i++) {
    phraseReverse += phrase[phrase.length - i];
  }
  return phrase === phraseReverse;
}


checkingLength();
palindromChecking();
