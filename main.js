const apiKey = "b5b93963b46828179a029c664178ae30";
const API = "http://api.openweathermap.org/data/2.5/forecast?";

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
    const get = await fetch(`${API}${id}&APPID=${apiKey}&cnt=12&units=metric`);
    const data = await get.json();
    return data;
};

const makeWeatherBox = async id => {
    const data = await getWeather(id);
    const container = document.querySelector(".container");
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");
    forecast.classList.add(data.city.name);
    forecast.innerHTML = `
        <div class="topInfo">
            <div class="city">
                <h1 class="cityName">${data.city.name}</h1>
            </div>
            <div class="actualTemperature">
                ${Math.round(data.list[0].main.temp)}°
            </div>
        </div>`;
    container.appendChild(forecast);

    for (let i of data.list) {
        const p = document.createElement("p");
        const temp = Math.round(i.main.temp);
        p.innerHTML = `${/\s.{5}/.exec(i.dt_txt)} ## ${temp}°C <span style="color:blue">${"[]".repeat(
      Math.abs(temp)
    )}</span>`;
        p.classList.add("temp");
        forecast.appendChild(p);
    }
};

makeWeatherBox();