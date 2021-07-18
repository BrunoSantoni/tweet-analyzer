import tweetsRouter from '@modules/tweets/infra/http/routes/tweets.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/opinion', tweetsRouter);

export default routes;
