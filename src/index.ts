import * as dotEnv from 'dotenv';
import * as http from 'http';
import compression from 'compression'; // Compresses requests
import cors from 'cors';
import defaultRoute from '@/routes/DefaultRoute';
import express from 'express';
import helmet from 'helmet';
import { ChatRoute } from '@/routes/Chat';

const defaultPort = 3000;
dotEnv.config();

const app = express();
const port = process.env.PORT == null ? defaultPort : process.env.PORT;
const host = process.env.HOST == null ? '0.0.0.0' : process.env.HOST;
const allowedOrigins = ['http://localhost'];

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: allowedOrigins,
  })
);

app.get('/', defaultRoute);
app.post('/chat', ChatRoute);

const server = http.createServer(app);

server.listen(port as number, host, () => {
  console.log(`
🚀 Server ready at: http://${host}:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`);
});

export default server;
