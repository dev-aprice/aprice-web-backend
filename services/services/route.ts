import { Router } from 'express'
import {
  createService,
  deleteServices,
  getAllServices,
  getServiceBySlug,
  updateService,
} from './controller'

const router = Router()

router.get('/get-services', getAllServices)
router.get('/get-services/:slug', getServiceBySlug)
router.post('/create', createService)
router.put('/update', updateService)
router.delete('/delete-services/:slug', deleteServices)

export default router
