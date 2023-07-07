import { Configuration, OpenAIApi } from 'openai'
import { functionDescriptions } from './descriptions';

// OpenAI configuration creation
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// OpenAI instance creation
const openai = new OpenAIApi(configuration);

const userQuery = 'What is the weather in Stockholm?'

const getCurrentWeather = async (location: string, unit: 'celcius' | 'fahrenheit') => {
  // here we should technically call an external API to get the weather
  return `The weather in ${location} is 20 degrees ${unit}`
}

const main = async () => {
  try {
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content: userQuery }],
      functions: functionDescriptions,
      function_call: 'auto'
    })

    const responseMessage = res.data.choices[0].message
    console.log(responseMessage)
  } catch (err) {
    console.error(err.response.data.error)
  }
}

void main()