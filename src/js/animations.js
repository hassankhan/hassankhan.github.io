document.addEventListener("DOMContentLoaded", function (event) {
  //set animation timing
  var animationDelay = 3000;
  var profileEl = document.querySelector('.profile.slide');
  var words = profileEl.querySelectorAll('.slide__items .slide__item');

  animate();

  function animate() {

    var width = 0;

    words.forEach(function(word) {

      var wordWidth = word.offsetWidth;
      if (word.offsetWidth > width) {
        width = wordWidth;
      }
    });

    profileEl.querySelector('.slide__items')
      .setAttribute('style', 'width: ' + width + 'px');

    //trigger animation
    setTimeout(function() {
      hideWord(0);
    }, animationDelay);
  }

  function hideWord($wordIndex) {

    var $word = words[$wordIndex];
    var nextWord = words[getNextIndex($wordIndex)];

    switchWord($word, nextWord);
    setTimeout(function() {
      hideWord(getNextIndex($wordIndex));
    }, animationDelay);
  }

  function getNextIndex(currentIndex) {
    return currentIndex + 1 >= words.length
      ? 0
      : currentIndex + 1;
  }

  function switchWord($oldWord, $newWord) {

    $oldWord.classList.remove('is-visible');
    $oldWord.classList.add('is-hidden');

    $newWord.classList.remove('is-hidden');
    $newWord.classList.add('is-visible');
  }
});
