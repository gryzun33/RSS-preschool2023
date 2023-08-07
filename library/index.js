console.log(`
1.Вёрстка соответствует макету. Ширина экрана 768px +26

 - блок <header> +2
 - секция Welcome +2
 - секция About +2
 - в секции About под картинкой на разрешении 768px - 5 точек +2
 - секция Favorites +4
 - секция CoffeShop +4
 - секция Contacts +4
 - секция LibraryCard +4
 - блок <footer> + 2

2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12

3. На ширине экрана 768рх реализовано адаптивное меню +12 

 - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
 - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +4
 - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +2
 - размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +2

Итого: 50!
`);

let burger = document.querySelector('.burger');
let burgerFirst = document.querySelector('.burger span:nth-child(1)');
let burgerSecond = document.querySelector('.burger span:nth-child(2)');
let burgerThird = document.querySelector('.burger span:nth-child(3)');
let burgerMenu = document.querySelector('.burger-menu');
const menuLinks = document.querySelectorAll('.burger-menu a');

const transBackground = document.createElement('div');
document.body.prepend(transBackground);

const toggleBurger = () => {
  burgerFirst.classList.toggle('burger-first');
  burgerSecond.classList.toggle('burger-second');
  burgerThird.classList.toggle('burger-third');
  transBackground.classList.toggle('background-visible');
  burgerMenu.classList.toggle('burger-menu__show');
}


// toggle burger
burger.addEventListener('click', toggleBurger);
transBackground.addEventListener('click', toggleBurger);
menuLinks.forEach((link) => {
  link.addEventListener('click', toggleBurger);
});


let lastWindowWidth = window.innerWidth;
let newWindowWidth;

window.addEventListener('resize', function() {
  newWindowWidth = window.innerWidth;
  if (lastWindowWidth <= 1024 && newWindowWidth > 1024) {
    burgerMenu.classList.remove('burger-menu__show');
    burgerFirst.classList.remove('burger-first');
    burgerSecond.classList.remove('burger-second');
    burgerThird.classList.remove('burger-third');
    transBackground.classList.remove('background-visible');
  }
  lastWindowWidth = newWindowWidth;
});


