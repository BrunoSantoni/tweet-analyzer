import { inject, injectable } from 'tsyringe';
import ServerError from '@shared/errors/ServerError';
import ISendTweetDto from '../dtos/ISendTweetDto';
import Tweet from '../infra/typeorm/entities/Tweet';
import ITweetsRepository from '../repositories/ITweetsRepository';

@injectable()
class SendTweet {
  constructor(
    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository,
  ) {}

  public async execute({ author, text, link }: ISendTweetDto): Promise<Tweet> {
    if (!author || !text || !link) {
      throw new ServerError('All fields must be filled');
    }

    if (
      typeof author !== 'string' ||
      typeof text !== 'string' ||
      typeof link !== 'string'
    ) {
      throw new ServerError('All fields must be type string');
    }

    const tweet = await this.tweetsRepository.send({
      author,
      text,
      link,
    });

    return tweet;
  }
}

export default SendTweet;
