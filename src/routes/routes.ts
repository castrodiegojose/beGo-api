import { getAllPointsController } from '../controllers/pointsController';
import { getAllTrucksController } from "../controllers/trucksController";
import { 
    createRouteController, 
    deleteRouteController, 
    getAllRoutesController, 
    getRouteByIdController,
    updateRouteController 
} from "../controllers/routesController";
import {Router} from 'express';
import { createOrderController, deleteOrderController, getAllOrdersController, updateOrderController } from '../controllers/ordersController';

const routes: Router = Router();

// points Router
routes.get('/points', getAllPointsController);
// trucks Router
routes.get('/trucks', getAllTrucksController);
// route Router
routes.get('/routes', getAllRoutesController);
routes.get('/route/:id', getRouteByIdController);
routes.post('/createRoute', createRouteController);
routes.put('/updateRoute/:id', updateRouteController);
routes.delete('/deleteRoute/:id', deleteRouteController)
// orders Router
routes.get('/orders', getAllOrdersController);
routes.post('/createOrder', createOrderController);
routes.put('/updateOrder/:id', updateOrderController);
routes.delete('/deleteOrder/:id', deleteOrderController);



export default routes;