/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import AppError from '../err/AppError';

import EquipmentRepository from '../repositories/EquipmentsRepository';
import RoomRepository from '../repositories/RoomsRepository';

import Equipment from '../models/Equipment';

interface Request {
  name: string;
  tombo: string;
  room_id: string;
}

class CreateEquipmentService {
  public async execute({ name, tombo, room_id }: Request): Promise<Equipment> {
    const equipmentsRepository = getCustomRepository(EquipmentRepository);
    const roomsRepository = getCustomRepository(RoomRepository);

    const findEquipmentWithSameTombo = await equipmentsRepository.findByTombo(
      tombo,
    );

    if (findEquipmentWithSameTombo) {
      throw new AppError('This tombo alread exist.');
    }

    const findRoom = await roomsRepository.findOne({ where: { id: room_id } });

    if (!findRoom) {
      throw new AppError('This room does not exist.');
    }

    const equipment = equipmentsRepository.create({
      name,
      tombo,
      room_id,
    });

    await equipmentsRepository.save(equipment);

    return equipment;
  }
}

export default CreateEquipmentService;
