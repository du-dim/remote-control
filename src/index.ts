import { httpServer } from './http_server/index.js';

const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
import './ws_server/index.js';
