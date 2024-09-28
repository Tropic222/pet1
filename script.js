
window.location.href = "#tab_01";


const weatherForm = document.getElementById('weatherForm');
const nowTab = document.querySelector('#tab_01');
const input = document.getElementById('input');
const iconElement = document.querySelector('.weather__block-icon');
const likeIcon = nowTab.querySelector('.weather__block-content-like');  
const savedList = document.querySelector('.weather__location-save .list');


weatherForm.addEventListener('submit', getData);

function getData(event) {
    event.preventDefault(); 
    const cityName = input.value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const cityName = data.name;
            const icon = data.weather[0].icon;

            nowTab.querySelector('.weather__block-temp').textContent = `${temperature}°`;
            nowTab.querySelector('.weather__block-content-city').textContent = cityName;
            iconElement.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
        })
        .catch(error => console.error('Ошибка:', error));
}

function addCityToList(cityName) {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');

    const citySpan = document.createElement('span');
    citySpan.classList.add('list__item-city');
    citySpan.textContent = cityName;

    const removeButton = document.createElement('button');
    removeButton.classList.add('list__item-remove');
    removeButton.textContent = 'Remove';

    
    removeButton.addEventListener('click', () => {
        savedList.removeChild(listItem); 
    });

    listItem.appendChild(citySpan);
    listItem.appendChild(removeButton);
    savedList.appendChild(listItem); 
}

likeIcon.addEventListener('click', () => {
    const city = nowTab.querySelector('.weather__block-content-city').textContent;
    addCityToList(city);
});
