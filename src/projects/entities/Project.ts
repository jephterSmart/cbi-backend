import { Image } from './Image';
import { TakeAway } from './TakeAway';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext')
  content: string;

  @OneToMany(() => TakeAway, (takeAway) => takeAway.project)
  takeAways: TakeAway[];

  @OneToMany(() => Image, (image) => image.project)
  images: Image[];
}
