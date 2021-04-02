import express, { Application, Request, Response } from 'express';
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
} from '../middleware';
import {
  authRouter,
  bidsRouter,
  csrfRouter,
  logoutRouter,
  projectsRouter,
  usersRouter
} from '../routes';

const app: Application = express();
const csrfProtection = csrf({ cookie: true });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.options('*', cors);
app.use(cors);
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/authenticate', authRouter);
app.use('/api/csrf-token', csrfProtection, csrfRouter);
app.use(jwtCheck);
app.use(attachUser);
app.use('/api/bids', csrfProtection, bidsRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/projects', csrfProtection, projectsRouter);
app.use('/api/users', csrfProtection, usersRouter);
app.use(notFound);
app.use(apiErrorHandler);

export default app;
