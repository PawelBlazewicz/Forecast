import loadCityList from "./js/cityList.js";
import makeWeatherBox from "./js/weatherBox.js";

const input = document.querySelector(".cities-search");
const cityList = document.querySelector(".cities-list");

input.addEventListener("blur", () => {    
    setTimeout(function(){ cityList.innerHTML = ""; }, 200);
});

cityList.addEventListener("click", (e) => {
        input.value = e.target.textContent;
        cityList.innerHTML = "";
});

input.addEventListener("keyup", loadCityList);

document.querySelector(".btn-add").addEventListener("click", (e) => {
    if (input.value){
        makeWeatherBox(input.value);
        input.value = "";
    }    
});

makeWeatherBox();