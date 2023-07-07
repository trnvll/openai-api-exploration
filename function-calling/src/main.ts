import { Configuration, OpenAIApi } from 'openai'
import { functionDescriptions } from './descriptions'
import { callFunctionFromResponse, getCurrentWeather } from '@src/utils'

// OpenAI configuration creation
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
// OpenAI instance creation
const openai = new OpenAIApi(configuration)

const userQuery = 'What is the weather in Stockholm?'

const functionOptions = {
  getCurrentWeather,
}

const main = async () => {
  try {
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content: userQuery }],
      functions: functionDescriptions,
      function_call: 'auto',
    })

    const fnRes = callFunctionFromResponse(res.data, functionOptions)
    const secondRes = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        { role: 'user', content: userQuery },
        res.data.choices[0].message,
        {
          role: 'function',
          name: 'getCurrentWeather',
          content: JSON.stringify(fnRes),
        },
      ],
    })
    console.log(secondRes.data)
    console.log(secondRes.data.choices[0].message.content)
  } catch (err) {
    console.error(err.response.data.error)
  }
}

void main()
