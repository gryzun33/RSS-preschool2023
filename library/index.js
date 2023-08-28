import { validateBankCard } from './modules/validateBankCard.js';
import { createNewUser } from './modules/createNewUser.js';
import { showError } from './modules/showError.js';
// import { generateCardNumber } from './modules/generateCardNumber.js';

// burger-menu
const burger = document.querySelector('.burger');
const burgerFirst = document.querySelector('.burger span:nth-child(1)');
const burgerSecond = document.querySelector('.burger span:nth-child(2)');
const burgerThird = document.querySelector('.burger span:nth-child(3)');
const burgerMenu = document.querySelector('.burger-menu');
const menuLinks = document.querySelectorAll('.burger-menu a');

// profile icon 
const profileIcon = document.querySelector('.profile');
const profileIconLog = document.querySelector('.profile-icon-log');

// dropmenu
const dropMenu = document.querySelector('.dropmenu__noauth');
const dropMenuAuth = document.querySelector('.dropmenu__auth');
const dropMenuTitle = document.querySelector('.dropmenu__title-auth');
const regBtn = document.querySelector('.reg-btn');
const loginBtn = document.querySelector('.log-btn'); 
const myProfileBtn = document.querySelector('.profile-btn');
const logoutBtn = document.querySelector('.logout-btn');

// modal 
const modalWrappers  = document.querySelectorAll('.modal-wrapper');
const modalRegister = document.querySelector('.modal-register');
const modalLogin = document.querySelector('.modal-login');
const modalProfile = document.querySelector('.modal-profile-wrapper');
const modalBuyCard = document.querySelector('.modal-buyacard-wrapper');
const closeRegBtn = document.querySelector('.close-reg-btn');
const closeLogBtn = document.querySelector('.close-log-btn');
const closeProfileBtn = document.querySelector('.modal-profile__btn');
const closeBuyCardBtn = document.querySelector('.modal-buyacard__btn');

// modal register and login

const formRegister = document.querySelector('#register-form');
const formLogin = document.querySelector('#login-form');
const addRegBtn = document.querySelector('.add-reg-btn');
const addLogBtn = document.querySelector('.add-log-btn');
const errorLogin = modalLogin.querySelector('.modal-auth__error');
const errorReg = modalRegister.querySelector('.modal-auth__error');

const modalRegInputsArr = Array.from(modalRegister.querySelectorAll('input'));
const modalLogInputsArr = Array.from(modalLogin.querySelectorAll('input'));
const modalAuthInputs = [...modalRegInputsArr, ...modalLogInputsArr];

const emailRegInput = document.querySelector('#reg-email');
const passRegInput = document.querySelector('#reg-password');
const nameInput = document.querySelector('#reg-name');
const lastNameInput = document.querySelector('#reg-lastname');
const emailLogInput = document.querySelector('#log-email');
const passLogInput = document.querySelector('#log-password');

// modal profile
const profilePhoto = document.querySelector('.modal-profile__photo');
const profileName = document.querySelector('.modal-profile__name');
const profileVisitsCount = document.querySelector('.stat__visits');
const profileBooksCount = document.querySelector('.stat__books');
const rentedBooks = document.querySelector('.modal-profile__booklist');
const profieCardNumber = document.querySelector('.modal-profile__card-number');


// modal buy card
const buyCardForm = document.querySelector('.modal-buyacard__form');

// library card
const cardFinderTitle = document.querySelector('.cardfinder__title');
const checkCardBtn  = document.querySelector('.card__btn');
const cardData  = document.querySelector('.card-data');
const fullNameInput = document.querySelector('.card__name');
const cardNumberInput = document.querySelector('.card__number');
const cardVisitsCount = document.querySelector('.card-visits-count');
const cardBooksCount = document.querySelector('.card-books-count');

const readerCardTitle = document.querySelector('.readercard__title');
const readerCardText = document.querySelector('.readercard__text');

const readerRegBtn = document.querySelector('.reader__reg__btn');
const readerLogBtn = document.querySelector('.reader__login__btn');
const readerProfileBtn = document.querySelector('.reader__profile__btn');

// favorites
const books = document.querySelectorAll('.book');
const buyBookButtons = document.querySelectorAll('.book__btn');
const menuFavorites = document.querySelector('.favorites__buttons-box');

