import { Users } from 'src/auth/entities/users.entity';
import { Categories } from 'src/categories/categories.entity';
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

  @ManyToOne(() => Users, (user) => user.problem, {
    cascade: ['update'],
  })
  user: Users;

  @OneToMany(() => Classifications, (classification) => classification.problem)
  clasification: Classifications[];

  @ManyToOne(() => Categories, (categories) => categories.problems, {
    cascade: ['update'],
  })
  category: Categories;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
