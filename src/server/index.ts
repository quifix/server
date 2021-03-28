import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import helmet from 'helmet';
import morgan from 'morgan';

import { apiErrorHandler, attachUser, jwtCheck, notFound } from '../middleware';
import {
  authRouter,
  bidsRouter,
  csrfRouter,
  logoutRouter,
  projectsRouter,
  usersRouter
} from '../routes';

const server = express();
const csrfProtection = csrf({ cookie: true });

server.use(helmet());
server.use(express.json());
server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.get('/api', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

server.use('/api/authenticate', authRouter);
server.use('/api/csrf-token', csrfProtection, csrfRouter);
server.use('/api/bids', jwtCheck, attachUser, bidsRouter);
server.use('/api/logout', jwtCheck, attachUser, logoutRouter);
server.use('/api/projects', jwtCheck, attachUser, projectsRouter);
server.use('/api/users', jwtCheck, attachUser, usersRouter);
server.use(notFound);
server.use(apiErrorHandler);

export default server;
