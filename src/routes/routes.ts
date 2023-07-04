import { getAllPoints } from '../controllers/pointsController';
import { getAllTrucks } from "../controllers/trucksController";
import {Router} from 'express';

const routes: Router = Router();

routes.get('/points', getAllPoints);
routes.get('/trucks', getAllTrucks);

export default routes;