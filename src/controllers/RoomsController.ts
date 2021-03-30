import { Request, Response } from 'express';
import { getConnection, getCustomRepository } from 'typeorm';

import CreateRoomService from '../services/CreateRoomService';

import RoomsRepository from '../repositories/RoomsRepository';

export default class RoomsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const roomsRepository = getCustomRepository(RoomsRepository);
    const rooms = await roomsRepository.find();

    return response.json(rooms);
  }

  public async showOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const roomsRepository = getCustomRepository(RoomsRepository);
    const { id } = request.params;

    const room = await roomsRepository.findOne({
      where: { id },
    });
    return response.json(room);
  }

  public async showByName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const roomsRepository = getCustomRepository(RoomsRepository);

    const { name } = request.params;

    const rooms = await roomsRepository.find({
      where: { name },
    });

    if (!rooms) {
      return response.status(400).json({ Error: 'Room not found.' });
    }

    return response.json(rooms);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createRoom = new CreateRoomService();

    const room = await createRoom.execute({
      name,
    });

    return response.json(room);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const roomsRepository = getCustomRepository(RoomsRepository);
    const { id } = request.params;

    const { name } = request.body;

    const room = await roomsRepository.findOne({
      where: { id },
    });

    if (!room) {
      return response.status(400).json({ Error: 'Room not found.' });
    }

    const updatedRoom = {
      id,
      name,
      created_at: room.created_at,
    };

    await roomsRepository.update(id, updatedRoom);

    return response.json(updatedRoom);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const roomsRepository = getCustomRepository(RoomsRepository);
    const { id } = request.params;

    const room = await roomsRepository.findOne({
      where: { id },
    });

    if (!room) {
      return response.status(400).json({ Error: 'Equipment not found.' });
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('rooms')
      .where('id = :id', { id })
      .execute();

    return response.status(204).send();
  }
}
