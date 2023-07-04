import { getAllPoints } from '../controllers/pointsController';
import {Router} from 'express';

const routes: Router = Router();

routes.get('/points', getAllPoints);

export default routes;