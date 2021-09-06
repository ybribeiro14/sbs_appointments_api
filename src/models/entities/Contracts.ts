import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contracts')
class Contracts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contract: string;

  @Column()
  client: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Contracts;
