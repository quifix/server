import express, { Request, Response } from 'express';
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

const app = express();
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
app.use('/api/csrf-token', jwtCheck, attachUser, csrfProtection, csrfRouter);
app.use('/api/bids', jwtCheck, attachUser, csrfProtection, bidsRouter);
app.use('/api/logout', jwtCheck, attachUser, logoutRouter);
app.use('/api/projects', jwtCheck, attachUser, csrfProtection, projectsRouter);
app.use('/api/users', jwtCheck, attachUser, csrfProtection, usersRouter);
app.use(notFound);
app.use(apiErrorHandler);

export default app;
