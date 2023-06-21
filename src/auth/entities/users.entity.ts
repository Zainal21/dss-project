import { Problems } from 'src/problems/problems.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column('text')
  gender: string;

  @Column()
  dateOfBirth: string;

  @OneToMany(() => Problems, (problem) => problem.user)
  problem: Problems[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
