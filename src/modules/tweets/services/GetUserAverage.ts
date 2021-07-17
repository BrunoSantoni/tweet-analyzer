import { inject, injectable } from 'tsyringe';
import ServerError from '@shared/errors/ServerError';
import ITweetsRepository from '../repositories/ITweetsRepository';
import IOpinion from '../types/IOpinion';

@injectable()
class GetUserAverage {
  constructor(
    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository,
  ) {}

  public async execute(author: string): Promise<IOpinion> {
    if (!author) {
      throw new ServerError('Author not found');
    }

    const userOpinion = await this.tweetsRepository.listUserOpinion(author);

    return userOpinion;
  }
}

export default GetUserAverage;
