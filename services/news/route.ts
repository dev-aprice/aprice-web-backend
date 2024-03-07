import { Router } from 'express'
import {
  createNews,
  getAllNews,
  getNewBySlug,
  getLimitNews,
  deleteNew,
} from './controller'

const router = Router()

// router.patch('/update-new/:id', updateNews)
router.post('/create/:id?', createNews)
router.get('/get-all-news', getAllNews)
router.get('/get-news/:limit', getLimitNews)
router.get('/get-new-by-slug/:slug', getNewBySlug)
router.delete('/delete-new/:slug', deleteNew)

export default router
