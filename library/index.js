let burger = document.querySelector('.burger');
let burgerFirst = document.querySelector('.burger span:nth-child(1)');
let burgerSecond = document.querySelector('.burger span:nth-child(2)');
let burgerThird = document.querySelector('.burger span:nth-child(3)');
let burgerMenu = document.querySelector('.burger-menu');
const menuLinks = document.querySelectorAll('.burger-menu a');
const profileIcon = document.querySelector('.profile');
const profileIconLog = document.querySelector('.profile-icon-log');

const dropMenu = document.querySelector('.dropmenu__noauth');
const dropMenuAuth = document.querySelector('.dropmenu__auth');
const dropMenuTitle = document.querySelector('.dropmenu__title-auth');

let currUser = null;

findCurrentUser();

const toggleBurger = () => {
  // console.log('toggleburger');
  burgerFirst.classList.toggle('burger-first');
  burgerSecond.classList.toggle('burger-second');
  burgerThird.classList.toggle('burger-third');
  burgerMenu.classList.toggle('burger-menu__show');
  if(burgerMenu.classList.contains('burger-menu__show')) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = '';
  }
}

const removeBurger = () => {
  // console.log('removeburger');
  burgerMenu.classList.remove('burger-menu__show');
  burgerFirst.classList.remove('burger-first');
  burgerSecond.classList.remove('burger-second');
  burgerThird.classList.remove('burger-third');
  document.body.style.overflowY = '';
}

burger.addEventListener('click', () => {
  toggleBurger();
  if (dropMenu.classList.contains('dropmenu__show')) {
    dropMenu.classList.remove('dropmenu__show');  
  }
  if (dropMenuAuth.classList.contains('dropmenu__show')) {
    dropMenuAuth.classList.remove('dropmenu__show');  
  } 
});

menuLinks.forEach((link) => {
  link.addEventListener('click', removeBurger);
});





document.body.addEventListener('click', (e) => {
  if (!e.target.closest('.burger') && !e.target.closest('.burger-menu') && burgerMenu.classList.contains('burger-menu__show')) {
    removeBurger();  
  }
  if(!e.target.closest('.profile') && !e.target.closest('.dropmenu') && dropMenu.classList.contains('dropmenu__show')) {
    dropMenu.classList.remove('dropmenu__show');
    dropMenuAuth.classList.remove('dropmenu__show');
  }  
});

// resize window

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
    // console.log('click');
    
    if (currBookBox) {
      currBookBox.classList.remove('books__box__show');
      currBookBox.classList.remove('books__box__none');
    }

    if (prevBookBox) {
      prevBookBox.classList.add('books__box__none');
      prevBookBox.classList.remove('books__box__hide');
    }

    const currSeason = input.id;

    prevBookBox = document.querySelector(`.${prevSeason}`);
    currBookBox = document.querySelector(`.${currSeason}`);

    prevBookBox.classList.add('books__box__hide');
    prevSeason = currSeason;
    
    prevBookBox.addEventListener('animationend', removeFavStyles);

    function removeFavStyles() {
      prevBookBox.classList.add('books__box__none');
      prevBookBox.classList.remove('books__box__hide');
      currBookBox.classList.remove('books__box__none');
      currBookBox.classList.add('books__box__show');
      prevBookBox.removeEventListener('animationend', removeFavStyles);
    }
  })
})

const menuFavorites = document.querySelector('.favorites__buttons-box');

window.addEventListener('scroll', function() {
  const menuFavoritesY = menuFavorites.getBoundingClientRect().top + window.scrollY;
  if (window.scrollY >= menuFavoritesY && window.innerWidth <= 1250) {
    menuFavorites.classList.add('sticky');    
  } else {
    menuFavorites.classList.remove('sticky');
  }
});


const checkCardBtn  = document.querySelector('.card__btn');

checkCardBtn.addEventListener('click', (event) => {
  event.preventDefault();
})


