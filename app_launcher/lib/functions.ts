import GetLocation from 'react-native-get-location'

const getWeather = async () => {
    const locationInfo = await GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 60000,
    })
    const { latitude, longitude } = locationInfo
    const apiUrl = `https://api.weather.gov/points/${latitude},${longitude}`
    const weatherData = await fetch(apiUrl)
        .then(response => response.json())
    const nextUrl = weatherData.properties.forecast
    const weather = await fetch(nextUrl)
        .then(response => response.json())
    const currentWeather = weather.properties.periods[0]
    const returnValue = `${currentWeather.name} ${currentWeather.detailedForecast} `
    return returnValue
}
export const handleFunction = async (value: string): Promise<string | undefined> => {
    const math = ["+", "-", "/", "*"]
    if (math.some(opp => value.includes(opp))) {
        try {
            return `Math: ${eval(value)}`
        } catch (error) {

        }
    }
    if (value.toLowerCase().startsWith("weather") || value.toLowerCase().startsWith("temp")) {
        return await getWeather()
    }
}