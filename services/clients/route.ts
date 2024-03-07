import { Router } from 'express'
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from './controller'

const router = Router()

router.get('/get-all-clients', getAllClients)
router.post('/create-client', createClient)
router.delete('/delete-client/:id', deleteClient)
router.put('/update-client/:id', updateClient)

export default router
