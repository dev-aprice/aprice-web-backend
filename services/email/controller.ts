import { Request, Response } from 'express'
import { Resend } from 'resend'

const resend = new Resend('re_BaHJexb5_6L1WpT7ebfZEoSHBWGYwiCPW')

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { from, subject, html, name } = req.body
    console.log(from, subject, html, name)

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'valentina@aprice.cl',
      subject: `${subject} de ${name} - [${from}]` as string,
      html: html as string,
    })

    res.status(201).json({ msg: 'Mensaje enviado correctamente' })
  } catch (error) {
    res.status(500).json({
      msg: 'Ha ocurrido un error al enviar el correo',
    })
  }
}
