document.addEventListener("DOMContentLoaded", function (event) {
  //set animation timing
  var animationDelay = 2500;

  animate(document.querySelector('.profile.slide'));

  function animate(profileEl) {

    var words = profileEl.querySelectorAll('.slide__items .slide__item');
    var width = 0;

    // console.log('words', words);

    words.forEach(function(word) {
      console.log('word', word);
      console.log('word.offsetWidth', word.offsetWidth);

      var wordWidth = word.offsetWidth;
      if (word.offsetWidth > width) {
        width = wordWidth;
      }
    });

    console.log('width', width);

    profileEl.querySelector('.slide__items')
      .setAttribute('style', 'width: ' + width + 'px');

    //trigger animation
    setTimeout(function() {
      hideWord( profileEl.querySelectorAll('.is-visible')[0] );
    }, animationDelay);
  }

  function hideWord($word) {

    var nextWord = takeNext($word);
    switchWord($word, nextWord);
    setTimeout(function() {
      hideWord(nextWord);
    }, animationDelay);
  }

  function takeNext($word) {
    return ($word.nextSibling !== null && $word.nextSibling.nodeType === 1)
      ? $word.nextSibling
      : $word.parentNode.querySelectorAll('.slide__item')[0];
  }

  function switchWord($oldWord, $newWord) {

    $oldWord.classList.remove('is-visible');
    $oldWord.classList.add('is-hidden');

    $newWord.classList.remove('is-hidden');
    $newWord.classList.add('is-visible');
  }
});
