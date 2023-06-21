import { Users } from 'src/auth/entities/users.entity';
import { Classifications } from 'src/classifications/classifications.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Problems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  problemName: string;

  @ManyToOne(() => Users, (user) => user.problem)
  user: Users;

  @OneToMany(() => Classifications, (classification) => classification.problem)
  clasification: Classifications[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
