document.addEventListener("DOMContentLoaded", () => {

  const ANIMATION_DELAY = 3000;
  const PROFILE_CLASS = '.profile.slide';
  const SLIDE_CLASS = '.slide__items';
  const SLIDE_ITEMS_CLASS = '.slide__items .slide__item';

  const profileEl = document.querySelector<HTMLDivElement>(PROFILE_CLASS);
  if (!profileEl) {
    throw new Error(`Element with class ${PROFILE_CLASS} not found`);
  }

  const slideEl = profileEl!.querySelector(SLIDE_CLASS);
  if (!slideEl) {
    throw new Error(`Element with class ${SLIDE_CLASS} not found`);
  }

  const wordElements = profileEl.querySelectorAll<HTMLSpanElement>(SLIDE_ITEMS_CLASS);

  const initializeAnimation = () => {

    // Find the longest word, and also set each element to have
    // 100% width

    let width = 0;

    wordElements.forEach(function(word) {

      if (word.offsetWidth > width) {
        width = word.offsetWidth;
      }

      // This can't be set in CSS because it causes weird
      // text overflow
      word.setAttribute('style', 'width: 100%;');
    });

    // Set slide element to longest word's width
    slideEl.setAttribute('style', `width: ${width}px`);

    // Trigger animation
    setTimeout(() => {
      hideWord(0);
    }, ANIMATION_DELAY);
  }

  const hideWord = (wordIndex: number) => {

    const previousWord = wordElements[wordIndex];
    const nextWord = wordElements[getNextIndex(wordIndex)];

    switchWord(previousWord, nextWord);
    setTimeout(() => {
      hideWord(getNextIndex(wordIndex));
    }, ANIMATION_DELAY);
  }

  const getNextIndex = (currentIndex: number) => {
    return currentIndex + 1 >= wordElements.length ? 0 : currentIndex + 1;
  }

  const switchWord = (previousWord: Element, nextWord: Element) => {

    previousWord.classList.remove('is-visible');
    previousWord.classList.add('is-hidden');

    nextWord.classList.remove('is-hidden');
    nextWord.classList.add('is-visible');
  }

  initializeAnimation();
});
