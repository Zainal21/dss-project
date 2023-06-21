import { Users } from 'src/auth/entities/users.entity';
import { Problems } from 'src/problems/problems.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm';

@Entity()
export class Classifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  classificationName: string;

  @ManyToOne(() => Users, (user) => user.problem)
  user: Users;

  @ManyToOne(() => Problems, (problem) => problem.clasification)
  problem: Problems;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
