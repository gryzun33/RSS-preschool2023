const inputs = document.querySelectorAll('.buttons-box-left input');
const inputSearch = document.querySelector('.input-search');
const iconSearch = document.querySelector('.icon-search');
const iconClearInput = document.querySelector('.icon-clear');
const container = document.querySelector('.container');
const inputRandom = document.querySelector('#random');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const noResults = document.querySelector('.no-results');
let defOrientation = 'landscape';

inputRandom.checked = true;
inputSearch.focus();

async function getData(value, orient) {
  const url = `https://api.unsplash.com/search/photos?query=${value}&per_page=30&orientation=${orient}&client_id=qEz_nf64rJGRFlCwzOJb9obVgcbDiu_EiE1d4tiCwaU`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results.length === 0) {
    container.innerHTML = '';
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
    showData(data.results, orient);
  }  
}

async function getRandomData(orient) {
  noResults.classList.add('hidden');
  const url = `https://api.unsplash.com/photos/random?count=30&orientation=${orient}&client_id=qEz_nf64rJGRFlCwzOJb9obVgcbDiu_EiE1d4tiCwaU`;
  const res = await fetch(url);
  const data = await res.json();
  showData(Array.from(data), orient);
}

function showData(data, or) {
  container.innerHTML = '';
  data.forEach((image) => {
    const imgBox = document.createElement('div');
    imgBox.classList.add('image-box', or);
    container.append(imgBox);
    imgBox.style.backgroundImage = `url(${image.urls.regular})`;
    imgBox.addEventListener('click', () => {
      showImage(image);
    });
  });
}

function showImage(image) {
  modal.classList.remove('hidden');
  body.style.overflowY = 'hidden';
  let imageDescr = 'no description';
  if (image.alt_description) {
    imageDescr = image.alt_description[0].toUpperCase() + image.alt_description.slice(1);
  }
  modal.innerHTML = `
    <button class="close-btn">
      <img src="./assets/icons/xmark-solid-modal.svg" alt="close-btn">
    </button>
    <div class="modal-box">
      <div class="image-wrapper">
        <img class="modal-image" src="${image.urls.regular}" alt="${image.alt_description}">
        <div class="modal-content">
          <div class="modal-text">
            <p class="image-descr">${imageDescr}</p>
            <p class="image-author">Author: ${image.user.name}</p>
          </div>
          <div class="modal-likes">
            <img src="./assets/icons/heart-solid.svg" alt="like">
            <p class="like-count">${image.likes}</p>
          </div>
        </div>
      </div>   
    </div>`;
}

function  closeModal() {
  modal.classList.add('hidden');
  body.style.overflowY = '';
  modal.innerHTML = '';
}

modal.addEventListener('click', (e) => {
  if (!e.target.closest('.modal-image')) {
    closeModal();
  }
});

inputSearch.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
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

inputs.forEach((inp) => {
  inp.addEventListener('click', () => {
    defOrientation = inp.id;
    if (inputSearch.value.trim()) {
      getData(inputSearch.value, defOrientation);
    } else {
      getRandomData(defOrientation);
      inputRandom.checked = true;
    }   
  })
})

inputRandom.addEventListener('click', () => {
  getRandomData(defOrientation);
  inputSearch.value = '';
});

getRandomData(defOrientation);
