const inputs = document.querySelectorAll('.buttons-box-left input');
const inputSearch = document.querySelector('.input-search');
const iconSearch = document.querySelector('.icon-search');
const iconClearInput = document.querySelector('.icon-clear');
const container = document.querySelector('.container');
const inputRandom = document.querySelector('#random');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
let defOrientation = 'landscape';
let currImage = null;
let modalBox = null;

inputRandom.checked = true;
inputSearch.focus();

getRandomData(defOrientation);

async function getData(value, orient) {
  const url = `https://api.unsplash.com/search/photos?query=${value}&per_page=30&orientation=${orient}&client_id=qEz_nf64rJGRFlCwzOJb9obVgcbDiu_EiE1d4tiCwaU`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('data=', data);
  showData(data.results, orient);
}

async function getRandomData(orient) {
  const url = `https://api.unsplash.com/photos/random?count=30&orientation=${orient}&client_id=qEz_nf64rJGRFlCwzOJb9obVgcbDiu_EiE1d4tiCwaU`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  // console.log(typeof data);
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
      currImage = image;
    })
    // console.log(image.width);
    // console.log(image.height);
    // console.log(image.alt_description);
    // console.log(image.user.name);
    // console.log(image.likes);
  });
}

function showImage(image) {
  modal.classList.remove('hidden');
  body.style.overflowY = 'hidden';
  // const modalClass = (defOrientation === ('portrait' || 'squarish')) ? 'modal-portrait' : 'modal-landscape';
  let imageDescr = 'no description';
  if (image.alt_description) {
    imageDescr = image.alt_description[0].toUpperCase() + image.alt_description.slice(1);
  }
  modal.innerHTML = `
    <div class="modal-box">
      <button class="close-btn">
        <img src="./assets/icons/xmark-solid-modal.svg" alt="close-btn">
      </button>
      <div class="image-wrapper">
        <img class="modal-image" src="${image.urls.regular}" alt="${image.alt_description}">
      </div>
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
  `;
  setTimeout(() => {

    calcWidthModal(image);
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      body.style.overflowY = '';
      modal.innerHTML = '';
      modalBox = null;
    });
  }, 0);
}

function calcWidthModal(image) {
  modalBox = modal.querySelector('.modal-box');
  modalBox.style.maxHeight = '';
  modalBox.style.overflowY = '';

  console.log ('imagewidth=',image.width );
  console.log ('imageheight=',image.height );
  console.log('windowwidth', window.innerWidth);
  console.log('windowheight', window.innerHeight);

  const ratioWindow = window.innerHeight /  window.innerWidth;
  const ratioImage = image.height / image.width; 
  const k = ratioWindow / ratioImage - 0.1;
  const kk = ratioWindow / ratioImage - 0.15;
  
  console.log('ratioindow', ratioWindow);
  console.log('ratioimage', ratioImage);
  console.log ('k=', k);
  console.log ('kk=', kk);

  if (ratioWindow > ratioImage) {
    modalBox.style.width = '80vw';
  } else if ((ratioWindow <= ratioImage) && (ratioWindow > 0.7)) {
    modalBox.style.width = kk * window.innerWidth + 'px';
  } else if ((ratioWindow <= ratioImage) && (ratioImage >=1) && (ratioWindow > 0.5)) {
    modalBox.style.width = k * window.innerWidth + 'px';
  } else if ((ratioWindow <= ratioImage) && (ratioImage < 1) && (ratioWindow > 0.5)) {
    modalBox.style.width = kk * window.innerWidth + 'px';
  } else {
    const kkk = 0.5 / ratioImage - 0.1;
    modalBox.style.width = kkk * window.innerWidth;
    modalBox.style.maxHeight = '100vh';
    modalBox.style.overflowY = 'auto';
  }
  console.log('modalwidth', window.getComputedStyle(modalBox).width);
}

window.addEventListener('resize', () => {
  if (modalBox) {
    calcWidthModal(currImage);
  }
})


modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    body.style.overflowY = '';
    modal.innerHTML = '';
  }
});

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


// console.log(inputs);
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

