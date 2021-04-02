import 'dotenv/config';

import server from './server';

const port: string | number = process.env.PORT || 8080;

server.listen(port);

console.log(`
    🚀 Server is Running!
    🔉 Listening on port ${port}
    📭 API @ http://localhost:${port}
`);
