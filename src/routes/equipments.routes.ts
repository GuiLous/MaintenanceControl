import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import EquipmentsController from '../controllers/EquipmentsController';

const equipmentsRouter = Router();
const equipmentsController = new EquipmentsController();

equipmentsRouter.use(ensureAuthenticated);

equipmentsRouter.get('/', equipmentsController.show);
equipmentsRouter.get('/equipment/:id', equipmentsController.showOne);
equipmentsRouter.get('/search/:tombo', equipmentsController.showByTombo);
equipmentsRouter.get('/room/:roomId', equipmentsController.showByRoom);

equipmentsRouter.post('/', equipmentsController.create);

equipmentsRouter.put('/update/:id', equipmentsController.update);

equipmentsRouter.delete('/delete/:id', equipmentsController.delete);

export default equipmentsRouter;
