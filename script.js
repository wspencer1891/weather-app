const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = 'xxxxxxxxxxxxxxxxx';
const diffKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('City value is not valid');
    }
});

function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())  // Fixed the issue here
        .then(data => {
            showWeatherData(data);  // Now it should print the data to the console
        })
        .catch(error => console.error('Error:', error));  // Add error handling
}
function showWeatherData(data) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = ''; // Clear previous results

    // Extract the necessary data
    const cityName = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    // Create and populate elements
    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${country}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `The temperature is: ${Math.floor(temp - diffKelvin)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `The humidity is: ${humidity}%`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `Weather description: ${description}`;

    // Append elements to the response div
    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(iconInfo);
    divResponseData.appendChild(descriptionInfo);
}