// dropmenu
const modalWrappers  = document.querySelectorAll('.modal-wrapper');

const modalRegister = document.querySelector('.modal-register');
const modalLogin = document.querySelector('.modal-login');

const formRegister = document.querySelector('#register-form');
const formLogin = document.querySelector('#login-form');

const regBtn = document.querySelector('.reg-btn');
const loginBtn = document.querySelector('.log-btn');
 
const myProfileBtn = document.querySelector('.profile-btn');
const logoutBtn = document.querySelector('.logout-btn');

const readerRegBtn = document.querySelector('.reader__reg__btn');
const readerLogBtn = document.querySelector('.reader__login__btn');

const addRegBtn = document.querySelector('.add-reg-btn');
const addLogBtn = document.querySelector('.add-log-btn');

const closeRegBtn = document.querySelector('.close-reg-btn');
const closeLogBtn = document.querySelector('.close-log-btn');

profileIcon.addEventListener('click', () => {
  if (burgerMenu.classList.contains('burger-menu__show')) {
    removeBurger();
  }
  dropMenu.classList.toggle('dropmenu__show');
});

profileIconLog.addEventListener('click', () => {
  if (burgerMenu.classList.contains('burger-menu__show')) {
    removeBurger();
  }
  dropMenuAuth.classList.toggle('dropmenu__show');
});

regBtn.addEventListener('click', openModalRegister);
readerRegBtn.addEventListener('click', openModalRegister);

loginBtn.addEventListener('click', openModalLogin);
readerLogBtn.addEventListener('click', openModalLogin);

closeRegBtn.addEventListener('click', () => {
  closeModal(modalRegister);
});

closeLogBtn.addEventListener('click', () => {
  closeModal(modalLogin);
});

addLogBtn.addEventListener('click', () => {
  modalRegister.classList.add('hidden');
  modalLogin.classList.remove('hidden');
  passRegInput.classList.remove('wrong');
  emailRegInput.classList.remove('wrong');
  clearInputs(modalRegister);
});

addRegBtn.addEventListener('click', () => {
  modalLogin.classList.add('hidden');
  modalRegister.classList.remove('hidden');
  passLogInput.classList.remove('wrong');
  clearInputs(modalLogin);  
});

myProfileBtn.addEventListener('click', () => {
  console.log('click on myprofile');
  dropMenuAuth.classList.remove('dropmenu__show');

});

logoutBtn.addEventListener('click', () => {
  logOut();
});




modalWrappers.forEach((wrapper) => {
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) {
      wrapper.classList.add('hidden');
      document.body.style.overflowY = '';
    }
  })
})

function closeModal(elem) {
  elem.classList.add('hidden');
  document.body.style.overflowY = '';
}

function openModalRegister() {
  if (dropMenu.classList.contains('dropmenu__show')) {
    dropMenu.classList.remove('dropmenu__show');
  }
  modalRegister.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
}

function openModalLogin() {
  if (dropMenu.classList.contains('dropmenu__show')) {
    dropMenu.classList.remove('dropmenu__show');
  }
  modalLogin.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
}

// validation email

const email_regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const pass_regex = /^[a-zA-Z0-9]{8,}/;
const emailRegInput = document.querySelector('#reg-email');
const passRegInput = document.querySelector('#reg-password');
const nameInput = document.querySelector('#reg-name');
const lastNameInput = document.querySelector('#reg-lastname');

const emailLogInput = document.querySelector('#log-email');
const passLogInput = document.querySelector('#log-password');


const modalRegBtn = document.querySelector('.modal-reg-btn');
const modalLogBtn = document.querySelector('.modal-log-btn');

function isEmailValid(value) {
  return email_regex.test(value);
}

function isPassValid(value) {
  return pass_regex.test(value);
}

function onEmailInput() {
  if (isEmailValid(emailRegInput.value)) {
    emailRegInput.classList.remove('wrong');
  } else {
    emailRegInput.classList.add('wrong');
  }
}

