
const inputSearch = document.querySelector('.input-search');
const iconSearch = document.querySelector('.icon-search');
const iconClearInput = document.querySelector('.icon-clear');
const container = document.querySelector('.container');
const inputRandom = document.querySelector('#random');
let defOrientation = 'landscape';

inputRandom.checked = true;
// let defValue = 'summer';

inputSearch.focus();
getRandomData(defOrientation);
// getData(defValue, defOrientation);

async function getData(value, orient) {
  const url = `https://api.unsplash.com/search/photos?query=${value}&per_page=30&orientation=${orient}&client_id=6ISY71tnuAX-TcjYFSg7uddHNK8J0WoPkia3PKjz2T8`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('data=', data);
  showData(data.results, orient);
}

async function getRandomData(orient) {
  const url = `https://api.unsplash.com/photos/random?count=30&orientation=${orient}&client_id=6ISY71tnuAX-TcjYFSg7uddHNK8J0WoPkia3PKjz2T8`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log(typeof data);
  showData(Array.from(data), orient);
}


function showData(data, or) {
  container.innerHTML = '';
  data.forEach((image) => {
    const imgBox = document.createElement('div');
    imgBox.classList.add('image-box', or);
    container.append(imgBox);
    imgBox.style.backgroundImage = `url(${image.urls.regular})`;    
  });
}

inputSearch.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    // defValue = inputSearch.value;
    if (inputSearch.value.trim()) {
      getData(inputSearch.value, defOrientation);
      inputRandom.checked = false;
      inputSearch.blur();
    } else {
      getRandomData(defOrientation);
      inputRandom.checked = true;
      inputSearch.blur();
    }
  }
})

iconSearch.addEventListener('click', () => {
  if (inputSearch.value.trim()) {
    getData(inputSearch.value, defOrientation);
    inputRandom.checked = false;
    inputSearch.blur();
  } else {
    getRandomData(defOrientation);
    inputRandom.checked = true;
    inputSearch.blur();
  }
})

iconClearInput.addEventListener('click', () => {
  inputSearch.value = '';
  inputSearch.focus();
})

const inputs = document.querySelectorAll('.buttons-box-left input');
// console.log(inputs);
inputs.forEach((inp) => {
  inp.addEventListener('click', () => {
    defOrientation = inp.id;
    // console.log(orient);
    if (inputSearch.value.trim()) {
      getData(inputSearch.value, defOrientation);
    } else {
      getRandomData(defOrientation);
      inputRandom.checked = true;
    }   
  })
})

inputRandom.addEventListener('click', () => {
  // if (!inputRandom.checked) {
  //   getRandomData(defOrientation);
  // }
  getRandomData(defOrientation);
  inputSearch.value = '';
});

