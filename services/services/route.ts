import { Router } from 'express'
import { createService, getAllServices, getServiceBySlug } from './controller'

const router = Router()

router.get('/get-services', getAllServices)
router.get('/get-services/:slug', getServiceBySlug)
router.post('/create', createService)

export default router
