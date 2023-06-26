import { MinLength } from 'class-validator';
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

  @Column({
    type: 'varchar',
  })
  fullname: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column('text')
  gender: string;

  @Column()
  dateOfBirth: string;

  @OneToMany(() => Problems, (problem) => problem.user)
  problem: Problems[];

  @Column({ type: 'varchar', default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
