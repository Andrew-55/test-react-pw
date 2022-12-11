const sliders = document.querySelectorAll('.slider__item');
const slidersLength = sliders.length;
const sliderItems = document.querySelector('.slider__items');
const slidePages = document.querySelector('.slide__pages');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const copyItemRight = document.createElement('div');
const copyItemLeft = document.createElement('div');

let isAnimated = false;

copyItemLeft.classList.add('slider__item__copy');
copyItemRight.classList.add('slider__item__copy');
copyItemLeft.innerHTML = sliders[slidersLength - 1].innerHTML;
copyItemRight.innerHTML = sliders[0].innerHTML;

const pages = [];
let width = 0;
let page = 0;

const init = () => {
  width = document.querySelector('.slider__container').offsetWidth;

  copyItemLeft.style.left = `${-width}px`;
  copyItemLeft.style.width = `${width}px`;

  copyItemRight.style.width = `${width}px`;
  copyItemRight.style.right = `${-width}px`;

  sliderItems.prepend(copyItemLeft);
  sliderItems.append(copyItemRight);

  sliderItems.style.width = `${width * slidersLength}px`;

  for (let i = 0; i < slidersLength; i += 1) {
    sliders[i].style.width = `${width}px`;
    sliders[i].style.height = 'auto';
  }
  sliderItems.style.left = `${-width * page}px`;
};

const moveDelta = (deltaLeft, page, difference) => {
  const widthCount = -width * page;
  let progress = width;
  let counter = 0;
  const slideInterval = setInterval(() => {
    let left = Number(sliderItems.style.left.slice(0, -2));
    left += deltaLeft;
    progress -= Math.abs(deltaLeft);
    sliderItems.style.left = `${left}px`;
    if (progress <= 0) {
      counter++;
      progress = width;
    }
    if (difference === counter) {
      window.clearInterval(slideInterval);
      sliderItems.style.left = `${widthCount}px`;
      isAnimated = false;
    }
  }, 10);
};

const moveRight = (currentPage) => {
  isAnimated = true;
  let difference = Math.abs(currentPage - page);
  if (page === slidersLength - 1) {
    difference = 1;
  }
  moveDelta(15, page, difference);
};

const moveLeft = (currentPage) => {
  isAnimated = true;
  let difference = Math.abs(currentPage - page);
  if (page === 0) {
    difference = 1;
  }
  moveDelta(-15, page, difference);
};

const setActivePage = (id) => {
  document.querySelector('.slide__label_active').classList.remove('slide__label_active');
  document.getElementById(id).classList.add('slide__label_active');
};

const slidePage = (event) => {
  const { id } = event.target;
  const clickedPage = id.replace(/\w*_/g, '');
  const currentPage = page;

  if (clickedPage > page) {
    page = clickedPage;
    moveLeft(currentPage);
  } else {
    page = clickedPage;
    moveRight(currentPage);
  }
  setActivePage(id);
};

const computePages = () => {
  slidePages.innerHTML = '';
  sliders.forEach((_, index) => {
    slidePages.innerHTML += `<label id='slide__${index}' class='slide__label${
      index === page ? ' slide__label_active' : ''
    }'></label>`;
  });
  document.querySelectorAll('.slide__label').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      if (!isAnimated) slidePage(event);
    });
    pages.push(elem);
  });
};

leftArrow.addEventListener('click', () => {
  if (isAnimated === false) {
    const currentPage = page;
    page--;
    if (page < 0) {
      page = slidersLength - 1;
    }
    setActivePage(`slide__${page}`);
    moveRight(currentPage);
  }
});

rightArrow.addEventListener('click', () => {
  if (isAnimated === false) {
    const currentPage = page;
    page++;
    if (page > slidersLength - 1) {
      page = 0;
    }
    setActivePage(`slide__${page}`);
    moveLeft(currentPage);
  }
});

window.addEventListener('resize', init);
init();
computePages();
