import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    default: false,
  })
  isConfirmed: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: '', nullable: true })
  middleName?: string;

  get fullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
