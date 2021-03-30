import { getCustomRepository } from 'typeorm';

import AppError from '../err/AppError';

import Room from '../models/Room';
import RoomsRepository from '../repositories/RoomsRepository';

interface Request {
  name: string;
}

class CreateRoomService {
  public async execute({ name }: Request): Promise<Room> {
    const roomsRepository = getCustomRepository(RoomsRepository);

    const checkRoomExists = await roomsRepository.findByName(name);

    if (checkRoomExists) {
      throw new AppError('Room is already been created.');
    }

    const room = roomsRepository.create({
      name,
    });

    await roomsRepository.save(room);

    return room;
  }
}

export default CreateRoomService;
