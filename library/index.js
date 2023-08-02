console.log(`
1. Вёрстка валидная +10
2. Вёрстка семантическая +16
В коде страницы присутствуют следующие элементы:
- <header>, <main>, <footer> +2
- шесть элементов <section> +2
- только один заголовок <h1> +2
- шесть заголовков <h2> +2
- один элемент <nav> +2
- минимум два списка ul > li > a +2
- минимум семь кнопок <button> +2
- минимум два инпута <input> +2
3. Верстка соответствует макету +54
- блок <header> +8
- секция About +6
- секция Welcome +4
- секция Favorites +8
- секция CoffeShop +6
- секция Contacts +6
- секция LibraryCard +8
- блок <footer> +8
4. Общие требования к верстке +20 
- для построения сетки используются флексы +2
- при уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону +2
- иконки добавлены в формате .svg +2
- изображения добавлены в формате .jpg или .png +2
- есть favicon +2
- плавная прокрутка по якорям +2
- в футере название ссылки Username заменено и ведет на GitHub студента +2
- в футере ссылка The Rolling Scopes School ведет на страницу курса https://rs.school/js-stage0/ +2
- интерактивность элементов согласно макету +2
- плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы +2
Итого: 100!
`);

let burger = document.querySelector('.burger');
let burgerFirst = document.querySelector('.burger span:nth-child(1)');
let burgerSecond = document.querySelector('.burger span:nth-child(2)');
let burgerThird = document.querySelector('.burger span:nth-child(3)');
let burgerMenu = document.querySelector('.burger-menu');
const menuLinks = document.querySelectorAll('.burger-menu a')

const transBackground = document.createElement('div');
document.body.prepend(transBackground);

const toggleBurger = () => {
  burgerFirst.classList.toggle('burger-first');
  burgerSecond.classList.toggle('burger-second');
  burgerThird.classList.toggle('burger-third');
  transBackground.classList.toggle('background-visible');
  if (burgerMenu.classList.contains('burger-menu__show')) {
    burgerMenu.classList.remove('burger-menu__show');
    burgerMenu.classList.add('burger-menu__hide');
  } else {
    burgerMenu.classList.remove('burger-menu__hide');
    burgerMenu.classList.add('burger-menu__show');
  };
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
    burgerMenu.classList.remove('burger-menu__hide');
    burgerMenu.classList.remove('burger-menu__show');
  }
  lastWindowWidth = newWindowWidth;
});


