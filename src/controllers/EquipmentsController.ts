/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { getConnection, getCustomRepository } from 'typeorm';

import CreateEquipmentService from '../services/CreateEquipmentService';
import EquipmentsRepository from '../repositories/EquipmentsRepository';
import RoomRepository from '../repositories/RoomsRepository';

export default class EquipmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);
    const equipments = await equipmentsRepository.find();

    return response.json(equipments);
  }

  public async showOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);
    const { id } = request.params;

    const equipment = await equipmentsRepository.findOne({
      where: { id },
    });
    return response.json(equipment);
  }

  public async showByTombo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);

    const { tombo } = request.params;

    const equipments = await equipmentsRepository.find({
      where: { tombo },
    });

    if (!equipments) {
      return response.status(400).json({ Error: 'Equipment not found.' });
    }

    return response.json(equipments);
  }

  public async showByRoom(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);
    const { roomId } = request.params;

    const equipments = await equipmentsRepository.find({
      where: { room_id: roomId },
    });
    return response.json(equipments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, tombo, room_id } = request.body;

    const createEquipment = new CreateEquipmentService();

    const equipment = await createEquipment.execute({
      name,
      tombo,
      room_id,
    });

    return response.json(equipment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);
    const roomsRepository = getCustomRepository(RoomRepository);

    const { id } = request.params;
    const { name, tombo, room_id } = request.body;

    const equipment = await equipmentsRepository.findOne({
      where: { id },
    });

    if (!equipment) {
      return response.status(400).json({ Error: 'Equipment not found.' });
    }

    const findEquipmentWithSameTombo = await equipmentsRepository.findByTombo(
      tombo,
    );

    if (findEquipmentWithSameTombo && findEquipmentWithSameTombo.id !== id) {
      return response.status(400).json({ Error: 'This tombo alread exists.' });
    }

    const findRoom = await roomsRepository.findOne({ where: { id: room_id } });
    if (!findRoom) {
      return response.status(400).json({ Error: 'This room does not exist.' });
    }

    const updatedEquipment = {
      id: equipment.id,
      name,
      tombo,
      room_id,
      created_at: equipment.created_at,
    };

    await equipmentsRepository.update(id, updatedEquipment);

    return response.json(updatedEquipment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);
    const { id } = request.params;

    const equipment = await equipmentsRepository.findOne({
      where: { id },
    });

    if (!equipment) {
      return response.status(400).json({ Error: 'Equipment not found.' });
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('equipments')
      .where('id = :id', { id })
      .execute();

    return response.status(204).send();
  }
}
