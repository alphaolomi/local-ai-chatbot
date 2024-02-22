// Import necessary modules
import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import redis from '@/lib/redis'
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai' // Assuming these are valid imports for your setup

function logMessage(message: string) {
  console.log('[' + new Date().toISOString() + '] ' + message)
}

function exitScript() {
  return new Response('Unauthorized', { status: 401 })
}
// export const runtime = 'edge'

// Initialize OpenAI and Redis clients
const openai = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: '',
})

export async function POST(req: Request) {
  const json = await req.json()
  // logMessage('Received request: ' + JSON.stringify(json))
  const { messages, previewToken } = json
  const session = await auth()
  logMessage('Session: ' + JSON.stringify(session))
  const userId = (session)?.user.id

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (previewToken) {
    // Note: Modifying the API key of an existing OpenAI client instance might not be supported.
    // This approach assumes it's possible, but you may need to instantiate a new client if it's not.
    openai.apiKey = previewToken
  }

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true,
  })

  // Use OpenAIStream for handling the streaming response
  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant',
          },
        ],
      }

      // Convert the payload object to a flat array of key-value pairs for Redis HMSET
      const flatPayload = Object.entries(payload).reduce((acc, [key, value]) => {
        if (typeof value === 'object') {
          // @ts-ignore
          acc.push(key, JSON.stringify(value))
        } else {
          // @ts-ignore
          acc.push(key, value)
        }
        return acc
      }, [])

      // Use Redis for storage
      await redis.hmset(`chat:${id}`, flatPayload)
      await redis.zadd(`user:chat:${userId}`, createdAt, `chat:${id}`)
    },
  })

  // Return a StreamingTextResponse
  return new StreamingTextResponse(stream)
}
