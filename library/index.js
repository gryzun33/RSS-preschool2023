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
}

const removeBurger = () => {
  burgerMenu.classList.remove('burger-menu__show');
  burgerFirst.classList.remove('burger-first');
  burgerSecond.classList.remove('burger-second');
  burgerThird.classList.remove('burger-third');
  transBackground.classList.remove('background-visible');
}


// toggle burger
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

calculateSliderDim();


function calculateSliderDim () {
  
const sliderOuterWidth = parseFloat(getComputedStyle(sliderOuter).width);

const sliderInnerWidth = parseFloat(getComputedStyle(sliderInner).width);

const sliderImageWidth = parseFloat(getComputedStyle(sliderImage).width);
const gapWidth = window.innerWidth > 1024 ? parseFloat(getComputedStyle(sliderInner).columnGap) 
                / 100 * sliderInnerWidth  : parseFloat(getComputedStyle(sliderInner).columnGap);

sliderShift = (sliderImageWidth + gapWidth) * 100 / sliderOuterWidth ;


}

function initSlider() {
  numbOfSlide = 1;
  arrowLeft.setAttribute('disabled', 'disabled');
  arrowLeft.classList.add('slider__arrow__non-active');
  arrowRight.removeAttribute('disabled');
  arrowLeft.classList.remove('slider__arrow__non-active');
  paginationButtons.forEach((btn) => {
    btn.querySelector('.pagination__inner').classList.remove('pagination__inner__active');
    btn.classList.remove('pagination__box__active');  
    btn.removeAttribute('disabled');
  })
  const startBtn = document.querySelector('.pagination__box:first-child');
  startBtn.classList.add('pagination__box__active');
  startBtn.querySelector('.pagination__inner').classList.add('pagination__inner__active');
  startBtn.setAttribute('disabled', 'disabled');
  sliderInner.style.transform = `translateX(0)`;
}


const paginationButtons = document.querySelectorAll('.pagination__box');


paginationButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const prevBtn = document.querySelector('.pagination__box__active');
    const prevBtnInner = prevBtn.querySelector('.pagination__inner__active');
    // const currentBtnNumb = btn.dataset.btn;
    const currentBtnInner = btn.querySelector('.pagination__inner');

    numbOfSlide = +btn.dataset.btn;
    // const diff = currentBtnNumb - 1;
    // console.log('diff=', diff);
    sliderInner.style.transform = `translateX(${-((numbOfSlide - 1) * sliderShift)}%)`;
    prevBtn.classList.remove('pagination__box__active');
    prevBtnInner.classList.remove('pagination__inner__active');
    prevBtn.removeAttribute('disabled');
    btn.classList.add('pagination__box__active');
    btn.setAttribute('disabled', 'disabled');
    currentBtnInner.classList.add('pagination__inner__active');

    if (window.innerWidth <= 1024) {
      checkEnableArrows();
    }
    

  })
})

arrowRight.addEventListener('click', () => {
  sliderInner.style.transform = `translateX(${-(numbOfSlide * sliderShift)}%)`;
  const prevBtn = document.querySelector(`[data-btn='${numbOfSlide}']`);
  console.log('prevBTN=', prevBtn);
  const prevBtnInner = prevBtn.querySelector('.pagination__inner__active');
  prevBtn.classList.remove('pagination__box__active');
  prevBtn.removeAttribute('disabled');
  prevBtnInner.classList.remove('pagination__inner__active');
  numbOfSlide += 1;
  const currentBtn = document.querySelector(`[data-btn='${numbOfSlide}']`);
  const currentBtnInner = currentBtn.querySelector('.pagination__inner');
  currentBtn.classList.add('pagination__box__active');
  currentBtn.setAttribute('disabled', 'disabled');
  currentBtnInner.classList.add('pagination__inner__active');

  checkEnableArrows();

});

arrowLeft.addEventListener('click', () => {
  const prevBtn = document.querySelector(`[data-btn='${numbOfSlide}']`);
  const prevBtnInner = prevBtn.querySelector('.pagination__inner__active');
  numbOfSlide = numbOfSlide - 1;
  console.log('numbofslide=', numbOfSlide);
  sliderInner.style.transform = `translateX(${-(numbOfSlide-1) * sliderShift}%)`;


  prevBtn.classList.remove('pagination__box__active');
  prevBtn.removeAttribute('disabled');
  prevBtnInner.classList.remove('pagination__inner__active');

  const currentBtn = document.querySelector(`[data-btn='${numbOfSlide}']`);
  const currentBtnInner = currentBtn.querySelector('.pagination__inner');
  currentBtn.classList.add('pagination__box__active');
  currentBtn.setAttribute('disabled', 'disabled');
  currentBtnInner.classList.add('pagination__inner__active');


  checkEnableArrows();
})

function checkEnableArrows() {
  console.log ('numbofslide = ', numbOfSlide);
  console.log ('length=', slideLength);
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