// other
let currUser = null;
let rentedBook = null;
let currentBookBtn = null;

let lastWindowWidth = window.innerWidth;
let newWindowWidth;

findCurrentUser ();
validateBankCard ();

// resize window
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

// scroll window 
window.addEventListener('scroll', function() {
  const menuFavoritesY = menuFavorites.getBoundingClientRect().top + window.scrollY;
  if (window.scrollY >= menuFavoritesY && window.innerWidth <= 1250) {
    menuFavorites.classList.add('sticky');
    document.querySelector('.favorites__sticky-line').classList.remove('hidden');
  } else {
    menuFavorites.classList.remove('sticky');
    document.querySelector('.favorites__sticky-line').classList.add('hidden');  
  }
});

// burger-menu
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
  }
  if(!e.target.closest('.profile-icon-log') && !e.target.closest('.dropmenu__auth') && dropMenuAuth.classList.contains('dropmenu__show')) {
    dropMenuAuth.classList.remove('dropmenu__show');  
  }
});

function toggleBurger() {
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

function removeBurger() {
  burgerMenu.classList.remove('burger-menu__show');
  burgerFirst.classList.remove('burger-first');
  burgerSecond.classList.remove('burger-second');
  burgerThird.classList.remove('burger-third');
  document.body.style.overflowY = '';
}

// slider
const slideLength = document.querySelectorAll('.slider__image').length;
const sliderInner = document.querySelector('.slider__inner');
const sliderOuter = document.querySelector('.slider__outer');
const sliderImage = document.querySelector('.slider__image');
const arrowLeft = document.querySelector('.slider__arrow_left');
const arrowRight = document.querySelector('.slider__arrow_right');
const paginationButtons = document.querySelectorAll('.pagination__box');

let sliderShift = 0;
let numbOfSlide = 1;

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

    if(prevSeason === input.id) {
      return;
    }
    
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


// dropmenu

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

myProfileBtn.addEventListener('click', openModalProfile);
readerProfileBtn.addEventListener('click', openModalProfile);

logoutBtn.addEventListener('click', () => {
  logOut();
  changeLibraryCardContent();
});


// modal 
modalWrappers.forEach((wrapper) => {
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) {
      closeModal(wrapper);
    }
  })
});

closeRegBtn.addEventListener('click', () => {
  closeModal(modalRegister);
});

closeLogBtn.addEventListener('click', () => {
  closeModal(modalLogin);
});

closeProfileBtn.addEventListener('click', () => {
  closeModal(modalProfile);
});

closeBuyCardBtn.addEventListener('click', () => {
  closeModal(modalBuyCard);
});

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

function openModalProfile() {
  dropMenuAuth.classList.remove('dropmenu__show');
  modalProfile.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
}

function openModalBuyCard() {
  modalBuyCard.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
}

function closeModal(elem) {
  elem.classList.add('hidden');
  document.body.style.overflowY = '';
}

// modal register and login
addLogBtn.addEventListener('click', () => {
  modalRegister.classList.add('hidden');
  modalLogin.classList.remove('hidden');
  modalRegInputsArr.forEach((inp) => {
    inp.classList.remove('wrong');
    const tooltip = inp.nextElementSibling;
    tooltip.classList.add('hidden');
  })
  clearInputs(modalRegister);
});

addRegBtn.addEventListener('click', () => {
  modalLogin.classList.add('hidden');
  modalRegister.classList.remove('hidden');
  modalLogInputsArr.forEach((inp) => {
    inp.classList.remove('wrong');
    const tooltip = inp.nextElementSibling;
    tooltip.classList.add('hidden');
  })
  clearInputs(modalLogin);  
});

modalAuthInputs.forEach((inp) => {
  inp.addEventListener('input', () => {
    if (inp.validity.valid) {
      inp.classList.remove('wrong');
      const tooltip = inp.nextElementSibling;
      tooltip.classList.add('hidden');
    } else {
      showError(inp);
    }
  })
});

