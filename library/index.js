let burger = document.querySelector('.burger');
let burgerFirst = document.querySelector('.burger span:nth-child(1)');
let burgerSecond = document.querySelector('.burger span:nth-child(2)');
let burgerThird = document.querySelector('.burger span:nth-child(3)');
let burgerMenu = document.querySelector('.burger-menu');
const menuLinks = document.querySelectorAll('.burger-menu a');
const profileIcon = document.querySelector('.profile');
const transBackground = document.createElement('div');
document.body.prepend(transBackground);

const toggleBurger = () => {
  burgerFirst.classList.toggle('burger-first');
  burgerSecond.classList.toggle('burger-second');
  burgerThird.classList.toggle('burger-third');
  transBackground.classList.toggle('background-visible');
  burgerMenu.classList.toggle('burger-menu__show');
  if(burgerMenu.classList.contains('burger-menu__show')) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = '';
  }
}

const removeBurger = () => {
  burgerMenu.classList.remove('burger-menu__show');
  burgerFirst.classList.remove('burger-first');
  burgerSecond.classList.remove('burger-second');
  burgerThird.classList.remove('burger-third');
  transBackground.classList.remove('background-visible');
  document.body.style.overflowY = '';
}

burger.addEventListener('click', toggleBurger);
transBackground.addEventListener('click', removeBurger);
profileIcon.addEventListener('click', removeBurger);
menuLinks.forEach((link) => {
  link.addEventListener('click', removeBurger);
});


let lastWindowWidth = window.innerWidth;
let newWindowWidth;

window.addEventListener('resize', function() {
  calculateSliderDim ();
  newWindowWidth = window.innerWidth;

  if (newWindowWidth <= 1024 && lastWindowWidth > 1024) {
    initSlider();
    checkEnableArrows();
  }  
  if (lastWindowWidth <= 1024 && newWindowWidth > 1024) {
    removeBurger();
    initSlider();    
  }
  lastWindowWidth = newWindowWidth;
});

// слайдер

let sliderShift = 0;
let numbOfSlide = 1;
const slideLength = document.querySelectorAll('.slider__image').length;
const sliderInner = document.querySelector('.slider__inner');
const sliderOuter = document.querySelector('.slider__outer');
const sliderImage = document.querySelector('.slider__image');
const arrowLeft = document.querySelector('.slider__arrow_left');
const arrowRight = document.querySelector('.slider__arrow_right');
const paginationButtons = document.querySelectorAll('.pagination__box');

initSlider();
calculateSliderDim();

paginationButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    changePrevButton(numbOfSlide);
    numbOfSlide = +btn.dataset.btn;
    sliderInner.style.transform = `translateX(${-((numbOfSlide - 1) * sliderShift)}%)`;
    btn.classList.add('pagination__box__active');
    btn.setAttribute('disabled', 'disabled');
    const currentBtnInner = btn.querySelector('.pagination__inner');
    currentBtnInner.classList.add('pagination__inner__active');
    if (window.innerWidth <= 1024) {
      checkEnableArrows();
    }
  })
})

arrowRight.addEventListener('click', () => {
  changePrevButton (numbOfSlide);
  sliderInner.style.transform = `translateX(${-(numbOfSlide * sliderShift)}%)`;
  numbOfSlide += 1;
  changeCurrentButton (numbOfSlide);
  checkEnableArrows();
});

arrowLeft.addEventListener('click', () => {
  changePrevButton (numbOfSlide);
  numbOfSlide = numbOfSlide - 1;
  sliderInner.style.transform = `translateX(${-(numbOfSlide-1) * sliderShift}%)`;
  changeCurrentButton (numbOfSlide);
  checkEnableArrows();
})

function calculateSliderDim () {  
const sliderOuterWidth = parseFloat(getComputedStyle(sliderOuter).width);
const sliderInnerWidth = parseFloat(getComputedStyle(sliderInner).width);
const sliderImageWidth = parseFloat(getComputedStyle(sliderImage).width);
const gapWidth = window.innerWidth > 1024 ? parseFloat(getComputedStyle(sliderInner).columnGap) 
                / 100 * sliderInnerWidth  : parseFloat(getComputedStyle(sliderInner).columnGap);
sliderShift = (sliderImageWidth + gapWidth) * 100 / sliderOuterWidth ;
}

