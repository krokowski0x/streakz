import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { streaksRoute } from './streaks'

const app = new Hono()

app.use(logger())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/streaks', streaksRoute)

export default app