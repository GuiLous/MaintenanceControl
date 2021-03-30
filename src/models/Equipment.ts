/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  // OneToMany,
} from 'typeorm';

// import Maintenance from './Maintenance';
import Room from './Room';

@Entity('equipments')
class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tombo: string;

  @Column()
  room_id: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  // @OneToMany(() => Maintenance, maintenance => maintenance.equipment)
  // // @JoinColumn({ name: 'id' })
  // maintenances: Maintenance[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Equipment;
