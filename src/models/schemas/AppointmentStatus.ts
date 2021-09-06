import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('appointment_status')
class AppointmentStatus {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  contract_id: number;

  @Column()
  appointment_id: number;

  @Column()
  status_history: string;

  @Column()
  module: string;

  @Column()
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentStatus;
