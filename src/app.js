const $form = document.querySelector('.form')
const $cityName = document.querySelector('.cityName')
const $icon = document.querySelector('.main-weather > .icon')
const $weather = document.querySelector('.weather')
const $temperature = document.querySelector('[data-js="temperature"]')
const $pressure = document.querySelector('[data-js="pressure"]')
const $relativeHumidity = document.querySelector('[data-js="relativeHumidity"]')
const $windSpeed = document.querySelector('[data-js="windSpeed"]')


$form.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.inputCity.value

    const data = await getWeather(inputValue)

    console.log(data)
    showDataInHTML(data)
})

const showDataInHTML = ({
    LocalizedName,
    WeatherText,
    WeatherIcon,
    IsDayTime,
    Temperature,
    RelativeHumidity,
    Wind,
    Pressure
}) => {
    $cityName.textContent = LocalizedName
    $icon.src = `assets/icons/${WeatherIcon}.svg`
    $weather.textContent = WeatherText
    $temperature.textContent = Temperature.Metric.Value
    $pressure.textContent = Pressure.Metric.Value
    $relativeHumidity.textContent = RelativeHumidity
    $windSpeed.textContent = Wind.Speed.Metric.Value
}