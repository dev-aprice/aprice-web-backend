import { Router } from 'express'
import {
  createPartner,
  deletePartner,
  getAllPartners,
  updatePartner,
} from './controller'

const router = Router()

router.get('/get-partners', getAllPartners)
router.post('/create-partner', createPartner)
router.delete('/delete-partner/:partnerId', deletePartner)
router.patch('/update-partner/:partnerId', updatePartner)

export default router
