import { Router } from 'express';
import * as controllers from '../../controllers/User.controller';

const routes = Router();

routes.post('/', controllers.create);
routes.put('/:id', controllers.update);

routes.get('/:id', controllers.GetUser);
routes.get('/', controllers.GetAllUsers);

routes.delete('/:id', controllers.Delete);
routes.delete('/', controllers.DeleteAllUsers);
export default routes;
