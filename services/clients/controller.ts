import { Request, Response } from 'express'
import Client from './model'
import { IClientAttributes } from './interface'

export const getAllClients = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients: IClientAttributes[] =
      (await Client.findAll()) as unknown as IClientAttributes[]

    res.status(200).json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({ error: 'Error fetching clients' })
  }
}

export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clientData: Partial<IClientAttributes> = req.body

    const newClient = await Client.create(clientData)

    res.status(201).json(newClient)
  } catch (error) {
    console.error('Error creating new client:', error)
    res.status(500).json({ error: 'Error creating new client' })
  }
}

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const deleted = await Client.destroy({
      where: { id },
    })

    if (deleted) {
      res.sendStatus(204)
    } else {
      res.status(404).json({ error: 'Client not found' })
    }
  } catch (error) {
    console.error('Error deleting client:', error)
    res.status(500).json({ error: 'Error deleting client' })
  }
}

export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const updateData: Partial<IClientAttributes> = req.body

    const [updatedRows] = await Client.update(updateData, {
      where: { id },
    })

    if (updatedRows > 0) {
      const clients = await Client.findAll()
      if (clients) {
        res.status(200).json(clients)
      } else {
        res.status(404).json({ error: 'Client not found' })
      }
    } else {
      res.status(404).json({ error: 'Client not found' })
    }
  } catch (error) {
    console.error('Error updating client:', error)
    res.status(500).json({ error: 'Error updating client' })
  }
}
