import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RoomsController from '../controllers/RoomsController';

const roomsRouter = Router();
const roomsController = new RoomsController();

roomsRouter.use(ensureAuthenticated);

roomsRouter.get('/', roomsController.show);
roomsRouter.get('/room/:id', roomsController.showOne);
roomsRouter.get('/search/:name', roomsController.showByName);

roomsRouter.post('/', roomsController.create);

roomsRouter.put('/update/:id', roomsController.update);

roomsRouter.delete('/delete/:id', roomsController.delete);

export default roomsRouter;
