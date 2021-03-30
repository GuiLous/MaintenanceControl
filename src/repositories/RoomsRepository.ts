import { EntityRepository, Repository } from 'typeorm';

import Room from '../models/Room';

@EntityRepository(Room)
class RoomRepository extends Repository<Room> {
  public async findByName(name: string): Promise<Room | null> {
    const findRoom = await this.findOne({
      where: { name },
    });

    return findRoom || null;
  }
}

export default RoomRepository;
