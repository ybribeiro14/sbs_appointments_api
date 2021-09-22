import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';

import cors from 'cors';

import 'express-async-errors';
// import uploadConfig from '@config/upload';
import AppError from './errors/AppError';
import routes from './routes';

import './database/index';
import './container';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

export { serverHttp, io };
