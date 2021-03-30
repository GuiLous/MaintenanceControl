/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';

import { parseISO } from 'date-fns';
import CreateMaintenanceService from '../services/CreateMaintenanceService';

import Maintenance from '../models/Maintenance';
import EquipmentsRepository from '../repositories/EquipmentsRepository';
// import Equipment from '../models/Equipment';

export default class EquipmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const maintenancesRepository = getRepository(Maintenance);
    const maintenances = await maintenancesRepository.find();
    return response.json(maintenances);
  }

  public async showOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const maintenancesRepository = getRepository(Maintenance);
    const { id } = request.params;

    const maintenance = await maintenancesRepository.findOne({
      where: { id },
    });
    return response.json(maintenance);
  }

  public async showByTombo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const maintenancesRepository = getRepository(Maintenance);
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);

    const { tombo } = request.params;

    const equipment = await equipmentsRepository.findOne({
      where: { tombo },
    });

    if (!equipment) {
      return response.status(400).json({ Error: 'Maintenance not found.' });
    }

    const maintenances = await maintenancesRepository.find({
      where: { equipment_id: equipment?.id },
    });

    if (!maintenances) {
      return response.status(400).json({ Error: 'Maintenance not found.' });
    }

    return response.json(maintenances);
  }

  public async showByEquipment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const maintenancesRepository = getRepository(Maintenance);
    const { equipmentId } = request.params;

    const maintenances = await maintenancesRepository.find({
      where: { equipment_id: equipmentId },
    });

    // if (!maintenances) {
    //   return response.status(400).json({ Error: 'Maintenance not found.' });
    // }

    return response.json(maintenances);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      titleMaintenance,
      description,
      responsibleMaintenance,
      tombo,
      date,
    } = request.body;

    const parsedDate = parseISO(date);

    const createMaintenance = new CreateMaintenanceService();

    const maintenance = await createMaintenance.execute({
      titleMaintenance,
      description,
      responsibleMaintenance,
      tombo,
      date: parsedDate,
    });

    return response.json(maintenance);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const maintenancesRepository = getRepository(Maintenance);
    const equipmentsRepository = getCustomRepository(EquipmentsRepository);

    const { id } = request.params;

    const {
      titleMaintenance,
      description,
      responsibleMaintenance,
      tombo,
      date,
    } = request.body;

    const maintenance = await maintenancesRepository.findOne({
      where: { id },
    });

    if (!maintenance) {
      return response.status(400).json({ Error: 'Maintenance not found.' });
    }

    const findEquipment = await equipmentsRepository.findByTombo(tombo);
    if (!findEquipment) {
      return response.status(400).json({ Error: 'Equipment does not exists.' });
    }

    const updatedMaintenance = {
      id,
      titleMaintenance,
      description,
      responsibleMaintenance,
      equipment_id: findEquipment.id,
      date,
      created_at: maintenance.created_at,
    };

    await maintenancesRepository.update(id, updatedMaintenance);

    return response.json(updatedMaintenance);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const maintenancesRepository = getRepository(Maintenance);
    const { id } = request.params;

    const maintenance = await maintenancesRepository.findOne({
      where: { id },
    });

    if (!maintenance) {
      return response.status(400).json({ Error: 'Maintenance not found.' });
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('maintenances')
      .where('id = :id', { id })
      .execute();

    return response.status(204).send();
  }
}
