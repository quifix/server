import dotenv from 'dotenv';
dotenv.config();

import server from './server';

const port: string | undefined = process.env.PORT;

server.listen(port);

console.log(`
    🚀 Server is Running!
    🔉 Listening on port ${port}
    📭 API at http://localhost:${port}
`);
