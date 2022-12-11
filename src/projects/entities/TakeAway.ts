import { Project } from './Project';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('take_aways')
export class TakeAway {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  @ManyToOne(() => Project, (project) => project.takeAways)
  project: Project;
}
