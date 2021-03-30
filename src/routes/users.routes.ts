import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.show);
usersRouter.get('/user/:id', usersController.showOne);
usersRouter.post('/', usersController.create);
usersRouter.put('/update/:id', usersController.update);
usersRouter.delete('/delete/:id', usersController.delete);
export default usersRouter;
