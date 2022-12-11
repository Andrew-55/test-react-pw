const touchButton = document.getElementById('touch__button');
const warmingButton = document.getElementById('warming__button');
const warmingBlock = document.querySelector('.warming-block');

touchButton.addEventListener('click', () => {
  const list = document.getElementsByClassName('form-touch__item');
  Array.from(list).forEach((item) => {
    item.classList.add('form-touch__item_red');
  });
});

warmingButton.addEventListener('click', () => {
  warmingBlock.classList.add('disable');
});

const draw = (block, timePassed) => {
  block.style.top = 100 - timePassed / 250 + 'vh';
};

const emersion = (block) => {
  let start = Date.now();
  let timer = setInterval(function () {
    let timePassed = Date.now() - start;
    if (timePassed >= 4000) {
      clearInterval(timer);
      return;
    }
    draw(block, timePassed);
  }, 10);
};
emersion(warmingBlock);

const onEntry = (entry) => {
  const missionImage = document.querySelector('.mission__image');
  const missionContent = document.querySelector('.mission__content');

  entry.forEach((change) => {
    if (change.isIntersecting) {
      missionImage.classList.add('animation-show');
      missionContent.classList.add('animation-show');
    } else {
      missionImage.classList.remove('animation-show');
      missionContent.classList.remove('animation-show');
    }
  });
};

let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);
let element = document.querySelector('.start-animation');
observer.observe(element);
