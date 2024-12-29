import express from 'express';
import Router from './src/Routes/auth.routes.js';
import dotenv from 'dotenv';
import { connectdb } from './src/lib/db.js';
import cors from 'cors';
import MasterRouter from './src/Routes/master.route.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow credentials (cookies, headers)
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
