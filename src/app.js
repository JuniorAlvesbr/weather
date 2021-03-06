const $main = document.querySelector('[data-js="main"]')
const $form = document.querySelector('[data-js="form"]')
const $wrapper = document.querySelector('[data-js="wrapper"]')
const $cityName = document.querySelector('[data-js="cityName"]')
const $icon = document.querySelector('[data-js="icon"]')
const $weather = document.querySelector('[data-js="weather"]')
const $mainTemperature = document.querySelector('[data-js="main-temperature"]')
const $pressure = document.querySelector('[data-js="pressure"]')
const $relativeHumidity = document.querySelector('[data-js="relativeHumidity"]')
const $windSpeed = document.querySelector('[data-js="windSpeed"]')
const $weekDay = document.querySelectorAll('[data-js="weekDay"]')
const $fiveIcon = document.querySelectorAll('[data-js="fiveIcon"]')
const $temperature = document.querySelectorAll('[data-js="temperature"]')

const iconURL = `https://developer.accuweather.com/sites/default/files/01-s.png`

const getIconURL = icon => {
    const withZero = icon < 10 ? `0${icon}` : `${icon}`
    return `https://developer.accuweather.com/sites/default/files/${withZero}-s.png`
}

const showDataInHTML = ([dataWeather, LocalizedName, dataForecastFiveDays]) => {
    $cityName.textContent = LocalizedName
    $icon.src = getIconURL(dataWeather.WeatherIcon)
    $weather.textContent = dataWeather.WeatherText
    $mainTemperature.textContent = dataWeather.Temperature.Metric.Value
    $pressure.textContent = dataWeather.Pressure.Metric.Value
    $relativeHumidity.textContent = dataWeather.RelativeHumidity
    $windSpeed.textContent = dataWeather.Wind.Speed.Metric.Value
    showFiveDaysinHTML(dataForecastFiveDays)

    if (dataWeather.IsDayTime) {
        $main.classList.remove("-dark")
    } else {
        $main.classList.add("-dark")
    }

    $form.reset()
    $wrapper.classList.add('-active')
}

const showFiveDaysinHTML = (dataForecastFiveDays) => {
    dataForecastFiveDays.forEach(({ weekDay, icon, temperature }, index) => {
        $weekDay[index].textContent = weekDay
        $fiveIcon[index].src = getIconURL(icon)
        $temperature[index].textContent = temperature
    })
}

const showWeather = async (city) => {
    const dataInfoApi = await getInfoAPI(city)

    if (dataInfoApi) {
        localStorage.setItem('city', city)
        showDataInHTML(dataInfoApi)
        return
    }

    localStorage.removeItem('city')
}

$form.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.inputCity.value

    showWeather(inputValue)

})

const getCityLocalStorage = () => {
    const city = localStorage.getItem('city')
    city && showWeather(city)
}

getCityLocalStorage()