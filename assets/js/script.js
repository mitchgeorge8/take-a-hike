bulmaCarousel.attach('#carousel', {
    slidesToScroll: 1,
    slidesToShow: 1
});


//weather

const weather = {}

weather.temperature = {
    unit : "farenheight"
}
const key = "29cddfeb1ce63551dd6d2d389e8b733a";

function setPosition(position){
    let latitude = 41.0998;
    let longitude = 80.6495;

    getWeather(latitude,longitude);
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch (api)
        .then (function(response){
            let data =response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value=data.main.temp;
            weather.description=data.weather[0].description;
            weather.city=data.name
        })
        .then(function(){
            displayWeather();
        });
}
function displayWeather(){
    temp.Element.innerHTML= `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}