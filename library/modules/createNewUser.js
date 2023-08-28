import { generateCardNumber } from './generateCardNumber.js';

export function createNewUser(nameInputValue, lastNameInputValue, emailRegInputValue, passRegInputValue) {
  let key = generateCardNumber();
  let user = {
    key: key,
    name: nameInputValue[0].toUpperCase() + nameInputValue.slice(1),
    lastName: lastNameInputValue[0].toUpperCase() + lastNameInputValue.slice(1),
    email: emailRegInputValue,
    password: passRegInputValue,
    login: true,
    visits: 1,
    books: [],
    buyCard: false,
  }
  localStorage.setItem(key, JSON.stringify(user));
  return user;
}