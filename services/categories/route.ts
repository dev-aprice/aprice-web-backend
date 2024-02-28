import { Router } from 'express'
import { createCategory, getAllCategories } from './controller'

const router = Router()

router.post('/create-category', createCategory)
router.get('/get-all-categories', getAllCategories)

export default router
