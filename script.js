const favoriteCities = [];
console.log(favoriteCities)
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
            console.log('Ответ API:', data);

            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const weatherDescription = data.weather[0].description;
            const icon = data.weather[0].icon;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            const cityName = data.name;

            
            nowTab.querySelector('.weather__block-temp').textContent = `${temperature}°`;
            nowTab.querySelector('.weather__block-content-city').textContent = cityName;
            iconElement.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);

            
            const detailsTab = document.querySelector('#tab_02');
            detailsTab.querySelector('.weather__details-title').textContent = cityName;
            detailsTab.querySelectorAll('.list__item')[0].textContent = `Temperature: ${temperature}°`;
            detailsTab.querySelectorAll('.list__item')[1].textContent = `Feels like: ${feelsLike}°`;
            detailsTab.querySelectorAll('.list__item')[2].textContent = `Weather: ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}`;
            detailsTab.querySelectorAll('.list__item')[3].textContent = `Sunrise: ${sunrise}`;
            detailsTab.querySelectorAll('.list__item')[4].textContent = `Sunset: ${sunset}`;

        })
        .catch(error => console.error('Ошибка:', error));
}

function addCityToList(cityName) {
    if (favoriteCities.includes(cityName)) {
        return;
    }

    favoriteCities.push(cityName);
    
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('list__item-content');

    const citySpan = document.createElement('span');
    citySpan.classList.add('list__item-city');
    citySpan.textContent = cityName;

    const removeButton = document.createElement('button');
    removeButton.classList.add('list__item-remove');
    removeButton.textContent = '✖';

    removeButton.addEventListener('click', () => {
        savedList.removeChild(listItem); 
        favoriteCities.splice(favoriteCities.indexOf(cityName), 1);
    });

    citySpan.addEventListener('click', () => {
        input.value = cityName;  
        getData({ preventDefault: () => {} });
    });

    contentDiv.appendChild(citySpan);
    contentDiv.appendChild(removeButton);
    listItem.appendChild(contentDiv);
    savedList.appendChild(listItem); 
}

likeIcon.addEventListener('click', () => {
    const city = nowTab.querySelector('.weather__block-content-city').textContent;
    addCityToList(city);
});
