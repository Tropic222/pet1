window.location.href = "#tab_01";

const cityName = "London"; 
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));