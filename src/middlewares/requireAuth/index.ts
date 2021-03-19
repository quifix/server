import jwks from 'jwks-rsa';
import jwt, { RequestHandler } from 'express-jwt';

export const requireAuth: RequestHandler = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: ''
  }),
  audience: '',
  issuer: '',
  algorithms: ['RS256']
});
