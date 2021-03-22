import express, { Request, Response } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { attachUser } from '../middlewares';
import {
  authRouter,
  bidsRouter,
  csrfRouter,
  projectsRouter,
  usersRouter
} from '../routes';

const server = express();
const csrfProtection = csrf({ cookie: true });

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.ISSUER_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(cookieParser());
server.use(auth(authConfig));

// Routes
server.get('/', (req: Request, res: Response): void =>
  res.redirect('/api/authenticate')
);

server.get(
  '/api',
  async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Hello World!' });
  }
);

server.use('/api/authenticate', authRouter);
server.use(requiresAuth());
server.use(attachUser);
server.use('/api/bids', bidsRouter);
server.use('/api/csrf-token', csrfProtection, csrfRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/users', usersRouter);

server.get(
  '/api/logout',
  async (req: Request, res: Response): Promise<void> => {
    const cookieOptions = { httpOnly: true, sameSite: true, secure: true };
    try {
      req.userID = null;
      res.clearCookie('qToken', cookieOptions);
      res.clearCookie('_csrf');
      res.redirect('/logout');
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while logging out. Please try again later!"
      });
    }
  }
);

export default server;
