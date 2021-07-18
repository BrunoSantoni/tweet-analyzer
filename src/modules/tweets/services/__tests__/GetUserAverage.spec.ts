import FakeTweetsRepository from '@modules/tweets/repositories/fakes/FakeTweetsRepository';

import ServerError from '@shared/errors/ServerError';
import GetUserAverage from '../GetUserAverage';
import SendTweet from '../SendTweet';

let fakeTweetsRepository: FakeTweetsRepository;
let getUserAverage: GetUserAverage;
let sendTweet: SendTweet;

describe('Send Tweet Service', () => {
  beforeEach(() => {
    fakeTweetsRepository = new FakeTweetsRepository();
    getUserAverage = new GetUserAverage(fakeTweetsRepository);
    sendTweet = new SendTweet(fakeTweetsRepository);
  });

  it('should be able to get a user average opinion', async () => {
    // Primeiro é necessário criar um tweet antes de pegar as opiniões
    await sendTweet.execute({
      author: 'michael_saylor',
      text: 'Beginning is easy, continuing is hard. -Japanese proverb on #Bitcoin',
      link: 'https://twitter.com/michael_saylor/status/1406936342664290307',
    });

    const userOpinions = await getUserAverage.execute('michael_saylor');

    expect(userOpinions).toHaveProperty('opinion');
    expect(userOpinions).toHaveProperty('date');
    expect(userOpinions).toHaveProperty('avg');
  });

  it('should not be able to get a user average opinion without passing the authors name', async () => {
    await expect(getUserAverage.execute('')).rejects.toBeInstanceOf(
      ServerError,
    );
  });

  it('should not be able to get a user average opinion if the author hasnt made any tweets', async () => {
    await expect(
      getUserAverage.execute('brunooooooooooooo'),
    ).rejects.toBeInstanceOf(ServerError);
  });
});