formRegister.addEventListener('submit', (e) => {
  e.preventDefault();
  const errElement = modalRegInputsArr.find((el) => !el.validity.valid);
  if(errElement) {
    showError(errElement);
    return;
  } else {
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      let user = JSON.parse(localStorage.getItem(key));
      if (emailRegInput.value === user.email) {
        errorReg.classList.remove('hidden');
      setTimeout(() => {errorReg.classList.add('hidden')}, 3000);
      return;
      } 
    }     
  } 
  currUser = createNewUser(nameInput.value, lastNameInput.value, emailRegInput.value, passRegInput.value);
  clearInputs(modalRegister);
  logIn(currUser);     
  changeLibraryCardContent();
  setUserDataLibCardAuth(currUser);
  setDataModalProfile(currUser);
  setTimeout(() => {
    closeModal(modalRegister);
  }, 100);   
});



formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const errElement = modalLogInputsArr.find((el) => !el.validity.valid);
  if(errElement) {
    showError(errElement);
    return;
  } else {
    currUser = submitLogin();
    if (currUser) {
      clearInputs(modalLogin);
      logIn(currUser);
      setTimeout(() => {
        closeModal(modalLogin);
      }, 100);
      changeLibraryCardContent();
      setUserDataLibCardAuth(currUser);
      setDataModalProfile(currUser);
      changeBooksButtons(currUser);
    } else {
      errorLogin.classList.remove('hidden');
      setTimeout(() => {
        errorLogin.classList.add('hidden');
      }, 3000)
      return;
    }    
  }
});

function submitLogin() {
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
    if ((user.key === emailLogInput.value || user.email === emailLogInput.value) &&
      user.password === String(passLogInput.value)) {
      user.login = true;
      user.visits = Number(user.visits) + 1;
      localStorage.setItem(key, JSON.stringify(user));  
      return user;
    } else if ((user.key === emailLogInput.value || user.email === emailLogInput.value) &&
      user.password !== String(passLogInput.value)) {
      errorLogin.innerText = 'Incorrect password';
      return null;
    } 
  }
  errorLogin.innerText = 'User not found';
  return null;
}

function clearInputs(elem) {
  const inputs = elem.querySelectorAll('input');
  inputs.forEach((inp) => {
    inp.value = '';
  })
}

function logIn(user) {
  profileIcon.classList.add('hidden');
  profileIconLog.classList.remove('hidden');
  const iconName  = user.name[0] + user.lastName[0];
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

  buyBookButtons.forEach((btn) => {
    btn.removeAttribute('disabled');
    btn.innerHTML = 'Buy';
  });
}

function findCurrentUser() {
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
    if (user.login === true) {
      currUser = user;
      logIn(user);
      changeLibraryCardContent();
      setUserDataLibCardAuth(currUser);
      setDataModalProfile(currUser);
      changeBooksButtons(currUser);
    } 
  }
  return;
}

// modalProfile
function setDataModalProfile(user) {
  profilePhoto.innerText = user.name[0] + user.lastName[0];
  profileName.innerText = user.name + ' ' + user.lastName;
  profileVisitsCount.innerText = user.visits;
  profileBooksCount.innerText = user.books.length;
  profieCardNumber.innerText = user.key;
  rentedBooks.innerHTML = '';
  user.books.forEach((book) => {
    const bookItem = document.createElement('li');
    bookItem.classList.add('modal-profile__booklist-item');
    bookItem.innerHTML = book;
    rentedBooks.append(bookItem);
  })  
}

const copyNumberBtn = document.body.querySelector('.modal-profile__copy-number-btn');
copyNumberBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(profieCardNumber.innerText);
});

// librarycard
checkCardBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let isUser = setUserDataLibraryCardNoAuth();
  if (isUser) {
    cardFinderTitle.innerText = 'Your Library card';
    checkCardBtn.classList.add('hidden');
    cardData.classList.remove('hidden');
    cardNumberInput.setAttribute('disabled', 'disabled');
    fullNameInput.setAttribute('disabled', 'disabled');
    setTimeout(() => {
      cardFinderTitle.innerText = 'Find your Library card';
      checkCardBtn.classList.remove('hidden');
      cardData.classList.add('hidden');
      cardNumberInput.removeAttribute('disabled');
      fullNameInput.removeAttribute('disabled');
      cardNumberInput.value = '';
      fullNameInput.value = '';
    }, 10000)
  } else {
    return;
  }
});

