const cityList = document.querySelector(".cities-list");
let lis = [];

export default async (e) => {
    cityList.innerHTML = "";
    if (lis.length < 1) {
        const response = await fetch("./js/citylist.json");
        lis = await response.json();
    }
    if (e.target.value) {
        let reg = RegExp("^" + e.target.value + ".*", "i");
        let count = 0;
        for (let i = 0; i < lis.length; i++) {
            if (reg.test(lis[i].name)) {
                const li = document.createElement("li");
                const a = document.createElement("a");
                li.classList.add("city-li");
                a.classList.add("city-li-name")
                a.setAttribute("href", "#");
                cityList.appendChild(li);
                li.appendChild(a);
                a.textContent = lis[i].name;
                count++;
            }
            if (count > 10) {
                break;
            }
        }
        
    }
}
