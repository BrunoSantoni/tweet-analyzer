import Tweet from '@modules/tweets/infra/typeorm/entities/Tweet';
import ISendTweetDto from '@modules/tweets/dtos/ISendTweetDto';
import vader from 'vader-sentiment';
import { v4 } from 'uuid';
import IOpinion from '@modules/tweets/types/IOpinion';
import ServerError from '@shared/errors/ServerError';
import ITweetsRepository from '../ITweetsRepository';

class FakeTweetsRepository implements ITweetsRepository {
  private tweets: Tweet[] = [];

  public async listUserOpinion(author: string): Promise<IOpinion> {
    const userTweets = this.tweets.filter(tweet => tweet.author === author);

    if (!userTweets || userTweets.length <= 0) {
      throw new ServerError('No tweets found for this user.');
    }

    const total = userTweets
      .map(tweet => tweet.intensity)
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);

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

    const date = new Date();

    const tweet = new Tweet();

    Object.assign(tweet, {
      id: v4(),
      author,
      link,
      text,
      intensity: intensity.compound,
      createdAt: date,
      updatedAt: date,
    });

    this.tweets.push(tweet);

    return tweet;
  }
}

export default FakeTweetsRepository;
