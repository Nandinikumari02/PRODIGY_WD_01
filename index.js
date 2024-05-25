// const apiKey = "513d2a01560c2006e0327db3b8d50e9b";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q";

// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");

// async function checkWeather(city){
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
//     let data = await response.json();

//     console.log(data);

//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
// }

// searchBtn.addEventListener("click", ()=>{
//     checkWeather(searchBox.value);
// })


const apiKey = "d3c1c0f3d339030b649182c19f876ca1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const respone = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (respone.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").style.color = "red";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await respone.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector('.weather').style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})


