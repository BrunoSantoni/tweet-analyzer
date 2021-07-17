import { container } from 'tsyringe';

import TweetsRepository from '@modules/tweets/infra/typeorm/repositories/TweetsRepository';
import ITweetsRepository from '@modules/tweets/repositories/ITweetsRepository';

container.registerSingleton<ITweetsRepository>(
  'TweetsRepository',
  TweetsRepository,
);
