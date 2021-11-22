const APIKEY = 'aehqz1SAOGx9sRHRaIe7iRMiv68movzn'
const daysOFtheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const getCityURl = inputValue =>
    `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${inputValue}`

const getWeatherURL = Key =>
    `https://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKEY}&language=pt-br&details=true`

const getForecastFiveDaysURL = Key =>
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${APIKEY}&metric=true`


const getInfoAPI = async (inputValue) => {
    try {
        const [{ LocalizedName, Key }] = await getCity(inputValue)

        if (LocalizedName === "") {
            throw new Error('Não foi posssivel localizar a cidade')
        }

        const dataWeather = await getWeather(Key)
        const dataForecastFiveDays = await getForecastFiveDays(Key)

        dataWeather['LocalizedName'] = LocalizedName
        dataWeather['dataForecastFiveDays'] = dataForecastFiveDays

        return dataWeather

    } catch ({ name, message }) {
        alert(`${name}, ${message}`)
    }
}

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
