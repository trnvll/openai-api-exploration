import { ChatCompletionFunctions } from 'openai'

const functionDescriptions: ChatCompletionFunctions[] = [
  {
    name: 'getCurrentWeather',
    description: 'Get the current weather in a given location',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The location to get the weather for, e.g. "London, UK"',
        },
        unit: {
          type: 'string',
          description:
            'The unit to get the weather in, in this case either "celsius" or "fahrenheit"',
          enum: ['celsius', 'fahrenheit'],
        },
      },
      required: ['location', 'unit'],
    },
  },
]

export { functionDescriptions }
