
interface GetCurrentWeatherArgs {
  location: string
  unit: 'celcius' | 'fahrenheit'
}

const getCurrentWeather = ({ location, unit }: GetCurrentWeatherArgs) => {
  // here we should technically call an external API to get the weather
  return `The weather in ${location} is 20 degrees ${unit}`
}

export { getCurrentWeather }
