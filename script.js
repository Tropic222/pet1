window.location.href = "#tab_01";

const weatherForm = document.getElementById('weatherForm');
const nowTab = document.querySelector('#tab_01');
const input = document.getElementById('input');
const iconElement = document.querySelector('.weather__block-icon');

weatherForm.addEventListener('submit', getData);

function getData(event) {
  event.preventDefault(); /
  const cityName = input.value;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temperature = Math.round(data.main.temp);
      const cityName = data.name;
      const aicon = data.weather[0].icon;

      
      nowTab.querySelector('.weather__block-temp').textContent = `${temperature}°`;
      nowTab.querySelector('.weather__block-content-city').textContent = cityName;
      iconElement.setAttribute('src', `http://openweathermap.org/img/w/${aicon}.png`);
    })
    .catch(error => console.error('Ошибка:', error));
}