function initSlider() {
  // console.log('initslider');
  numbOfSlide = 1;
  arrowLeft.setAttribute('disabled', 'disabled');
  arrowLeft.classList.add('slider__arrow__non-active');
  arrowRight.removeAttribute('disabled');
  arrowRight.classList.remove('slider__arrow__non-active');
  paginationButtons.forEach((btn) => {
    btn.querySelector('.pagination__inner').classList.remove('pagination__inner__active');
    btn.classList.remove('pagination__box__active');  
    btn.removeAttribute('disabled');
  })
  changeCurrentButton(numbOfSlide);
  sliderInner.style.transform = `translateX(0)`;
}

function checkEnableArrows() {
  if (numbOfSlide === slideLength) {
    arrowRight.classList.add('slider__arrow__non-active');
    arrowRight.setAttribute('disabled', 'disabled');
    arrowLeft.classList.remove('slider__arrow__non-active');
    arrowLeft.removeAttribute('disabled');
  } else if (numbOfSlide === 1) {
    arrowLeft.classList.add('slider__arrow__non-active');
    arrowLeft.setAttribute('disabled', 'disabled');
    arrowRight.classList.remove('slider__arrow__non-active');
    arrowRight.removeAttribute('disabled');
  } else {
    arrowRight.classList.remove('slider__arrow__non-active');
    arrowRight.removeAttribute('disabled');
    arrowLeft.classList.remove('slider__arrow__non-active');
    arrowLeft.removeAttribute('disabled');
  } 
} 

function changePrevButton (numb) {
  const prevBtn = document.querySelector(`[data-btn='${numb}']`);
  const prevBtnInner = prevBtn.querySelector('.pagination__inner__active');
  prevBtn.classList.remove('pagination__box__active');
  prevBtn.removeAttribute('disabled');
  prevBtnInner.classList.remove('pagination__inner__active'); 
}

function changeCurrentButton (numb) {
  const currentBtn = document.querySelector(`[data-btn='${numb}']`);
  const currentBtnInner = currentBtn.querySelector('.pagination__inner');
  currentBtn.classList.add('pagination__box__active');
  currentBtn.setAttribute('disabled', 'disabled');
  currentBtnInner.classList.add('pagination__inner__active');
}


// favorites

const seasonInputs = document.querySelectorAll('[name="fav_button"]');
seasonInputs[0].checked = true;
let prevSeason = Array.from(seasonInputs).find((inp) => inp.checked === true).id;
let currBookBox;
let prevBookBox;

seasonInputs.forEach((input) => {
  input.addEventListener('click', () => {
    
    if (currBookBox) {
      currBookBox.classList.remove('books__box__show');
    }

    if (prevBookBox) {
      prevBookBox.classList.add('books__box__none');
      prevBookBox.classList.remove('books__box__hide');
    }

    console.log('click on input');

    const currSeason = input.id;

    console.log(prevSeason);
    console.log(currSeason);

    prevBookBox = document.querySelector(`.${prevSeason}`);
    currBookBox = document.querySelector(`.${currSeason}`);

    console.log('prevbooks=', prevBookBox);
    console.log('currbooks=', currBookBox);

    prevBookBox.classList.add('books__box__hide');
    currBookBox.classList.remove('books__box__none');
    currBookBox.classList.add('books__box__show');

    prevSeason = currSeason;
    
    // prevBookBox.addEventListener('animationend', () => {
    //   console.log('PREVanimationend');
    //   prevBookBox.classList.add('books__box__none');
    //   prevBookBox.classList.remove('books__box__hide');
    // });
    

    prevBookBox.addEventListener('animationend', removeStyles);

    function removeStyles() {
      console.log('PREVanimationend');
      prevBookBox.classList.add('books__box__none');
      prevBookBox.classList.remove('books__box__hide');
      prevBookBox.removeEventListener('animationend', removeStyles);
    }
    
   
  })
})


