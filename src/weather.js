const APIKEY = 'UdAPby9lQSKw5JvLBZ36J7g5auScEBGI'

const getCityURl = inputValue =>
    `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${inputValue}`

const getWeatherURL = Key =>
    `https://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKEY}&language=pt-br&details=true`

const getForecastFiveDaysURL = Key =>
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${APIKEY}&metric=true`

const getCity = async (inputValue) => {
    const cityURL = getCityURl(inputValue)

    try {
        const response = await fetch(cityURL)

        if (!response.ok) {
            throw new Error('Não foi possivel obter os dados')
        }

        return await response.json()

    } catch ({ name, message }) {
        alert(`${name}, ${message}`)
    }
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
    const daysOFtheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    const forecastFiveDaysURL = getForecastFiveDaysURL(Key)
    const { DailyForecasts } = await (await fetch(forecastFiveDaysURL)).json()
    const get = date => new Date(date)


    return forecastFiveDays = DailyForecasts.map(item => ({
        'weekDay': daysOFtheWeek[get(item.Date).getDay()],
        'icon': item.Day.Icon,
        'temperature': Math.round(item.Temperature.Maximum.Value)
    })
    )
}

const getInfoAPI = async (inputValue) => {
    try {
        const response = await getCity(inputValue)

        if (response.length === 0) {
            throw new Error('Não foi posssivel localizar a cidade')
        }

        const [{ LocalizedName, Key }] = response

        const dataWeather = await getWeather(Key)
        const dataForecastFiveDays = await getForecastFiveDays(Key)

        return [dataWeather, LocalizedName, dataForecastFiveDays]

    } catch ({ name, message }) {
        alert(`${name}, ${message}`)
    }
}

