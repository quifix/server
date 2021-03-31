import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export const jwtCheck = jwt({
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
