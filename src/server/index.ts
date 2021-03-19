import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import {
  authRouter,
  csrfRouter,
  logoutRouter,
  projectsRouter,
  usersRouter
} from '../routes';
import { attachUser, requireAuth } from '../middlewares';

const server = express();
const csrfProtection = csrf({ cookie: true });

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(cookieParser());

// Routes
server.get(
  '/api',
  async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Hello World!' });
  }
);

server.use(attachUser);
server.use('/api/csrf-token', csrfProtection, csrfRouter);
server.use('/api/authenticate', authRouter);
server.use(requireAuth);
server.use('/api/logout', logoutRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/users', usersRouter);

export default server;
