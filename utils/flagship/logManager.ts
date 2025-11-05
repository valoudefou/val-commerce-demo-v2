import { LogLevel } from '@flagship.io/js-sdk'

import type { FlagshipLogEntry, FlagshipLogLevel } from '@/utils/flagship/logStore'
import { flagshipLogStore } from '@/utils/flagship/logStore'

const resolveLevelName = (level: LogLevel): FlagshipLogLevel => {
  const value = (typeof level === 'number' ? LogLevel[level] : level) as FlagshipLogLevel | undefined
  return value ?? 'INFO'
}

const nowLabel = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

const consoleMethodFor = (level: FlagshipLogLevel) => {
  switch (level) {
    case 'EMERGENCY':
    case 'ALERT':
    case 'CRITICAL':
    case 'ERROR':
      return 'error'
    case 'WARNING':
      return 'warn'
    case 'NOTICE':
    case 'INFO':
      return 'info'
    case 'DEBUG':
    default:
      return 'debug'
  }
}

const pushLog = (level: LogLevel, message: unknown, tag: string | undefined, context: unknown[]) => {
  const levelName = resolveLevelName(level)
  const timestamp = nowLabel()

  const logEntry: FlagshipLogEntry = {
    timestamp,
    level: levelName,
    message,
    tag
  }

  if (context.length > 0) {
    logEntry.details = context.length === 1 ? context[0] : context
  }

  flagshipLogStore.addLog(logEntry)

  const method = consoleMethodFor(levelName)
  const prefix = `[${timestamp}] [${levelName}] [${tag ?? 'flagship'}]`
  console[method](prefix, message, ...context)
}

export const flagshipLogManager = {
  emergency(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.EMERGENCY, message, tag, context)
  },
  alert(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.ALERT, message, tag, context)
  },
  critical(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.CRITICAL, message, tag, context)
  },
  error(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.ERROR, message, tag, context)
  },
  warning(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.WARNING, message, tag, context)
  },
  notice(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.NOTICE, message, tag, context)
  },
  info(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.INFO, message, tag, context)
  },
  debug(message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(LogLevel.DEBUG, message, tag, context)
  },
  log(level: LogLevel, message: unknown, tag?: string, ...context: unknown[]) {
    pushLog(level, message, tag, context)
  }
}
