/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@/payload.config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from 'payload/dist/rest'
import type { NextRequest } from 'next/server'

const handlers = {
  GET: REST_GET(config),
  POST: REST_POST(config),
  DELETE: REST_DELETE(config),
  PATCH: REST_PATCH(config),
}

export { handlers as GET, handlers as POST, handlers as DELETE, handlers as PATCH }
