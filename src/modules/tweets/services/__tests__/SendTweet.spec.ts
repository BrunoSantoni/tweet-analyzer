import FakeTweetsRepository from '@modules/tweets/repositories/fakes/FakeTweetsRepository';

import ServerError from '@shared/errors/ServerError';
import SendTweet from '../SendTweet';

let fakeTweetsRepository: FakeTweetsRepository;
let sendTweet: SendTweet;

describe('Send Tweet Service', () => {
  beforeEach(() => {
    fakeTweetsRepository = new FakeTweetsRepository();
    sendTweet = new SendTweet(fakeTweetsRepository);
  });

  it('should be able to send a tweet', async () => {
    const tweet = await sendTweet.execute({
      author: 'michael_saylor',
      text: 'Beginning is easy, continuing is hard. -Japanese proverb on #Bitcoin',
      link: 'https://twitter.com/michael_saylor/status/1406936342664290307',
    });

    expect(tweet).toHaveProperty('id');
    expect(tweet.intensity).toBeTruthy();
  });

  it('should not be able to send a tweet if author name is not provided', async () => {
    await expect(
      sendTweet.execute({
        author: undefined,
        text: 'Beginning is easy, continuing is hard. -Japanese proverb on #Bitcoin',
        link: 'https://twitter.com/michael_saylor/status/1406936342664290307',
      }),
    ).rejects.toBeInstanceOf(ServerError);
  });

  it('should not be able to send a tweet when the fields are non-string', async () => {
    await expect(
      sendTweet.execute({
        author: 1,
        text: 'Beginning is easy, continuing is hard. -Japanese proverb on #Bitcoin',
        link: 'https://twitter.com/michael_saylor/status/1406936342664290307',
      }),
    ).rejects.toBeInstanceOf(ServerError);
  });
});
