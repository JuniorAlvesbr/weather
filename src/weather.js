const APIKEY = '5zq3p2iSOCT2q8SAWqu98PgeqNddVjGY'

const getCityURl = inputValue =>
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${inputValue}`

const getWeatherURL = Key =>
    `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKEY}&language=pt-br`

const getCity = async (inputValue) => {
    const url = getCityURl(inputValue)

    return await (await fetch(url)).json()
}

const getWeather = async inputValue => {
    const [{ LocalizedName, Key }] = await getCity(inputValue)
    const url = getWeatherURL(Key)

    const [{ WeatherText, WeatherIcon, IsDayTime, Temperature }] = await (await fetch(url)).json()

    return {
        LocalizedName, WeatherText, WeatherIcon, IsDayTime, Temperature
    }
}