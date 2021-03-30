import { Router } from 'express';

import equipmentsRouter from './equipments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import roomsRouter from './rooms.routes';
import maintenancesRouter from './maintenances.routes';

const routes = Router();

routes.use('/equipments', equipmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/rooms', roomsRouter);
routes.use('/maintenances', maintenancesRouter);

export default routes;
