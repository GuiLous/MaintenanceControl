/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Equipment from './Equipment';

@Entity('maintenances')
class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titleMaintenance: string;

  @Column()
  description: string;

  @Column()
  responsibleMaintenance: string;

  @Column()
  equipment_id: string;

  @ManyToOne(() => Equipment)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Maintenance;