function onPassInput(input) {
  if (isPassValid(input.value)) {
    input.classList.remove('wrong');
  } else {
    input.classList.add('wrong');
  }
}
 
emailRegInput.addEventListener('input', onEmailInput);
passRegInput.addEventListener('input', () => {
  onPassInput(passRegInput);
});
passLogInput.addEventListener('input', () => {
  onPassInput(passLogInput);
});

const modalRegInputsArr = Array.from(modalRegister.querySelectorAll('input'));
const modalLogInputsArr = Array.from(modalLogin.querySelectorAll('input'));



formRegister.addEventListener('submit', (e) => {
  console.log('submitreg');
  e.preventDefault();
  
  if (modalRegInputsArr.some((el) => el.value === '') ||
      emailRegInput.classList.contains('wrong') ||
      passRegInput.classList.contains('wrong')) {
    return;
  } else {
    currUser = submitRegister();
    clearInputs(modalRegister);
    logIn(currUser);
    setTimeout(() => {
      closeModal(modalRegister);
    }, 100);
  }
});

formLogin.addEventListener('submit', (e) => {
  console.log('submitLogin');
  e.preventDefault();
  
  if (modalLogInputsArr.some((el) => el.value === '') ||
      passLogInput.classList.contains('wrong')) {
    return;
  } else {
    currUser = submitLogin();
    console.log ('currUser=', currUser);
    if (currUser) {
      clearInputs(modalLogin);
      logIn(currUser);
      setTimeout(() => {
        closeModal(modalLogin);
      }, 100);
    } else {
      return
    }    
  }
});




// generateCardNumber
function generateCardNumber() {
  const numb = Math.floor(Math.random() * (10 ** 11));
  const numbToHex = numb.toString(16).slice(0,9).toLowerCase();
  return numbToHex;
}

function submitRegister() {
  let key = generateCardNumber();
  let user = {
    key: key,
    name: nameInput.value,
    lastName: lastNameInput.value,
    email: emailRegInput.value,
    password: passRegInput.value,
    login: true,
  }
  localStorage.setItem(key, JSON.stringify(user));
  return user;
}

function submitLogin() {
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
    console.log ('user=', user);
    if ((user.key === emailLogInput.value || user.email === emailLogInput.value) &&
      user.password === String(passLogInput.value)) {
      user.login = true;
      localStorage.setItem(key, JSON.stringify(user));  
      return user;
    }
  }
  return null;
}

function clearInputs(elem) {
  // console.log('clear inputs');
  const inputs = elem.querySelectorAll('input');
  inputs.forEach((inp) => {
    inp.value = '';
  })
}

function logIn(user) {
  profileIcon.classList.add('hidden');
  profileIconLog.classList.remove('hidden');
  const iconName  = user.name[0].toUpperCase() + user.lastName[0].toUpperCase();
  profileIconLog.innerText = iconName;
  profileIconLog.setAttribute('title', `${user.name} ${user.lastName}`);
  dropMenuTitle.innerText = user.key;
  dropMenu.classList.add('hidden')
  dropMenuAuth.classList.remove('hidden');
}

function logOut() {
  profileIcon.classList.remove('hidden');
  profileIconLog.classList.add('hidden');
  dropMenuAuth.classList.remove('dropmenu__show');
  dropMenuAuth.addEventListener('transitionend',changeDisplayDropMenu);
  let user = JSON.parse(localStorage.getItem(currUser.key));
  user.login = false;
  localStorage.setItem(currUser.key, JSON.stringify(user)); 
  currUser = null;

  function changeDisplayDropMenu() {
    dropMenuAuth.classList.add('hidden');
    dropMenu.classList.remove('hidden');
    dropMenuAuth.removeEventListener('transitionend',changeDisplayDropMenu);
  }
}

function findCurrentUser() {
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
    if (user.login === true) {
      currUser = user;
      logIn(user);
    } 
  }
  return;
}





