import { CreateChatCompletionResponse } from "openai";

const callFunctionFromResponse = <T extends Record<string, (args: any) => any>>(response: CreateChatCompletionResponse, fnOptions: T) => {
  const msg = response.choices[0].message
  const { name, arguments: args } = msg.function_call ?? {}

  if (!name) {
    throw new Error('No function call found in response')
  }

  const fn = fnOptions[name as keyof T]

  if (!fn) {
    throw new Error(`Function ${name} not found in provided options`)
  }

  try {
    return fn(JSON.parse(args))
  } catch (err) {
    throw new Error(`Error calling function ${name} with args ${args}: ${err.message}`)
  }
}

export { callFunctionFromResponse }
