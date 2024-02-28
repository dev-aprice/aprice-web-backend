import { Router } from 'express'
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeByID,
  updateEmployee,
} from './controller'

const router = Router()

router.get('/get-employee', getAllEmployees)
router.get('/get-employee/:employeeId', getEmployeeByID)
router.patch('/update-employee/:employeeId', updateEmployee)
router.post('/create-employee', createEmployee)
router.delete('/delete-employee/:employeeId', deleteEmployee)

export default router
