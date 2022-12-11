import { Project } from './Project';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true, type: 'text' })
  caption?: string;

  @ManyToOne(() => Project, (project) => project.images)
  project: Project;
}
