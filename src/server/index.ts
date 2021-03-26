import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import helmet from 'helmet';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import morgan from 'morgan';
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
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI || ''
  }),
  audience: process.env.AUTH0_AUDIENCE || '',
  issuer: process.env.AUTH0_ISSUER || '',
  algorithms: ['RS256'],
  getToken: req => req.cookies._token
});

server.use(express.json());
server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
server.use(helmet());
server.use(morgan('dev'));
server.use(cookieParser());

// Routes
server.get(
  '/api',
  async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Hello World!' });
  }
);

server.use('/api/csrf-token', csrfProtection, csrfRouter);

server.use(attachUser);
server.use('/api/authenticate', authRouter);
server.post(
  '/api/logout',
  async (req: Request, res: Response): Promise<void> => {
    const cookieOptions = { httpOnly: true, sameSite: true, secure: true };
    try {
      req.userID = null;
      res.clearCookie('_token', cookieOptions);
      res.clearCookie('_csrf');
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while logging out. Please try again later!"
      });
    }
  }
);
server.use(jwtCheck);
server.use('/api/bids', bidsRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/users', usersRouter);

export default server;
