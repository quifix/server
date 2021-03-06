/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cors from 'cors';
import statusCodes from 'http-status-codes';

const { OK } = statusCodes;

const whiteList: Set<string> = new Set(['http://localhost:3000']);

export default cors({
  optionsSuccessStatus: OK,
  credentials: true,
  origin: (origin: string | undefined, cb) => {
    if (whiteList.has(origin!)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  }
});
