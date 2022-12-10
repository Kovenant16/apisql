import { Router } from 'express'
import { 
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    getTask,
getPedidos} from '../controllers/tasks.controllers.js'

const router = Router();


router.get('/tasks', getTasks);

router.get('/pedidos', getPedidos)

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);





export default router;