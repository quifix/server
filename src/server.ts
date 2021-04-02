import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import helmet from 'helmet';
import morgan from 'morgan';

import {
  apiErrorHandler,
  attachUser,
  cors,
  jwtCheck,
  notFound
} from './middleware';
import {
  authRouter,
  baseRouter,
  bidsRouter,
  csrfRouter,
  logoutRouter,
  projectsRouter,
  usersRouter
} from './routes';

const app: Application = express();

// Set CSRF double cookie pattern protection against CSRF attacks.
const csrfProtection = csrf({ cookie: true });

// Set basic express settings
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.options('*', cors);
app.use(cors);

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// APIs
app.use('/', baseRouter);
app.use('/api/authenticate', authRouter);
app.use('/api/csrf-token', csrfProtection, csrfRouter);
app.use('/api/bids', jwtCheck, attachUser, csrfProtection, bidsRouter);
app.use('/api/logout', jwtCheck, attachUser, logoutRouter);
app.use('/api/projects', jwtCheck, attachUser, csrfProtection, projectsRouter);
app.use('/api/users', jwtCheck, attachUser, csrfProtection, usersRouter);

// APIs errors
app.use(notFound);
app.use(apiErrorHandler);

export default app;
