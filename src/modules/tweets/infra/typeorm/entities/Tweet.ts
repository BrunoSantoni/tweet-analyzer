import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('tweets')
class Tweet {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  author: string;

  @Column()
  text: string;

  @Column()
  link: string;

  @Column()
  intensity: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Tweet;
