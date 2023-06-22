import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categories {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
