import ISendTweetDto from '../dtos/ISendTweetDto';
import Tweet from '../infra/typeorm/entities/Tweet';
import IOpinion from '../types/IOpinion';

export default interface ITweetsRepository {
  send(data: ISendTweetDto): Promise<Tweet>;
  listUserOpinion(author: string): Promise<IOpinion>;
}
