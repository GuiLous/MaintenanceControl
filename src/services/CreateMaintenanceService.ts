/* eslint-disable camelcase */
import { getCustomRepository, getRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import AppError from '../err/AppError';

import Maintenance from '../models/Maintenance';
import EquipmentRepository from '../repositories/EquipmentsRepository';

interface Request {
  titleMaintenance: string;
  description: string;
  responsibleMaintenance: string;
  tombo: string;
  date: Date;
}

class CreateMaintenanceService {
  public async execute({
    titleMaintenance,
    description,
    responsibleMaintenance,
    tombo,
    date,
  }: Request): Promise<Maintenance> {
    const maintenancesRepository = getRepository(Maintenance);
    const equipmentsRepository = getCustomRepository(EquipmentRepository);

    const maintenanceDate = startOfHour(date);

    const findEquipment = await equipmentsRepository.findByTombo(tombo);
    if (!findEquipment) {
      throw new AppError('This equipment does not exist.');
    }

    const maintenance = maintenancesRepository.create({
      titleMaintenance,
      description,
      responsibleMaintenance,
      equipment_id: findEquipment.id,
      date: maintenanceDate,
    });

    await maintenancesRepository.save(maintenance);

    return maintenance;
  }
}

export default CreateMaintenanceService;
