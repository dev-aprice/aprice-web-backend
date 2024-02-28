import { Router } from 'express'
import {
  createNews,
  getAllNews,
  getNewBySlug,
  getLimitNews,
} from './controller'

const router = Router()

router.post('/create', createNews)
router.get('/get-all-news', getAllNews)
router.get('/get-news/:limit', getLimitNews)
router.get('/get-new-by-slug/:slug', getNewBySlug)

export default router
