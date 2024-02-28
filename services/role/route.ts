import { Router } from 'express'
import { getAllRoles } from './controller'

const router = Router()

router.get('/get-roles', getAllRoles)

export default router
