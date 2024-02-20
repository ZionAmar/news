// Fetch weather data from API
fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Jerusalem&appid=17a6438b1d63d5b05f7039e7cb52cde7&units=metric"
)
    .then((response) => response.json())
    .then((data) => {
        // Display weather information
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = `טמפ': ${data.main.temp}°C`;

        // Display weather condition
        const weatherCondition = document.getElementById("weather-condition");
        weatherCondition.textContent = data.weather[0].description;

        // // Set weather icon
        // const weatherIcon = document.getElementById("weather-icon");
        // const iconCode = data.main[0].icon;
        // weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

        // weatherIcon.alt = data.weather[0].main;
    })
    .catch((error) => console.error("Error fetching weather data:", error));