import ISendTweetDto from '@modules/tweets/dtos/ISendTweetDto';
import ITweetsRepository from '@modules/tweets/repositories/ITweetsRepository';
import { getRepository, Repository } from 'typeorm';

import ServerError from '@shared/errors/ServerError';

import vader from 'vader-sentiment';

import { v4 } from 'uuid';
import IOpinion from '@modules/tweets/types/IOpinion';
import Tweet from '../entities/Tweet';

class TweetsRepository implements ITweetsRepository {
  private ormRepository: Repository<Tweet>;

  constructor() {
    this.ormRepository = getRepository(Tweet);
  }

  public async listUserOpinion(author: string): Promise<IOpinion> {
    const userTweets = await this.ormRepository.find({ where: { author } });

    let total = 0;

    if (!userTweets || userTweets.length <= 0) {
      throw new ServerError('No tweets found for this user.');
    }

    userTweets.forEach(tweet => {
      if (tweet.intensity) {
        total += tweet.intensity;
      }
    });

    const average = total / userTweets.length;

    const date = new Date();
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;

    let opinion: 'negative' | 'neutral' | 'positive';

    if (average <= -0.05) {
      opinion = 'negative';
    } else if (average > -0.05 && average < 0.05) {
      opinion = 'neutral';
    } else {
      opinion = 'positive';
    }

    return {
      opinion,
      date: formattedDate,
      avg: average,
    };
  }

  public async send({ author, link, text }: ISendTweetDto): Promise<Tweet> {
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);

    const tweet = this.ormRepository.create({
      id: v4(),
      author,
      link,
      text,
      intensity: intensity.compound,
    });

    await this.ormRepository.save(tweet);

    return tweet;
  }
}

export default TweetsRepository;
