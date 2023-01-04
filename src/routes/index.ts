import { Router } from 'express';
import Routes from './api/users.routes';

const routes = Router();

routes.use('/users', Routes);

export default routes;
