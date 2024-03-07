import { Request, Response } from 'express'
import {
  createSocialMedia,
  destroySocialMediaByEmployeeId,
} from '../social-media/controller'

import { IPartnerInstance } from './interface'
import Partner from './model'

export const getAllPartners = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const partners = await Partner.findAll()
    res.status(200).json(partners)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}

export const createPartner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { social_media, ...partnerData } = req.body
    const newPartner = (await Partner.create(partnerData)) as IPartnerInstance

    if (social_media && social_media.length > 0) {
      await createSocialMedia(social_media, newPartner.id!, 'partner')
    }

    res.status(201).json(newPartner)
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

export const deletePartner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { partnerId } = req.params
    const partnerIdNumber = +partnerId

    await destroySocialMediaByEmployeeId('partner', partnerIdNumber)

    const deleted = await Partner.destroy({
      where: { id: partnerIdNumber },
    })

    if (deleted) {
      res.status(200).send(`Partner with ID ${partnerId} deleted.`)
    } else {
      res.status(404).send('Partner not found')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message })
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}

export const updatePartner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const partnerData: IPartnerInstance = req.body

  try {
    const partner = await Partner.findByPk(parseInt(id, 10))

    if (!partner) {
      res.status(404).json({ error: `Partner with ID ${id} not found` })
      return
    }

    await partner.update(partnerData)

    res.status(200).json({ message: 'Partner updated successfully' })
  } catch (error) {
    console.error('Error updating partner:', error)
    res.status(500).json({ error: 'Error updating partner' })
  }
}
