const apiKey = "b5b93963b46828179a029c664178ae30";
const url = "http://api.openweathermap.org/data/2.5/forecast?";

const options = {
    timeout: 5000,
    maximumAge: 0
};

function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

const getWeather = async id => {
    if (id) {
        id = "q=" + id;
    } else {
        try {
            const {
                coords
            } = await getCurrentPosition(options);
            const {
                latitude,
                longitude
            } = coords;
            id = `lat=${latitude}&lon=${longitude}`;
        } catch (error) {
            console.log(error.message);
            id = "q=Warszawa";
        }
    }
    const get = await fetch(`${url}${id}&APPID=${apiKey}&cnt=24&units=metric&lang=pl`);
    const data = await get.json();
    return data;
};

const makeWeatherBox = async id => {
    const data = await getWeather(id);
    console.log(data);
    const container = document.querySelector(".container");
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");
    forecast.classList.add(data.city[name]);
    forecast.innerHTML = `
        <div class="topInfo">
            <div class="city">
                <h1 class="cityName">
                    ${data.city.name}
                </h1>
                <div class="additionalInfo">
                    <span>💦 ${data.list[0].main.humidity}%</span>
                    <span>💨${data.list[0].wind.speed}m/s</span>
                    <span>${data.list[0].main.pressure}hPa</span>
                </div>
            </div>
            <div class="actualTemperature">               
                <img class="bigWeatherIcon" src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="${data.list[0].weather[0].description}" title="${data.list[0].weather[0].description}">
                ${Math.round(data.list[0].main.temp)}°
            </div>
        </div>
        <div class="bottomInfo"></div>`;
    container.appendChild(forecast);

    for (let i of data.list) {
        const div = document.createElement("div");
        const temp = Math.round(i.main.temp);
        const tempValue = (temp >= 0) ? "positive" : "negative";
        const hour = /\s.{5}/.exec(i.dt_txt);
        div.innerHTML = `       
            <img class="weatherIcon" src="http://openweathermap.org/img/w/${i.weather[0].icon}.png" alt="${i.weather[0].description}" title="${i.weather[0].description}">
            <div class="tempBar" style="top:${temp>0 ?50 - (temp+5) : 90}px; height:${Math.abs(temp)+5}px;"></div>
            <div class="timeAndTemp" >
                ${temp}°C <br> ${hour}
            </div>
        `;
        div.classList.add("temp");
        div.querySelector(".tempBar").classList.add(tempValue);
        forecast.children[1].appendChild(div);
    }
};

makeWeatherBox();