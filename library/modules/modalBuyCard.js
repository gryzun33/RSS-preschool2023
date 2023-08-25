const inputBankCardNumb = document.querySelector('#bank-card-numb');
const inputBankCardCvc = document.querySelector('#bank-card-cvc');
const inputExpCodes = document.querySelectorAll('.exp-code input');

export function submitBankCard() {
  // console.log('проверка валидности');

  inputBankCardNumb.addEventListener('input', () => {
    if (inputBankCardNumb.validity.patternMismatch) {
    inputBankCardNumb.setCustomValidity("card number must contain 16 digits");
    } else {
      inputBankCardNumb.setCustomValidity('');
    }
  });  

  inputBankCardCvc.addEventListener('input', () => {
    if (inputBankCardCvc.validity.patternMismatch) {
      inputBankCardCvc.setCustomValidity("CVC must contain 3 digits");
    } else {
      inputBankCardCvc.setCustomValidity('');
    }
  }); 
  
  inputExpCodes.forEach((inp) => {
    inp.addEventListener('input', () => {
      if (inp.validity.patternMismatch) {
        inp.setCustomValidity("exp.code number must contain 2 digits");
        } else {
          inp.setCustomValidity('');
        }
    })
  })
}