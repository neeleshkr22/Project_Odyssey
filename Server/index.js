import express from 'express';
import Router from './src/Routes/auth.routes.js';
import dotenv from 'dotenv';
import { connectdb } from './src/lib/db.js';
import cors from 'cors';
import MasterRouter from './src/Routes/master.route.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Same as above
  'https://d717-103-80-22-106.ngrok-free.app',
  'https://9d8576732c841c3cd9da67b01a3f41b8.serveo.net',
  'https://cf0a9e38978e52f79c566474d97c340b.serveo.net'
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies if needed
})); 

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(Router);
app.use(MasterRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
  connectdb();
});
