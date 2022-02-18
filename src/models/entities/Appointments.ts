import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
class Appointments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  contract_id: number;

  @Column()
  module: string;

  @Column()
  client_id: number;

  @Column()
  date: Date;

  @Column()
  commodity_types_id: number;

  @Column()
  amount: number;

  @Column()
  team_id: number;

  @Column()
  doc_bl: string;

  @Column()
  doc_di: string;

  @Column()
  doc_container: string;

  @Column()
  obs: string;

  @Column()
  status_id: number;

  @Column()
  grid_index: number;

  @Column({
    nullable: true,
  })
  checker_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointments;