function setUserDataLibraryCardNoAuth() {
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
    if (user.key === cardNumberInput.value &&
      ((user.name + ' ' + user.lastName).toLowerCase()) === fullNameInput.value.toLowerCase()) {
      fullNameInput.value = user.name + ' ' + user.lastName;
      cardVisitsCount.innerText = user.visits;
      cardBooksCount.innerText = user.books.length;
      return true;
    }
  }
  return false;    
}

function setUserDataLibCardAuth(user) {
  cardVisitsCount.innerText = user.visits;
  cardBooksCount.innerText = user.books.length;
  fullNameInput.value = user.name + ' ' + user.lastName;
  cardNumberInput.value = user.key; 
}

function changeLibraryCardContent() {
  if(currUser) {
    cardFinderTitle.innerText = 'Your Library card';
    readerCardTitle.innerText = 'Visit your profile';
    readerCardText.innerText = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
    readerRegBtn.classList.add('hidden');
    readerLogBtn.classList.add('hidden');
    readerProfileBtn.classList.remove('hidden');

    checkCardBtn.classList.add('hidden');
    cardData.classList.remove('hidden');
    cardNumberInput.setAttribute('disabled', 'disabled');
    fullNameInput.setAttribute('disabled', 'disabled');
  } else {
    cardFinderTitle.innerText = 'Find your Library card';
    readerCardTitle.innerText = 'Get a reader card';
    readerCardText.innerText = 'You will be able to see a reader card after logging into account or you can register a new account';
    readerRegBtn.classList.remove('hidden');
    readerLogBtn.classList.remove('hidden');
    readerProfileBtn.classList.add('hidden');

    checkCardBtn.classList.remove('hidden');
    cardData.classList.add('hidden');
    cardNumberInput.removeAttribute('disabled');
    fullNameInput.removeAttribute('disabled');
    cardNumberInput.value = '';
    fullNameInput.value = '';
  }
}


// buyBook
buyBookButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentBookBtn = btn;
    if (!currUser) {
      openModalLogin();
    } else if (currUser.buyCard === false){
      openModalBuyCard();
      const bookText = btn.closest('.book__text');
      const bookNameCap = bookText.querySelector('.book__title > span').innerText;
      const bookName = bookNameCap.split(' ').map((el) => el[0] + el.slice(1).toLowerCase()).join(' ');
      const bookAuthor = bookText.querySelector('.book__title span:last-child').innerText;
      rentedBook = `${bookName}, ${bookAuthor}`;
    } else if (currUser.buyCard === true){
      const bookText = btn.closest('.book__text');
      const bookNameCap = bookText.querySelector('.book__title > span').innerText;
      const bookName = bookNameCap.split(' ').map((el) => el[0] + el.slice(1).toLowerCase()).join(' ');
      const bookAuthor = bookText.querySelector('.book__title span:last-child').innerText;
      rentedBook = `${bookName}, ${bookAuthor}`;
      addRentedBookToUser(rentedBook);
    }
  })
})

buyCardForm.addEventListener('submit' , (e) => {
  // e.preventDefault();
  if (!currUser.buyCard) {
    currUser.buyCard = true;
    addRentedBookToUser(rentedBook);
  }
});

function addRentedBookToUser(book) {
  const bookItem = document.createElement('li');
  bookItem.classList.add('modal-profile__booklist-item');
  bookItem.innerHTML = book;
  rentedBooks.append(bookItem);
  profileBooksCount.innerText = +profileBooksCount.innerText + 1;
  cardBooksCount.innerText = +cardBooksCount.innerText + 1;
  currUser.books.push(book);
  localStorage.setItem(currUser.key, JSON.stringify(currUser));
  currentBookBtn.setAttribute('disabled', 'disabled');
  currentBookBtn.innerHTML = 'Own';
}

function changeBooksButtons(currUser) {
  let ownBooks = currUser.books;
  books.forEach((book) => {
    const bookNameCap = book.querySelector('.book__title > span').innerText;
    const bookName = bookNameCap.split(' ').map((el) => el[0] + el.slice(1).toLowerCase()).join(' ');
    const bookAuthor = book.querySelector('.book__title span:last-child').innerText;
    const bookTitle = `${bookName}, ${bookAuthor}`;
    if (ownBooks.find((el) => el === bookTitle)) {
      const btn = book.querySelector('.book__btn');
      btn.setAttribute('disabled', 'disabled');
      btn.innerHTML = 'Own';
    }
  });
}
