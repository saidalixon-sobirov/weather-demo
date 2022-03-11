const api = {
  key: "fc7ab8e99c3a5388d0079abbcd747863",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode === 13) {
    console.log(searchBox.value);
    getResult(searchBox.value);
  }
}

function getResult(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayInfo);
}

function displayInfo(weather) {
  console.log(weather);

  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span> °C</span>`;

  let weatherInfo = document.querySelector(".weather");
  weatherInfo.innerHTML = `${weather.weather[0].main}`;

  let upDown = document.querySelector(".up-down");
  upDown.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(
    weather.main.temp_max
  )} °C`;

  let now = new Date();

  let date = document.querySelector(".date");

  date.innerHTML = setDates(now);
}

function setDates(a) {
  let months = [
    "Yanvar",
    "Fevral",
    "mart",
    "april",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];

  let weekDays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "shanba",
  ];

  let haftaKuni = weekDays[a.getDay()];

  let sana = a.getDate();

  let oyNomi = months[a.getMonth()];

  let yil = a.getFullYear();

  return `${haftaKuni}, ${sana} ${oyNomi}, ${yil}-yil`;
}
