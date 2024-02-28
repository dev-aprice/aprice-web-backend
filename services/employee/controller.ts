import { Request, Response } from 'express'
import Employee from './model'
import SocialMedia from '../social-media/model'
import {
  createSocialMedia,
  destroySocialMediaByEmployeeId,
  updateSocialMedia,
} from '../social-media/controller'
import { IEmployeeInstance } from './interfaces'
import Role from '../role/model'

export const getAllEmployees = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: SocialMedia,
          required: false,
        },
        {
          model: Role,
          required: false,
        },
      ],
    })
    res.status(200).json(employees)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}

export const getEmployeeByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params

    const employee = await Employee.findByPk(employeeId, {
      include: [
        {
          model: SocialMedia,
          required: false,
        },
      ],
    })

    if (!employee) {
      res.status(404).json({
        msg: 'Employee not found',
      })
    }

    res.status(200).json(employee)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      })
    } else {
      res.status(500).json({
        msg: 'An unexpected error occurred',
      })
    }
  }
}

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { social_media, ...employeeData } = req.body
    const newEmployee = (await Employee.create(
      employeeData
    )) as IEmployeeInstance

    if (social_media && social_media.length > 0) {
      await createSocialMedia(social_media, newEmployee.id!)
    }

    res.status(201).json(newEmployee)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      res.status(500).json({
        msg: error.message,
      })
    } else {
      res.status(500).json({
        msg: 'An unexpected error occurred',
      })
    }
  }
}

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params
    const employeeIdAsNumber = +employeeId
    const { socialMedia, ...employeeData } = req.body

    const employee = await Employee.findByPk(employeeId)

    if (!employee) {
      res.status(404).json({
        msg: 'Empleado no encontrado',
      })
      return
    }

    await Employee.update(employeeData, {
      where: {
        id: employeeIdAsNumber,
      },
    })

    if (socialMedia && socialMedia.length > 0) {
      await updateSocialMedia(socialMedia, employeeIdAsNumber)
    }

    const updatedEmployee = await Employee.findByPk(employeeIdAsNumber, {
      include: [
        {
          model: SocialMedia,
          required: false,
        },
      ],
    })

    res.status(200).json(updatedEmployee)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      })
    } else {
      res.status(500).json({
        msg: 'An unexpected error occurred',
      })
    }
  }
}

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params
    const employeeIdAsNumber = +employeeId

    await destroySocialMediaByEmployeeId(employeeIdAsNumber)

    const deleted = await Employee.destroy({
      where: { id: employeeIdAsNumber },
    })

    if (deleted) {
      res.status(200).send(`Employee with ID ${employeeId} deleted.`)
    } else {
      res.status(404).send('Employee not found')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message })
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
