import GetUserAverage from '@modules/tweets/services/GetUserAverage';
import SendTweet from '@modules/tweets/services/SendTweet';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class TweetsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { author } = req.params;

    const getUserAverage = container.resolve(GetUserAverage);

    const userOpinion = await getUserAverage.execute(author);

    return res.json(userOpinion);
  }

  public async send(req: Request, res: Response): Promise<Response> {
    const { author, text, link } = req.body;

    const sendTweet = container.resolve(SendTweet);

    const tweet = await sendTweet.execute({ author, text, link });

    return res.json(classToClass(tweet));
  }
}

export default TweetsController;
