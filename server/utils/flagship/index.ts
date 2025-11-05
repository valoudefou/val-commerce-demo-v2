import { Flagship, LogLevel, Visitor } from '@flagship.io/js-sdk'
import { useRuntimeConfig } from '#imports'
import { createError } from 'h3'

import { flagshipLogManager } from '@/utils/flagship/logManager'
import { flagshipLogStore } from '@/utils/flagship/logStore'

type InitializeFlagshipOptions = {
  visitorId: string
  context?: Record<string, string | number | boolean>
  authenticated?: boolean
}

let flagshipStarted = false

const ensureFlagshipStarted = () => {
  if (flagshipStarted) return

  const config = useRuntimeConfig()
  const flagshipConfig = (config.flagship ?? {}) as { envId?: string; apiKey?: string }
  const publicFlagship = (config.public?.flagship ?? {}) as { envId?: string; apiKey?: string }
  const envId = flagshipConfig.envId || publicFlagship.envId
  const apiKey = flagshipConfig.apiKey || publicFlagship.apiKey

  if (!envId || !apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Flagship credentials are missing. Please configure runtimeConfig.flagship.'
    })
  }

  Flagship.start(envId, apiKey, {
    fetchNow: false,
    logManager: flagshipLogManager,
    logLevel: LogLevel.ALL
  })

  flagshipStarted = true
}

export const initializeFlagship = async ({
  visitorId,
  context = {},
  authenticated = false
}: InitializeFlagshipOptions): Promise<Visitor> => {
  if (!visitorId) {
    throw createError({ statusCode: 400, statusMessage: 'A visitorId is required to initialize Flagship.' })
  }

  ensureFlagshipStarted()

  const visitor = Flagship.newVisitor({
    visitorId,
    hasConsented: true,
    context,
    isAuthenticated: authenticated
  })

  await visitor.fetchFlags()

  return visitor
}

export { flagshipLogStore }
