import { Router } from 'express';

import TweetsController from '../controllers/TweetsController';

const tweetsRouter = Router();
const tweetsController = new TweetsController();

tweetsRouter.get('/:author', tweetsController.list);
tweetsRouter.post('/', tweetsController.send);

export default tweetsRouter;
