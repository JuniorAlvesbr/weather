const $form = document.querySelector('.form')
const $cityName = document.querySelector('.cityName')
const $icon = document.querySelector('.main-weather > .icon')
const $weather = document.querySelector('.weather')
const $temperature = document.querySelector('[data-js="temperature"]')

$form.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.inputCity.value

    const data = await getWeather(inputValue)

    showDataInHTML(data)
})

const showDataInHTML = ({ LocalizedName, WeatherText, WeatherIcon, IsDayTime, Temperature }) => {
    $cityName.textContent = LocalizedName
    $icon.src = `assets/icons/${WeatherIcon}.svg`
    $weather.textContent = WeatherText
    $temperature.textContent = Temperature.Metric.Value
}