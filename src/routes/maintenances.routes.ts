import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import MaintenancesController from '../controllers/MaintenancesController';

const maintenancesRouter = Router();
const maintenancesController = new MaintenancesController();

maintenancesRouter.use(ensureAuthenticated);

maintenancesRouter.get('/', maintenancesController.show);
maintenancesRouter.get('/maintenance/:id', maintenancesController.showOne);
maintenancesRouter.get('/search/:tombo', maintenancesController.showByTombo);
maintenancesRouter.get(
  '/equipment/:equipmentId',
  maintenancesController.showByEquipment,
);

maintenancesRouter.post('/', maintenancesController.create);

maintenancesRouter.put('/update/:id', maintenancesController.update);

maintenancesRouter.delete('/delete/:id', maintenancesController.delete);

export default maintenancesRouter;
