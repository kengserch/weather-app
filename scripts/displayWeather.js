import { formatTime, covertToCelsius } from './utils.js'

export function displayWeather(currentData, forecastData) {
    const timeDisplay = document.querySelector('.js-city-time')
    const cityDisplay = document.querySelector('.js-city-name')
    const tempDisplay = document.querySelector('.js-city-temp')
    const weatherDisplay = document.querySelector('.js-weather-con')
    const descDisplay = document.querySelector('.js-weather-desc')
    const pressureDisplay = document.querySelector('.js-pressure')
    const visibilityDisplay = document.querySelector('.js-visibility')
    const humidityDisplay = document.querySelector('.js-humidity')
    const windDisplay = document.querySelector('.js-wind')
    const sunsetDisplay = document.querySelector('.js-sunset')
    const sunriseDisplay = document.querySelector('.js-sunrise')
    let forecastSummaryHTML = ''
    let weatherData

    
    const {
        dt: date,
        name: city,
        main: { temp, humidity, pressure },
        weather: [{ id, main, description }],
        wind: { speed },
        sys: { sunset, sunrise },
        visibility: visibility,
    } = currentData

    

    timeDisplay.textContent = formatTime(date)
    cityDisplay.textContent = city
    tempDisplay.textContent = `${covertToCelsius(temp)}°C`
    weatherDisplay.textContent = main
    descDisplay.textContent = description
    humidityDisplay.textContent = `${humidity} %`
    windDisplay.textContent = `${speed} m/s`
    sunsetDisplay.textContent = formatTime(sunset)
    sunriseDisplay.textContent = formatTime(sunrise)
    pressureDisplay.textContent = `Pressure : ${pressure} hPa`
    visibilityDisplay.textContent = `Visibility : ${visibility / 1000} km`

    

    forecastData.list.forEach((item) => {
        console.log(item)
        weatherData = item.weather[0]

        forecastSummaryHTML += `
        <div class="flex flex-col p-4 text-center justify-center items-center text-sm ">
           <div class="mb-[50px] mt-[50px]">
             <h1 class="mb-4 text-xl font-bold">${covertToCelsius(item.main.temp)}°C</h1>
             <img class="w-[80px] h-[80px] js-icon-forecast" src="${setForecastIcon(weatherData.id)}" />
           </div>
            <div class="text-lg">
                <h1>${weatherData.main}</h1>
                <h1>${formatTime(item.dt)}</h1>
            </div>
        </div>
        `
    })

    document.querySelector('.js-forecast').innerHTML = forecastSummaryHTML

    setWeatherTheme(id)
}

function setWeatherTheme(id) {
    const body = document.querySelector('body')
    const bgImage = document.querySelector('.js-bg-image')
    const iconWeather = document.querySelector('.icon-weather')
    const iconCloud = document.querySelector('.svg-icon-cloud')
    const iconWind = document.querySelector('.svg-wind')
    const iconSunset = document.querySelector('.svg-sunset')
    const iconSunrise = document.querySelector('.svg-sunrise')
    // Thunderstorm
    if (id >= 200 && id <= 232) {
        body.style.backgroundColor = '#3b3b3b'
        iconCloud.style.fill = '#3b3b3b'
        iconWind.style.stroke = '#3b3b3b'
        iconSunset.style.fill = '#3b3b3b'
        iconSunrise.style.fill = '#3b3b3b'
        iconWeather.src = '/images/thunderstorm.svg'
        bgImage.style.backgroundImage = "url('./images/storm-background.jpg')"
    }
    // Drizzle
    else if (id >= 300 && id <= 321) {
        body.style.backgroundColor = '#d3d3d3'
        iconCloud.style.fill = '#c7ccd4'
        iconWind.style.stroke = '#c7ccd4'
        iconSunset.style.fill = '#c7ccd4'
        iconSunrise.style.fill = '#c7ccd4'
        iconWeather.src = '/images/drizzle.svg'
        bgImage.style.backgroundImage = "url('./images/drizzle-background.jpg')"
    }
    // Rain
    else if (id >= 500 && id <= 531) {
        body.style.backgroundColor = '#6e7f8d'
        iconCloud.style.fill = '#6e7f8d'
        iconWind.style.stroke = '#6e7f8d'
        iconSunset.style.fill = '#6e7f8d'
        iconSunrise.style.fill = '#6e7f8d'
        iconWeather.src = '/images/rain.svg'
        bgImage.style.backgroundImage = "url('./images/rain-background.jpg')"
    }
    // Snow
    else if (id >= 600 && id <= 622) {
        body.style.backgroundColor = '#fffafa'
        iconCloud.style.fill = '#a9b3c1'
        iconWind.style.stroke = '#a9b3c1'
        iconSunset.style.fill = '#a9b3c1'
        iconSunrise.style.fill = '#a9b3c1'
        iconWeather.src = '/images/snow.svg'
        bgImage.style.backgroundImage = "url('./images/snow-background.jpg')"
    }
    //Atmosphere
    else if (id >= 701 && id <= 781) {
        body.style.backgroundColor = '#fffafa'
        iconCloud.style.fill = '#000'
        iconWind.style.stroke = '#000'
        iconSunset.style.fill = '#000'
        iconSunrise.style.fill = '#000'
    }
    //Clear
    else if (id === 800) {
        body.style.backgroundColor = '#FFDAB9'
        iconCloud.style.fill = '#FFA07A'
        iconWind.style.stroke = '#FFA07A'
        iconSunset.style.fill = '#FFA07A'
        iconSunrise.style.fill = '#FFA07A'
        iconWeather.src = '/images/clear.svg'
        bgImage.style.backgroundImage = "url('./images/clear-background.jpg')"
    }
    //Clouds
    else if (id >= 801 && id <= 804) {
        body.style.backgroundColor = '#F0F8FF'
        iconCloud.style.fill = '#6e7f8d'
        iconWind.style.stroke = '#6e7f8d'
        iconSunset.style.fill = '#6e7f8d'
        iconSunrise.style.fill = '#6e7f8d'
        iconWeather.src = '/images/cloud.svg'
        bgImage.style.backgroundImage = "url('./images/cloud-background.jpg')"
    }
}

function setForecastIcon(id) {
    // Thunderstorm
    if (id >= 200 && id <= 232) {
        return '/images/forecast-icon/storm.svg'
    }
    // Drizzle
    else if (id >= 300 && id <= 321) {
        return '/images/forecast-icon/drizzle.svg'
    }
    // Rain
    else if (id >= 500 && id <= 531) {
        return '/images/forecast-icon/rain.svg'
    }
    // Snow
    else if (id >= 600 && id <= 622) {
        return '/images/forecast-icon/snow.svg'
    }
    //Atmosphere
    else if (id >= 701 && id <= 781) {
    }
    //Clear
    else if (id === 800) {
        return '/images/forecast-icon/clear.svg'
    }
    //Clouds
    else if (id >= 801 && id <= 804) {
        return '/images/forecast-icon/cloud.svg'
    }
}
