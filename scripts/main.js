import { displayWeather } from "./displayWeather.js"

const apikey = 'c7a9141ba456396b5ddbb2b429504f94'
const cityInput = document.querySelector('.js-city-input')
const searchBtn = document.querySelector('.js-search-btn')

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

//Display default city
fetchWeather('bangkok')

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
        //console.log('current', currentData)
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





//displayWeather(801)

