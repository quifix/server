import dotenv from 'dotenv';
dotenv.config();

import server from './api';

const port: string | number | undefined = process.env.PORT || 8080;

server.listen(port);

console.log(`
    🚀 Server is Running!
    🔉 Listening on port ${port}
    📭 API at http://localhost:${port}
`);
