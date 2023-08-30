import { generateCardNumber } from './generateCardNumber.js';

export function createNewUser(nameInputValue, lastNameInputValue, emailRegInputValue, passRegInputValue) {
  let key = generateCardNumber();
  let name = nameInputValue.trim();
  let lastName = lastNameInputValue.trim();
  let user = {
    key: key,
    name: name[0].toUpperCase() + name.slice(1),
    lastName: lastName[0].toUpperCase() + lastName.slice(1),
    email: emailRegInputValue.trim(),
    password: passRegInputValue,
    login: true,
    visits: 1,
    books: [],
    buyCard: false,
  }
  localStorage.setItem(key, JSON.stringify(user));
  return user;
}