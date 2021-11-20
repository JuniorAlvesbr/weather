const APIKEY = 'wjkUMrGTkT7jLWLXedKz0ePKUG272abz'
const daysOFtheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const getCityURl = inputValue =>
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${inputValue}`

const getWeatherURL = Key =>
    `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKEY}&language=pt-br&details=true`

const getForecastFiveDaysURL = Key =>
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${APIKEY}&metric=true`


const getInfoAPI = async (inputValue) => {
    const [{ LocalizedName, Key }] = await getCity(inputValue)

    const dataWeather = await getWeather(Key)
    const dataForecastFiveDays = await getForecastFiveDays(Key)

    dataWeather['LocalizedName'] = LocalizedName
    dataWeather['dataForecastFiveDays'] = dataForecastFiveDays

    return dataWeather
}

const getCity = async (inputValue) => {
    const url = getCityURl(inputValue)

    return await (await fetch(url)).json()
}

const getWeather = async Key => {
    const weatherURL = getWeatherURL(Key)

    const [{
        WeatherText,
        WeatherIcon,
        IsDayTime,
        Temperature,
        RelativeHumidity,
        Wind,
        Pressure
    }] = await (await fetch(weatherURL)).json()

    return {
        WeatherText,
        WeatherIcon,
        IsDayTime,
        Temperature,
        RelativeHumidity,
        Wind,
        Pressure
    }
}

const getForecastFiveDays = async Key => {
    const forecastFiveDays = []
    const forecastFiveDaysURL = getForecastFiveDaysURL(Key)
    const { DailyForecasts } = await (await fetch(forecastFiveDaysURL)).json()

    DailyForecasts.map(item => {
        const getWeekDay = new Date(item.Date).getDay()
        const weekDay = daysOFtheWeek[getWeekDay]

        forecastFiveDays.push({
            'weekDay': weekDay,
            'icon': item.Day.Icon,
            'temperature': Math.round(item.Temperature.Maximum.Value)
        })
    })

    return forecastFiveDays
}