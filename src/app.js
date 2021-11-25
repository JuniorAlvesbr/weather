const $main = document.querySelector('.main')
const $form = document.querySelector('.form')
const $wrapper = document.querySelector('.wrapper')
const $cityName = document.querySelector('.cityName')
const $icon = document.querySelector('.main-weather > .icon')
const $weather = document.querySelector('.weather')
const $mainTemperature = document.querySelector('[data-js="main-temperature"]')
const $pressure = document.querySelector('[data-js="pressure"]')
const $relativeHumidity = document.querySelector('[data-js="relativeHumidity"]')
const $windSpeed = document.querySelector('[data-js="windSpeed"]')
const $weekDay = document.querySelectorAll('[data-js="weekDay"]')
const $fiveIcon = document.querySelectorAll('[data-js="fiveIcon"]')
const $temperature = document.querySelectorAll('[data-js="temperature"]')

const iconURL = `https://developer.accuweather.com/sites/default/files/01-s.png`

const getIconURL = icon =>
    icon < 10 ?
        `https://developer.accuweather.com/sites/default/files/0${icon}-s.png` :
        `https://developer.accuweather.com/sites/default/files/${icon}-s.png`

const showDataInHTML = ({
    LocalizedName,
    WeatherText,
    WeatherIcon,
    IsDayTime,
    Temperature,
    RelativeHumidity,
    Wind,
    Pressure,
    dataForecastFiveDays
}) => {
    $cityName.textContent = LocalizedName
    $icon.src = getIconURL(WeatherIcon)
    $weather.textContent = WeatherText
    $mainTemperature.textContent = Temperature.Metric.Value
    $pressure.textContent = Pressure.Metric.Value
    $relativeHumidity.textContent = RelativeHumidity
    $windSpeed.textContent = Wind.Speed.Metric.Value
    showFiveDaysinHTML(dataForecastFiveDays)

    IsDayTime ? $main.classList.remove('-dark') : $main.classList.add('-dark')
    $form.reset()
    $wrapper.classList.add('-active')
}

const showFiveDaysinHTML = (data) => {
    data.forEach(({ weekDay, icon, temperature }, index) => {
        $weekDay[index].textContent = weekDay
        $fiveIcon[index].src = getIconURL(icon)
        $temperature[index].textContent = temperature
    })
}

$form.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.inputCity.value
    const dataInfoApi = await getInfoAPI(inputValue)

    dataInfoApi && showDataInHTML(dataInfoApi)
})