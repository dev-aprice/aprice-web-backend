import { Router } from 'express'
import employeeRoutes from '../../services/employee/route'
import rolesRoutes from '../../services/role/route'
import categoriesRoutes from '../../services/categories/route'
import newsRoutes from '../../services/news/route'
import servicesRoutes from '../../services/services/route'
import partnersRoutes from '../../services/partners/route'
import clientsRoutes from '../../services/clients/route'

const router = Router()

router.use('/employees', employeeRoutes)
router.use('/roles', rolesRoutes)
router.use('/categories', categoriesRoutes)
router.use('/news', newsRoutes)
router.use('/services', servicesRoutes)
router.use('/partners', partnersRoutes)
router.use('/clients', clientsRoutes)

export default router
