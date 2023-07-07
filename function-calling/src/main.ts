import { Configuration, OpenAIApi } from 'openai'
import { functionDescriptions } from './descriptions';
import { callFunctionFromResponse, getCurrentWeather } from '@src/utils';

// OpenAI configuration creation
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// OpenAI instance creation
const openai = new OpenAIApi(configuration);

const userQuery = 'What is the weather in Stockholm?'

const functionOptions = {
  getCurrentWeather
}

const main = async () => {
  try {
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content: userQuery }],
      functions: functionDescriptions,
      function_call: 'auto'
    })

    console.log(res)

    const result = callFunctionFromResponse(res.data, functionOptions)
    console.log(result)
  } catch (err) {
    console.error(err.response.data.error)
  }
}

void main()