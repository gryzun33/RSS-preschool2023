const emailRegInput = document.querySelector('#reg-email');
const passRegInput = document.querySelector('#reg-password');
const passLogInput = document.querySelector('#log-password');

export function showError(inp) {
  // console.log('showerr');
  inp.classList.add('wrong');
  const tooltip = inp.nextElementSibling;

  tooltip.classList.remove('hidden');
  if(inp.validity.valueMissing) {
    tooltip.firstElementChild.innerText = 'Please fill the field';
  } else if (inp === emailRegInput && inp.validity.patternMismatch) {
    tooltip.firstElementChild.innerText = 'You need to enter an e-mail address';
  } else if (inp === passRegInput || inp === passLogInput && inp.validity.tooShort) {
    tooltip.firstElementChild.innerText = 'The password should be at least 8 characters';
  }
}