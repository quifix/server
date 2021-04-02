import { Logger } from 'winston';
import { buildDevLogger } from './devlogger';
import { buildProdLogger } from './prodLogger';

const logger: Logger =
  process.env.NODE_ENV === 'development' ? buildDevLogger() : buildProdLogger();

export default logger;
