import tweetsRouter from '@modules/tweets/infra/http/routes/tweets.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/', tweetsRouter);

export default routes;
