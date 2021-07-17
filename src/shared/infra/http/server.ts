import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import ServerError from '../../errors/ServerError';

import '../typeorm';
import '../../container';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server running on 3333');
});
