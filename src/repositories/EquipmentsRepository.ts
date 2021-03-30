import { EntityRepository, Repository } from 'typeorm';

import Equipment from '../models/Equipment';

@EntityRepository(Equipment)
class EquipmentRepository extends Repository<Equipment> {
  public async findByTombo(tombo: string): Promise<Equipment | null> {
    const findEquipment = await this.findOne({
      where: { tombo },
    });

    return findEquipment || null;
  }
}

export default EquipmentRepository;
