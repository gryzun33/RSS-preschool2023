const inputBankCardNumb = document.querySelector('#bank-card-numb');
const inputBankCardCvc = document.querySelector('#bank-card-cvc');

export function validateBankCard(buyCardForm) {
  const buyCardbtn = document.querySelector('.price-box__btn');
  const buyCardInputs = buyCardForm.querySelectorAll('input');
  const buyCardInputsArr = Array.from(buyCardInputs);
  let prevInvalidInput = null;
  
  buyCardInputs.forEach((inp) => {
    inp.addEventListener('input', () => {
      // console.log('input');
      validInput(inp);
    })
  })
  
  buyCardbtn.addEventListener('click',() => {
    if (prevInvalidInput) {
      prevInvalidInput.setCustomValidity("");
    } 
    let invalidInput = buyCardInputsArr.find((i) => !i.validity.valid || i.value.trim() === '');
    prevInvalidInput = invalidInput;
    if (invalidInput) {
      validInput(invalidInput);
    }
  });
};

function validInput(inp) {
  // console.log(inp);
  // console.log(inp.value);
  if (inp.value.trim() === ''){
    inp.setCustomValidity("Fill this field");
  } else if (inp === inputBankCardNumb && inp.validity.patternMismatch) {
    inp.setCustomValidity("card number must contain 16 digits");
  } else if (inp === inputBankCardCvc && inp.validity.patternMismatch) {
    inp.setCustomValidity("CVC must contain 3 digits");
  } else if (inp.closest('.exp-code') && inp.validity.patternMismatch) {
    inp.setCustomValidity("exp.code number must contain up to 2 digits");
  } else {
    inp.setCustomValidity("");
  }
}