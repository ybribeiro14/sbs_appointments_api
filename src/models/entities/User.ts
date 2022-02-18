import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  contract_id: number;

  @Column()
  spawn_module: boolean;

  @Column()
  loading_module: boolean;

  @Column()
  inventory_module: boolean;

  @Column()
  painel_adm: boolean;

  @Column()
  checker: boolean;

  @Column()
  concierge: boolean;

  @Column()
  supervisor: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Users;
