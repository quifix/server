import { createLogger, format, Logger, transports } from 'winston';

const { colorize, combine, errors, printf, timestamp } = format;

export function buildDevLogger(): Logger {
  const logFormat = printf(({ level, message, stack, timestamp }) => {
    return `${timestamp} ${level} ${stack || message}`;
  });

  return createLogger({
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()]
  });
}
