import { createLogger, format, Logger, transports } from 'winston';

const { combine, errors, json, timestamp } = format;

export function buildProdLogger(): Logger {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()]
  });
}
