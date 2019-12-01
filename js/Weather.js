const apiKey = "b5b93963b46828179a029c664178ae30";
const url = "https://api.openweathermap.org/data/2.5/forecast?";

const options = {
    timeout: 5000,
    maximumAge: 0
};

function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export default async id => {
    if (id) {
        id = "q=" + id;
    } else {
        try {
            const {
                coords
            } = await getCurrentPosition(options);
            const { latitude, longitude } = coords;
            id = `lat=${latitude}&lon=${longitude}`;
        } catch (error) {
            console.log(error.message);
            id = "q=Wroclaw";
        }
    }
    const get = await fetch(`${url}${id}&APPID=${apiKey}&cnt=24&units=metric&lang=pl`);
    const data = await get.json();
    return data;
};