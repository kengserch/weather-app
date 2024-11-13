const apikey = 'c7a9141ba456396b5ddbb2b429504f94'

const cityInput = document.querySelector('.js-city-input')
const searchBtn = document.querySelector('.js-search-btn')

const timeDisplay = document.querySelector('.js-city-time')
const cityDisplay = document.querySelector('.js-city-name')
const tempDisplay = document.querySelector('.js-city-temp')
const weatherDisplay = document.querySelector('.js-weather-con')
const descDisplay = document.querySelector('.js-weather-desc')

async function handleSearch() {
    const city = cityInput.value
    if (city) {
        await fetchWeather(city)
    }
}

searchBtn.addEventListener('click', (event) => {
    event.preventDefault()
    handleSearch()
})

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        handleSearch()
    }
})

// cityInput.addEventListener('keydown', async (event) => {
//     if (event.key === 'Enter') {
//         const city = cityInput.value

//         if (city) {
//             await fetchWeather(city)
//         }
//         event.preventDefault()
//     }
// })

async function fetchWeather(city) {
    try {
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        const forecaseResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apikey}`)

        if (!currentResponse.ok) {
            throw new Error(`Response status: ${currentResponse.status}`)
        }
        if (!forecaseResponse.ok) {
            throw new Error(`Response status: ${forecaseResponse.status}`)
        }
        const currentData = await currentResponse.json()
        const forecastData = await forecaseResponse.json()
        console.log('current', currentData)
        //console.log('forecast',forecastData)
        displayWeather(currentData, forecastData)
        //displayWeather(forecastData)
    } catch (error) {
        console.log(error)
        Swal.fire({
            title: 'City Not Found',
            text: 'Please try again',
            icon: 'error',
        })
    }
}

function displayWeather(currentData, forecastData) {
    const {
        dt: date,
        name: city,
        main: { temp, humidity },
        weather: [{ id, main, description }],
        wind: { speed },
        sys: { sunset, sunrise },
    } = currentData

    let forecastSummaryHTML = ''
    let weatherData

    forecastData.list.forEach((item) => {
        //console.log(item)
        weatherData = item.weather[0]

        forecastSummaryHTML += `
        <div class="p-4 text-center text-sm flex flex-col  items-center">
           <div class="mb-[50px] mt-[100px]">
             <h1 class="mb-4 text-xl font-bold">${(item.main.temp - 273.15).toFixed(0)}°C</h1>
             <img class="w-[100px] h-[100px] js-icon-forecast" src="${getForecastTheme(weatherData.id)}" />
           </div>
            <div class="text-lg">
                <h1>${weatherData.main}</h1>
                <h1>${formatTime(item.dt)}</h1>
            </div>
        </div>
        `
    })

    document.querySelector('.js-forecast').innerHTML = forecastSummaryHTML

    getWeatherTheme(id)

    const humidityDisplay = document.querySelector('.js-humidity')
    const windDisplay = document.querySelector('.js-wind')
    const sunsetDisplay = document.querySelector('.js-sunset')
    const sunriseDisplay = document.querySelector('.js-sunrise')

    timeDisplay.textContent = formatTime(date)
    cityDisplay.textContent = city
    tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`
    weatherDisplay.textContent = main
    descDisplay.textContent = description
    humidityDisplay.textContent = `${humidity} %`
    windDisplay.textContent = `${speed} m/s`
    sunsetDisplay.textContent = formatTime(sunset)
    sunriseDisplay.textContent = formatTime(sunrise)
}

function getWeatherTheme(id) {
    const bgImage = document.querySelector('.js-bg-image')
    const iconWeather = document.querySelector('.icon-weather')

    const iconCloud = document.querySelector('.svg-icon-cloud')
    const iconWind = document.querySelector('.svg-wind')
    const iconSunset = document.querySelector('.svg-sunset')
    const iconSunrise = document.querySelector('.svg-sunrise')

    const body = document.querySelector('body')

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
        cityDisplay.style.color = '#1C274C'
        tempDisplay.style.color = '#1C274C'
        weatherDisplay.style.color = '#1C274C'
        descDisplay.style.color = '#1C274C'
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

function getForecastTheme(id) {
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

function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000) // แปลงจากวินาทีเป็นมิลลิวินาที
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // ตั้งค่าให้แสดงเฉพาะชั่วโมงและนาที
}

//displayWeather(801)

fetchWeather('bangkok')
