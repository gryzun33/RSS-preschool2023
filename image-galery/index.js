const inputSearch = document.querySelector('.input-search');
const iconClearSearch = document.querySelector('.icon-search');
const container = document.querySelector('.container');
inputSearch.focus();
let orientation = 'portrait';


async function getData(value) {
  // const orientation = 'landscape';
  const orientation = 'portrait';
  // const orientation = 'squarish';
  const url = `https://api.unsplash.com/search/photos?query=${value}&per_page=30&orientation=${orientation}&client_id=qEz_nf64rJGRFlCwzOJb9obVgcbDiu_EiE1d4tiCwaU`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showData(data.results);
}
getData('summer');

function showData(data) {
  container.innerHTML = '';
  data.forEach((image) => {
    const imgBox = document.createElement('div');
    imgBox.classList.add('image-box');
    container.append(imgBox);
    // imgBox.style.height = (+window.getComputedStyle(imgBox).width) * 1.48 + 'px';
    imgBox.style.backgroundImage = `url(${image.urls.regular})`;
    
  });
}

inputSearch.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    getData(inputSearch.value)
  }
})


