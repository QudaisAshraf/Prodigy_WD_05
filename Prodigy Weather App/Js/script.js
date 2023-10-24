
const api_key = `6894417129eee69e4fed7987fd37863a`;

const form = document.querySelector('form')
const search = document.querySelector('#search')
const weather = document.querySelector('#weather')
const other = document.querySelector('.otherData')

// const api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

// const img_url = `https: //openweathermap.org/img/wn?${data.weather[0].icon}@2x.png`

form.addEventListener('submit', function(event){
    getWeather(search.value);
    event.preventDefault();
})

const getWeather = async (city) =>{
    weather.innerHTML = `<p>Loading...</p>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return showWeather(data);
}

const showWeather = (data) =>{
    if(data.cod=="404"){
        weather.innerHTML = `<p>City not found!</p>`
        return;
    }
    weather.innerHTML = `
    <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    </div>
    <div>
        <p>${data.name}, ${data.sys.country}</p>
        <h2>${data.main.temp}°C</h2>
        <h4>${data.weather[0].main}</h4>
    </div>
    `
    other.innerHTML= `
        <div>
            <p class="data">Feels like: ${data.main.feels_like}°C </p>
            <p class="data">Max temp: ${data.main.temp_max}°C</p>
            <p class="data">Humidity: ${data.main.humidity}</p>
            <p class="data">Latitude: ${data.coord.lat}</p>
            <p class="data">Longitude: ${data.coord.lon}</p>  
        </div>
    `
}
