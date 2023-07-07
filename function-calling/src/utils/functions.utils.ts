
interface GetCurrentWeatherArgs {
  location: string
  unit: 'celcius' | 'fahrenheit'
}

const getCurrentWeather = (args: GetCurrentWeatherArgs) => {
  // const { location, unit } = args
  // here we should technically call an external API to get the weather
  return {
    temperature: 72,
    forecast: ['sunny', 'windy'],
    ...args
  }
}

export { getCurrentWeather }
